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
  HostListener,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SharedIntersectionObserverService } from '../services/shared-intersection-observer.service';

@Directive({
  selector: '[scrollAnimation]',
  standalone: true,
})
export class ScrollAnimationDirective implements OnInit, OnDestroy {
  @Input() animationClass: string = 'animate-fadeIn'; // Default animation class
  @Input() threshold: number = 0.2; // How much of the element should be visible
  @Input() delay: number = 0; // Delay in ms before starting animation
  @Input() once: boolean = true; // Whether to trigger animation only once
  @Input() disableOnMobile: boolean = true; // Whether to disable on mobile devices

  private hasAnimated: boolean = false;
  private timeout: number | null = null;
  private isMobile: boolean = false;
  private readonly mobileBreakpoint: number = 768; // Match with your $breakpoint-mobile
  private isBrowser: boolean;
  private isObserving: boolean = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: object,
    private sharedIntersectionObserver: SharedIntersectionObserverService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    // Only run on browser, not during SSR
    if (this.isBrowser) {
      this.checkIfMobile();
      this.initializeAnimation();
    }
  }

  ngOnDestroy() {
    this.cleanup();
  }

  @HostListener('window:resize')
  onResize() {
    if (!this.isBrowser) return;

    // Update mobile status on window resize
    const wasMobile = this.isMobile;
    this.checkIfMobile();

    // If mobile status changed, re-initialize
    if (wasMobile !== this.isMobile) {
      this.cleanup();
      this.initializeAnimation();
    }
  }

  private checkIfMobile(): void {
    this.isMobile = window.innerWidth < this.mobileBreakpoint;
  }

  private initializeAnimation(): void {
    // If mobile and animations should be disabled, make element visible immediately
    if (this.isMobile && this.disableOnMobile) {
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
      return;
    }

    // Use transform for better performance than opacity
    this.renderer.addClass(this.el.nativeElement, 'will-change-opacity');
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');

    // Handle case where element is already visible on load
    if (this.isElementInViewport()) {
      this.animateElement();
      return;
    }

    // Set up the intersection observer through our shared service
    const options = {
      threshold: this.threshold,
      rootMargin: '0px 0px 50px 0px', // Slightly extends the bottom threshold for earlier loading
    };

    this.isObserving = true;
    this.sharedIntersectionObserver.observe(
      this.el.nativeElement,
      this.handleIntersection.bind(this),
      options
    );
  }

  private handleIntersection(entry: IntersectionObserverEntry): void {
    if (entry.isIntersecting && !this.hasAnimated) {
      this.animateElement();

      // If once is true, stop observing
      if (this.once) {
        this.unobserveElement();
      }
    } else if (!entry.isIntersecting && !this.once && this.hasAnimated) {
      // Reset animation if not once-only
      this.resetAnimation();
    }
  }

  private animateElement(): void {
    // Cancel any existing timeout to prevent race conditions
    if (this.timeout !== null) {
      window.clearTimeout(this.timeout);
      this.timeout = null;
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

  private unobserveElement(): void {
    if (this.isObserving) {
      this.sharedIntersectionObserver.unobserve(this.el.nativeElement, {
        threshold: this.threshold,
        rootMargin: '0px 0px 50px 0px',
      });
      this.isObserving = false;
    }
  }

  private cleanup(): void {
    this.unobserveElement();

    if (this.timeout !== null) {
      window.clearTimeout(this.timeout);
      this.timeout = null;
    }
  }
}
