(function () {
  "use strict";

  /* -----------------------------------------------------
     Mobile navigation drawer
  ----------------------------------------------------- */
  var menuToggle = document.getElementById("menuToggle");
  var mobileNav = document.getElementById("mobileNav");
  var mobileScrim = document.getElementById("mobileNavScrim");

  function openNav() {
    mobileNav.classList.add("is-open");
    mobileScrim.classList.add("is-open");
    mobileNav.setAttribute("aria-hidden", "false");
    menuToggle.setAttribute("aria-expanded", "true");
  }
  function closeNav() {
    mobileNav.classList.remove("is-open");
    mobileScrim.classList.remove("is-open");
    mobileNav.setAttribute("aria-hidden", "true");
    menuToggle.setAttribute("aria-expanded", "false");
  }
  menuToggle.addEventListener("click", function () {
    var isOpen = mobileNav.classList.contains("is-open");
    if (isOpen) { closeNav(); } else { openNav(); }
  });
  mobileScrim.addEventListener("click", closeNav);

  /* -----------------------------------------------------
     Slideshow — one shared modal that flips through every
     image on the page, in the order projects appear, not
     just the images belonging to the project you clicked.

     Each project keeps its own image list in a hidden
     "project-images" block next to its thumbnail (see
     index.html), so the content is easy to find and edit.
     At load time this script flattens all of those lists,
     in DOM order, into one array. Clicking a thumbnail opens
     the shared slideshow at that project's first image; the
     next/prev buttons then keep moving through the flattened
     list, straight into the next project's images, wrapping
     back to the start at the end.

     The modal itself is moved to a direct child of <body>
     once, here: it's authored inside the scrolling images
     column, and a position:fixed element left nested inside
     a scrolling ancestor gets visually clipped to that
     ancestor's box in every browser, instead of covering the
     full screen.
  ----------------------------------------------------- */
  var slideshow = document.getElementById("slideshow");
  var slideshowImage = document.getElementById("slideshowImage");
  var slideshowCaption = document.getElementById("slideshowCaption");
  var slideshowCounter = document.getElementById("slideshowCounter");
  var closeBtn = document.getElementById("slideshowClose");
  var prevBtn = document.getElementById("slideshowPrev");
  var nextBtn = document.getElementById("slideshowNext");

  document.body.appendChild(slideshow);

  var slides = [];
  var thumbLinks = [];

  document.querySelectorAll(".project-item").forEach(function (item) {
    var thumb = item.querySelector(".project-thumb");
    var imagesWrap = item.querySelector(".project-images");
    if (!thumb || !imagesWrap) return;

    var title = imagesWrap.getAttribute("data-title") || "";
    var startIndex = slides.length;

    imagesWrap.querySelectorAll(".slide-image").forEach(function (img) {
      slides.push({
        src: img.getAttribute("src"),
        alt: img.getAttribute("alt") || title,
        caption: title
      });
    });

    thumbLinks.push({ el: thumb, startIndex: startIndex });
  });

  var currentIndex = 0;
  var lastFocusedEl = null;

  function render() {
    var slide = slides[currentIndex];
    slideshowImage.src = slide.src;
    slideshowImage.alt = slide.alt;
    slideshowCaption.textContent = slide.caption;
    slideshowCounter.textContent = (currentIndex + 1) + " / " + slides.length;
  }

  function openSlideshow(index, triggerEl) {
    if (!slides.length) return;
    currentIndex = ((index % slides.length) + slides.length) % slides.length;
    lastFocusedEl = triggerEl || null;
    render();
    slideshow.classList.add("is-open");
    slideshow.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function closeSlideshow() {
    slideshow.classList.remove("is-open");
    slideshow.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocusedEl) lastFocusedEl.focus();
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % slides.length;
    render();
  }
  function showPrev() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    render();
  }

  thumbLinks.forEach(function (link) {
    link.el.addEventListener("click", function () {
      openSlideshow(link.startIndex, link.el);
    });
  });

  closeBtn.addEventListener("click", closeSlideshow);
  nextBtn.addEventListener("click", showNext);
  prevBtn.addEventListener("click", showPrev);

  slideshow.addEventListener("click", function (e) {
    if (e.target === slideshow) closeSlideshow();
  });

  document.addEventListener("keydown", function (e) {
    if (!slideshow.classList.contains("is-open")) return;
    if (e.key === "Escape") closeSlideshow();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
  });
})();
