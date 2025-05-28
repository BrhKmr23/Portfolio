document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll("nav ul li a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Calculate position considering fixed header
        const headerOffset = document.querySelector("header").offsetHeight;
        const elementPosition =
          targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Set current year in footer
  const yearSpan = document.getElementById("currentYear");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Simple fade-in animation for sections on scroll
  const fadeElements = document.querySelectorAll(
    ".section-padding, .project-card, .skill-category"
  );

  const observerOptions = {
    root: null, // relative to the viewport
    rootMargin: "0px",
    threshold: 0.1, // 10% of the element is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        entry.target.classList.add("fade-in"); // Add fade-in class
        // observer.unobserve(entry.target); // Optional: stop observing after animation
      } else {
        // Optional: remove class if you want it to fade out when scrolling up
        // entry.target.classList.remove('visible');
      }
    });
  }, observerOptions);

  fadeElements.forEach((el) => {
    // Initially add fade-in class to prepare for transition
    // but it will only become visible when 'visible' class is added by observer
    el.classList.add("fade-in");
    observer.observe(el);
  });

  // Active Nav Link Highlighting (Optional, a bit more complex)
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", navHighlighter);

  function navHighlighter() {
    let scrollY =
      window.pageYOffset + document.querySelector("header").offsetHeight + 50; // Adjust offset

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop =
        current.offsetTop - document.querySelector("header").offsetHeight - 50; // Adjust offset
      let sectionId = current.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document
          .querySelector("nav a[href*=" + sectionId + "]")
          .classList.add("active-link");
      } else {
        document
          .querySelector("nav a[href*=" + sectionId + "]")
          .classList.remove("active-link");
      }
    });
  }
  // Add .active-link styles in CSS if you use this:
  // nav ul li a.active-link { color: var(--accent-secondary); }
  // nav ul li a.active-link::after { width: 100%; background-color: var(--accent-secondary); }
});
