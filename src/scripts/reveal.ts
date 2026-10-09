// Fades/slides in [data-reveal] elements as they scroll into view.
// Skipped for reduced-motion users; the CSS only hides elements once
// .reveal-ready is set, so content stays visible if this never runs.
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.1 }
  );

  const elements = document.querySelectorAll('[data-reveal]');
  // Don't animate anything already on screen at load
  const fold = window.innerHeight;
  elements.forEach((el) => {
    if (el.getBoundingClientRect().top < fold) el.classList.add('is-visible');
    else observer.observe(el);
  });
  document.documentElement.classList.add('reveal-ready');
}
