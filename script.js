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

// Add interactive hover effects to skills
document.querySelectorAll(".skill").forEach((skill) => {
  skill.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.1) translateY(-5px)";
    this.style.textShadow = "0 5px 15px rgba(255, 107, 107, 0.3)";
  });

  skill.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1) translateY(0)";
    this.style.textShadow = "none";
  });
});

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
