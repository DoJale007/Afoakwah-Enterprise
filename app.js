document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    document
      .querySelector(".navbar")
      .classList.toggle("scrolled", window.scrollY > 50);
  });

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Fade-in observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

  // Contact Form with AJAX + Success Popup
  const contactForm = document.getElementById("contactForm");
  const successPopup = document.getElementById("successPopup");
  const popupName = document.getElementById("popupName");
  const submitBtn = document.getElementById("submitBtn");
  const btnText = submitBtn.querySelector(".btn-text");
  const btnLoading = submitBtn.querySelector(".btn-loading");

  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Show loading
    btnText.style.display = "none";
    btnLoading.style.display = "inline-block";
    submitBtn.disabled = true;

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        // SUCCESS: Show popup with name
        const name =
          document.getElementById("name").value.trim().split(" ")[0] ||
          "Customer";
        popupName.textContent = name;
        successPopup.classList.add("active");
        contactForm.reset();
      } else {
        alert("Error sending message. Please try WhatsApp or call us.");
      }
    } catch (err) {
      alert("No internet. Please check your connection and try again.");
    } finally {
      // Hide loading
      btnText.style.display = "inline";
      btnLoading.style.display = "none";
      submitBtn.disabled = false;
    }
  });

  // Close popup function
  window.closePopup = function () {
    successPopup.classList.remove("active");
  };

  // Close on overlay click or ESC
  successPopup.addEventListener("click", (e) => {
    if (e.target === successPopup) closePopup();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePopup();
  });

  // Category-specific galleries (grid images are NOT here)
  const categoryGalleries = {
    cars: [
      { src: "gallery/client-2.jpeg" },
      { src: "gallery/client-5.jpeg" },
      { src: "gallery/client-22.jpeg" },
      { src: "gallery/client-3.jpeg" },
      { src: "gallery/client-25.jpeg" },
      { src: "gallery/client-26.jpeg" },
      { src: "gallery/client-27.jpeg" },
    ],
    parts: [
      { src: "gallery/client-4.jpeg" },
      { src: "gallery/client-7.jpeg" },
      { src: "gallery/client-8.jpeg" },
      { src: "gallery/client-12.jpeg" },
      { src: "gallery/client-13.jpeg" },
      { src: "gallery/client-14.jpeg" },
      { src: "gallery/client-16.jpeg" },
      { src: "gallery/client-20.jpeg" },
      { src: "gallery/client-21.jpeg" },
      { src: "gallery/client-23.jpeg" },
    ],
    logistics: [
      { src: "gallery/client-6.jpeg" },
      { src: "gallery/client-11.jpeg" },
      { src: "gallery/client-19.jpeg" },
      { src: "gallery/client-28.jpeg" },
      { src: "gallery/client-29.jpeg" },
      { src: "gallery/client-30.jpeg" },
      { src: "gallery/client-31.jpeg" },
      { src: "gallery/client-1.jpeg" },
      { src: "gallery/client-10.jpeg" },
    ],
  };

  // Lightbox Gallery - Category specific
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.querySelector(".lightbox-close");
  const lightboxPrev = document.querySelector(".lightbox-prev");
  const lightboxNext = document.querySelector(".lightbox-next");

  let currentImageIndex = 0;
  let currentCategoryImages = [];

  // Open category-specific gallery
  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => {
      const category = item.dataset.category;
      currentCategoryImages = categoryGalleries[category] || [];
      currentImageIndex = 0;
      openLightbox();
    });
  });

  function openLightbox() {
    if (currentCategoryImages.length === 0) return;
    const img = currentCategoryImages[currentImageIndex];
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  function showImage(index) {
    const img = currentCategoryImages[index];
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
  }

  lightboxClose.addEventListener("click", closeLightbox);
  lightboxPrev.addEventListener("click", (e) => {
    e.stopPropagation();
    currentImageIndex =
      (currentImageIndex - 1 + currentCategoryImages.length) %
      currentCategoryImages.length;
    showImage(currentImageIndex);
  });
  lightboxNext.addEventListener("click", (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex + 1) % currentCategoryImages.length;
    showImage(currentImageIndex);
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft" && currentCategoryImages.length > 0)
      lightboxPrev.click();
    if (e.key === "ArrowRight" && currentCategoryImages.length > 0)
      lightboxNext.click();
  });

  console.log("Afoakwah Ernest Enterprise Website – Fully Functional!");
});
