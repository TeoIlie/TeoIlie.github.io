import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[scrollAnimation]',
  standalone: true,
})
export class ScrollAnimationDirective implements OnInit {
  @Input() animationClass: string = 'animate-fadeIn';
  @Input() threshold: number = 0.2;
  @Input() delay: number = 0;
  @Input() rootMargin: string = '0px';

  private static observers = new Map<string, IntersectionObserver>();
  private static observedElements = new Map<
    Element,
    {
      animationClass: string;
      delay: number;
      triggered: boolean;
      observerKey: string;
    }
  >();

  private isMobile = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth <= 768;
    }
  }

  ngOnInit() {
    this.renderer.addClass(this.el.nativeElement, 'will-animate');

    if (this.isMobile) {
      this.renderer.addClass(this.el.nativeElement, this.animationClass);
      return;
    }

    this.renderer.addClass(this.el.nativeElement, 'pre-animation');

    // Create a unique key for this observer configuration
    const observerKey = `${this.threshold}-${this.rootMargin}`;

    if (!ScrollAnimationDirective.observers.has(observerKey)) {
      ScrollAnimationDirective.observers.set(
        observerKey,
        new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const config = ScrollAnimationDirective.observedElements.get(entry.target);
              if (config && !config.triggered && entry.isIntersecting) {
                config.triggered = true;
                setTimeout(() => {
                  this.renderer.removeClass(entry.target, 'pre-animation');
                  this.renderer.addClass(entry.target, config.animationClass);
                }, config.delay);
              }
            });
          },
          {
            threshold: this.threshold,
            rootMargin: this.rootMargin,
          }
        )
      );
    }

    ScrollAnimationDirective.observedElements.set(this.el.nativeElement, {
      animationClass: this.animationClass,
      delay: this.delay,
      triggered: false,
      observerKey: observerKey,
    });

    const observer = ScrollAnimationDirective.observers.get(observerKey);
    observer?.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    if (!this.isMobile && this.el && this.el.nativeElement) {
      const config = ScrollAnimationDirective.observedElements.get(this.el.nativeElement);
      if (config) {
        const observer = ScrollAnimationDirective.observers.get(config.observerKey);
        if (observer) {
          observer.unobserve(this.el.nativeElement);
        }
      }
      ScrollAnimationDirective.observedElements.delete(this.el.nativeElement);
    }
  }
}
