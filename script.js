const header = document.querySelector(".site-header");
const revealItems = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll("[data-count]");

const setHeaderState = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.16 }
);

const countObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const target = entry.target;
      const goal = Number(target.getAttribute("data-count"));
      let current = 0;
      const tick = () => {
        current += Math.max(1, Math.ceil((goal - current) * 0.14));
        if (current >= goal) {
          target.textContent = `${goal}+`;
          observer.unobserve(target);
          return;
        }
        target.textContent = `${current}+`;
        requestAnimationFrame(tick);
      };
      tick();
    });
  },
  { threshold: 0.5 }
);

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

revealItems.forEach((item) => revealObserver.observe(item));
counters.forEach((item) => countObserver.observe(item));
