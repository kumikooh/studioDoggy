document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll(".fade-in-trigger").forEach(el => {
    const isAboutSection = el.closest("#about");
    const isMobile = window.innerWidth < 768;

    if (isAboutSection && isMobile) {
      // スマホで #about セクション内ならスキップ
      return;
    }

    observer.observe(el);
  });
});
