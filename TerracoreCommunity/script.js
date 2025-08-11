// Prevent browser from restoring scroll position
history.scrollRestoration = "manual";

// Scroll to #top on reload or page enter
window.addEventListener("load", function () {
    const topElement = document.getElementById("#top");
    if (topElement) {
        topElement.scrollIntoView({ behavior: "instant" }); // or "smooth" if you want animation
    } else {
        window.scrollTo(0, 0); // fallback
    }
});

const thumbnails = document.querySelectorAll('.image-gallery img');
const popupGUI = document.getElementById('popupGUI');
const popupImage = document.getElementById('popupImage');
const popupClose = document.querySelector('.popup-close');

thumbnails.forEach(img => {
    img.addEventListener('click', () => {
        popupImage.src = img.src;
        popupGUI.classList.remove('hidden');
        popupGUI.classList.add('show');
    });
});

popupClose.addEventListener('click', () => {
    popupGUI.classList.remove('show');
    setTimeout(() => popupGUI.classList.add('hidden'), 500);
});

// Things Images Popup
const thingsImages = document.querySelectorAll('.things-images img');
const thingsPopup = document.getElementById('thingsPopupGUI');
const thingsPopupImg = document.getElementById('thingsPopupImage');
const thingsPopupClose = thingsPopup.querySelector('.popup-close');

thingsImages.forEach(img => {
    img.addEventListener('click', () => {
        thingsPopupImg.src = img.src;
        thingsPopup.classList.remove('hidden');
        thingsPopup.classList.add('show');
    });
});

thingsPopupClose.addEventListener('click', () => {
    thingsPopup.classList.remove('show');
    setTimeout(() => thingsPopup.classList.add('hidden'), 500);
});

// Map Thumbnail Popup
const mapThumbs = document.querySelectorAll('.map-thumb img');
const mapPopup = document.getElementById('mapPopupGUI');
const mapPopupImg = document.getElementById('mapPopupImage');
const mapPopupClose = mapPopup.querySelector('.popup-close');

mapThumbs.forEach(img => {
    img.addEventListener('click', () => {
        mapPopupImg.src = img.src;
        mapPopup.classList.remove('hidden');
        mapPopup.classList.add('show');
    });
});

mapPopupClose.addEventListener('click', () => {
    mapPopup.classList.remove('show');
    setTimeout(() => mapPopup.classList.add('hidden'), 500);
});

document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const parent = question.parentElement;
        parent.classList.toggle('active');

        const answer = parent.querySelector('.faq-answer');
        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const faqItems = document.querySelectorAll(".faq-item");
    const toggleBtn = document.getElementById("faqToggleBtn");

    // Hide items beyond the first 4
    faqItems.forEach((item, index) => {
        if (index >= 4) {
            item.style.display = "none";
        }
    });

    let expanded = false;

    toggleBtn.addEventListener("click", function () {
        expanded = !expanded;

        faqItems.forEach((item, index) => {
            if (index >= 4) {
                item.style.display = expanded ? "block" : "none";
            }
        });

        toggleBtn.textContent = expanded ? "See Less" : "See More";
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const clickableSelectors = [
        ".image-gallery img",
        ".things-images img",
        ".map-thumbnails img"
    ];

    clickableSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(img => {
            // Enable left-click only
            img.addEventListener("click", function (event) {
                if (event.button === 0) { // 0 = left click
                    console.log("Left click detected on:", img.src);
                    // Your popup logic can go here
                }
            });

            // Prevent right-click
            img.addEventListener("contextmenu", function (event) {
                event.preventDefault();
            });

            // Prevent dragging
            img.addEventListener("dragstart", function (event) {
                event.preventDefault();
            });

            // Pointer styles
            img.style.pointerEvents = "auto";
            img.style.cursor = "pointer";
        });
    });
});

ScrollReveal().reveal('.pg1-section, .image-gallery, .map-section, .pg3-content, .footer', {
    origin: 'bottom',
    distance: '50px',
    duration: 800,
    reset: false,
    easing: 'ease-in-out'
});

window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]");
  const scrollY = window.scrollY;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 100;
    const sectionId = current.getAttribute("id");

    if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
      document.querySelector(".main-nav a[href*=" + sectionId + "]").classList.add("active-link");
    } else {
      document.querySelector(".main-nav a[href*=" + sectionId + "]").classList.remove("active-link");
    }
  });
});