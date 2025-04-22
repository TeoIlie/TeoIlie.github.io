import { Injectable, NgZone, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface IntersectionOptions {
  threshold?: number;
  rootMargin?: string;
}

export interface IntersectionEntry {
  element: Element;
  callback: (entry: IntersectionObserverEntry) => void;
  options: IntersectionOptions;
}

@Injectable({
  providedIn: 'root',
})
export class SharedIntersectionObserverService implements OnDestroy {
  private observerMap: Map<
    string,
    {
      observer: IntersectionObserver;
      elements: Map<Element, (entry: IntersectionObserverEntry) => void>;
    }
  > = new Map();

  private isBrowser: boolean;

  constructor(
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  /**
   * Observe an element with specific options
   */
  observe(
    element: Element,
    callback: (entry: IntersectionObserverEntry) => void,
    options: IntersectionOptions = {}
  ): void {
    if (!this.isBrowser) return;

    // Create a unique key for this observer configuration
    const threshold = options.threshold ?? 0.2;
    const rootMargin = options.rootMargin ?? '0px 0px 50px 0px';
    const observerKey = `${threshold}-${rootMargin}`;

    // Run outside Angular's change detection for better performance
    this.ngZone.runOutsideAngular(() => {
      // Check if we already have an observer with these options
      if (!this.observerMap.has(observerKey)) {
        // Create a new observer with these options
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const callback = this.observerMap.get(observerKey)?.elements.get(entry.target);
              if (callback) {
                callback(entry);
              }
            });
          },
          { threshold, rootMargin }
        );

        this.observerMap.set(observerKey, {
          observer,
          elements: new Map(),
        });
      }

      // Add this element to the observer
      const observerData = this.observerMap.get(observerKey)!;
      observerData.elements.set(element, callback);
      observerData.observer.observe(element);
    });
  }

  /**
   * Unobserve a specific element
   */
  unobserve(element: Element, options: IntersectionOptions = {}): void {
    if (!this.isBrowser) return;

    const threshold = options.threshold ?? 0.2;
    const rootMargin = options.rootMargin ?? '0px 0px 50px 0px';
    const observerKey = `${threshold}-${rootMargin}`;

    const observerData = this.observerMap.get(observerKey);
    if (observerData) {
      observerData.elements.delete(element);
      observerData.observer.unobserve(element);

      // If no more elements are being observed with this configuration, disconnect the observer
      if (observerData.elements.size === 0) {
        observerData.observer.disconnect();
        this.observerMap.delete(observerKey);
      }
    }
  }

  ngOnDestroy(): void {
    // Clean up all observers
    if (this.isBrowser) {
      this.observerMap.forEach((observerData) => {
        observerData.observer.disconnect();
      });
      this.observerMap.clear();
    }
  }
}
