// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Dynamic navigation background on scroll
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  if (window.scrollY > 50) {
    nav.style.background = "rgba(26, 26, 46, 0.95)";
  } else {
    nav.style.background = "rgba(26, 26, 46, 0.9)";
  }
});

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
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".deco-arrow");
  const speed = 0.5;

  parallaxElements.forEach((element) => {
    const yPos = -(scrolled * speed);
    element.style.transform += ` translateY(${yPos}px)`;
  });
});

// Create more dynamic particles
function createParticle() {
  const particle = document.createElement("div");
  particle.className = "particle";
  particle.style.left = Math.random() * 100 + "%";
  particle.style.animationDuration = Math.random() * 8 + 4 + "s";
  particle.style.animationDelay = Math.random() * 2 + "s";
  document.body.appendChild(particle);

  // Remove particle after animation
  setTimeout(() => {
    particle.remove();
  }, 12000);
}

// Create particles periodically
setInterval(createParticle, 2000);
