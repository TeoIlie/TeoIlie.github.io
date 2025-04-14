import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[scrollAnimation]',
  standalone: true,
})
export class ScrollAnimationDirective implements OnInit {
  @Input() animationClass: string = 'animate-fadeIn'; // Default animation class
  @Input() threshold: number = 0.2; // How much of the element should be visible
  @Input() delay: number = 0; // Delay in ms before starting animation

  private observer: IntersectionObserver | undefined;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    // Initially hide the element
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');

    // Set up the intersection observer
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Element is now visible
            setTimeout(() => {
              this.renderer.addClass(this.el.nativeElement, this.animationClass);
            }, this.delay);

            // Stop observing after animation is triggered
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: this.threshold }
    );

    // Start observing the element
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    // Clean up
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
