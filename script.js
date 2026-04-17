const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".site-nav a");
const revealItems = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll("[data-count]");
const newsletterForm = document.querySelector("#newsletter-form");

const setHeaderState = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

const closeMenu = () => {
  if (!header || !menuToggle) return;
  header.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
};

if (menuToggle && header) {
  menuToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

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

if (newsletterForm) {
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = new FormData(newsletterForm).get("email");
    if (typeof email !== "string" || !email) return;
    const subject = encodeURIComponent("Onestack Newsletter Subscription");
    const body = encodeURIComponent(`Please subscribe this email to product updates:\n${email}`);
    window.location.href = `mailto:news@onestack.ai?subject=${subject}&body=${body}`;
  });
}

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

revealItems.forEach((item) => revealObserver.observe(item));
counters.forEach((item) => countObserver.observe(item));
