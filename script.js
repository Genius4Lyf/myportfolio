// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (!href || href === "#") return;

    e.preventDefault();

    let target = null;
    try {
      target = document.querySelector(href);
    } catch {
      return;
    }

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Mobile navigation toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Dynamic navigation background on scroll
const nav = document.querySelector("nav");
const setNavBackground = () => {
  if (!nav) return;
  nav.style.background =
    window.scrollY > 50 ? "rgba(26, 26, 46, 0.95)" : "rgba(26, 26, 46, 0.9)";
};
window.addEventListener("scroll", setNavBackground, { passive: true });
setNavBackground();

// Skill hover effects are handled purely in CSS now

// Parallax effect for hero elements
const parallaxElements = document.querySelectorAll(".deco-arrow");
window.addEventListener(
  "scroll",
  () => {
    const yPos = -(window.pageYOffset * 0.5);
    parallaxElements.forEach((element) => {
      const rotate = element.classList.contains("right") ? "135deg" : "-45deg";
      element.style.transform = `translateY(${yPos}px) rotate(${rotate})`;
    });
  },
  { passive: true }
);

// Create more dynamic particles
function createParticle() {
  if (document.querySelectorAll(".particle.dynamic").length >= 20) return;

  const particle = document.createElement("div");
  particle.className = "particle dynamic";
  particle.style.left = Math.random() * 100 + "%";
  particle.style.animationDuration = Math.random() * 8 + 4 + "s";
  particle.style.animationDelay = Math.random() * 2 + "s";
  document.body.appendChild(particle);

  // Remove particle after animation
  setTimeout(() => {
    particle.remove();
  }, 12000);
}

// Create particles periodically, pause work in hidden tabs and reduced-motion mode
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;
let particleIntervalId = null;

function startParticles() {
  if (prefersReducedMotion || particleIntervalId) return;
  particleIntervalId = setInterval(createParticle, 2000);
}

function stopParticles() {
  if (!particleIntervalId) return;
  clearInterval(particleIntervalId);
  particleIntervalId = null;
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopParticles();
  } else {
    startParticles();
  }
});

startParticles();

// Back to top button
const backToTopBtn = document.querySelector(".back-to-top");
if (backToTopBtn) {
  window.addEventListener(
    "scroll",
    () => {
      backToTopBtn.classList.toggle("visible", window.scrollY > 400);
    },
    { passive: true }
  );

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Scroll spy — highlight active nav link
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a[href^='#']");

if (sections.length && navAnchors.length) {
  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -60% 0px",
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navAnchors.forEach((a) => {
          a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
}
