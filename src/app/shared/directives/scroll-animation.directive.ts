import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
  Renderer2,
  NgZone,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[scrollAnimation]',
  standalone: true,
})
export class ScrollAnimationDirective implements OnInit, OnDestroy {
  @Input() animationClass: string = 'animate-fadeIn'; // Default animation class
  @Input() threshold: number = 0.2; // How much of the element should be visible
  @Input() delay: number = 0; // Delay in ms before starting animation
  @Input() once: boolean = true; // Whether to trigger animation only once

  private observer: IntersectionObserver | null = null;
  private hasAnimated: boolean = false;
  private timeout: number | null = null;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit() {
    // Only run on browser, not during SSR
    if (isPlatformBrowser(this.platformId)) {
      this.initializeAnimation();
    }
  }

  ngOnDestroy() {
    this.cleanup();
  }

  private initializeAnimation(): void {
    // Use transform for better performance than opacity
    this.renderer.addClass(this.el.nativeElement, 'will-change-opacity');
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');

    // Run outside Angular's change detection for better performance
    this.ngZone.runOutsideAngular(() => {
      // Handle case where element is already visible on load
      if (this.isElementInViewport()) {
        this.animateElement();
        return;
      }

      // Set up the intersection observer
      const options = {
        threshold: this.threshold,
        rootMargin: '0px 0px 50px 0px', // Slightly extends the bottom threshold for earlier loading
      };

      this.observer = new IntersectionObserver(this.handleIntersection.bind(this), options);
      this.observer.observe(this.el.nativeElement);
    });
  }

  private handleIntersection(entries: IntersectionObserverEntry[]): void {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !this.hasAnimated) {
        this.animateElement();
      } else if (!entry.isIntersecting && !this.once && this.hasAnimated) {
        // Reset animation if not once-only
        this.resetAnimation();
      }
    });
  }

  private animateElement(): void {
    // Cancel any existing timeout to prevent race conditions
    if (this.timeout !== null) {
      window.clearTimeout(this.timeout);
    }

    if (this.delay > 0) {
      this.timeout = window.setTimeout(() => this.applyAnimation(), this.delay);
    } else {
      this.applyAnimation();
    }
  }

  private applyAnimation(): void {
    this.hasAnimated = true;

    // Use requestAnimationFrame for smoother animations
    requestAnimationFrame(() => {
      this.renderer.addClass(this.el.nativeElement, this.animationClass);
    });

    // If once is true, stop observing
    if (this.once && this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  private resetAnimation(): void {
    this.hasAnimated = false;
    this.renderer.removeClass(this.el.nativeElement, this.animationClass);
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
  }

  private isElementInViewport(): boolean {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    // Check if element is already in viewport on initial load
    return rect.top <= windowHeight * (1 - this.threshold) && rect.bottom >= 0;
  }

  private cleanup(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }

    if (this.timeout !== null) {
      window.clearTimeout(this.timeout);
      this.timeout = null;
    }
  }
}
