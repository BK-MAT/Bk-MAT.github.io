document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    let introClosed = false;
    const closeIntro = () => {
      if (introClosed) return;
      introClosed = true;
      loader.classList.add("loader-hidden");
    };

    const skipButton = document.getElementById("skip-intro");
    if (skipButton) skipButton.addEventListener("click", closeIntro);

    // Keep the intro visible long enough for the name reveal, then show the homepage.
    window.addEventListener("load", () => {
      window.setTimeout(closeIntro, 3300);
    });

    // A fallback prevents the intro from covering the page if a resource loads slowly.
    window.setTimeout(closeIntro, 6500);
  }

  const toggle = document.querySelector(".menu-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }

  document.querySelectorAll(".photo-tile img").forEach(img => {
    img.addEventListener("error", () => {
      const tile = img.closest(".photo-tile");
      if (tile) {
        img.remove();
        tile.classList.remove("has-image");
        tile.innerHTML = "<span>Add your photo in the images folder</span>";
      }
    });
  });

  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
});
