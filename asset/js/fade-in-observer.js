document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth < 768) return; // モバイル除外

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
    observer.observe(el);
  });
});
