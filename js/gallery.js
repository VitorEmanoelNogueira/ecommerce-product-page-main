const main = document.getElementById("main-content");
const mainProductGallery = {
    currentSlideWrapper: main.querySelector("[data-current-slide]"),
    status: main.querySelector("[data-gallery-status]"),
    images: main.querySelectorAll("[data-gallery-image]"),
    openLightbox: main.querySelector("[data-open-lightbox]"),
    nextButton: main.querySelector("[data-next-image]"),
    previousButton: main.querySelector("[data-previous-image]"),
    thumbs: main.querySelectorAll("[data-select-image]"),
    selectedThumb: main.querySelector("[aria-pressed='true']"),
    transitionEndHandler: null
}

const lightbox = document.getElementById("lightbox");
const lightboxProductGallery = {
    currentSlideWrapper: lightbox.querySelector("[data-current-slide]"),
    status: lightbox.querySelector("[data-gallery-status]"),
    image: lightbox.querySelector("[data-gallery-image]"),
    closeLightbox: lightbox.querySelector("[data-close-lightbox]"),
    nextButton: lightbox.querySelector("[data-next-image]"),
    previousButton: lightbox.querySelector("[data-previous-image]"),
    thumbs: lightbox.querySelectorAll("[data-select-image]"),
    selectedThumb: lightbox.querySelector("[aria-pressed='true']"),
    transitionEndHandler: null
}

const images = [
    {
        src: "./images/image-product-1.jpg",
        alt: "A pair of white and tan Fall Limited Edition Sneakers with orange heel tabs, one with its beige sole facing the viewer, displayed on a two-tone orange and burlywood background."
    },
    {
        src: "./images/image-product-2.jpg",
        alt: "White and tan Fall Limited Edition Sneakers with orange heel tabs displayed on stones with a branch in the foreground."
    },
    {
        src: "./images/image-product-3.jpg",
        alt: "White and tan Fall Limited Edition Sneaker balanced on stacked stones."
    },
    {
        src: "./images/image-product-4.jpg",
        alt: "Side view of a white and tan Fall Limited Edition Sneaker on stacked stones."
    }
]

function changeImage(gallery, shiftIndex = 0, directIndex = null) {
    if (directIndex) {
        updateImage(gallery, directIndex - 1);
        return
    }

    const actualImageIndex = Number(gallery.selectedThumb.dataset.selectImage) - 1;

    if (shiftIndex > 0) {
        updateImage(gallery, ((actualImageIndex + shiftIndex) % (images.length)));
    } else {
        updateImage(gallery, ((actualImageIndex + shiftIndex + images.length) % (images.length)));
    }
}

function updateImage(gallery, actualIndex) {
    const { src: newSrc, alt: newAlt } = images[actualIndex];

    gallery.selectedThumb.setAttribute("aria-pressed", "false");
    gallery.selectedThumb = gallery.thumbs[actualIndex];
    gallery.selectedThumb.setAttribute("aria-pressed", "true");

    if (gallery.images) {
        gallery.images.forEach(image => {
            image.src = newSrc
            image.alt = `Image ${gallery.selectedThumb.dataset.selectImage} of 4: ${newAlt}`;
        })
    } else {
        gallery.image.src = newSrc;
        gallery.image.alt = `Image ${gallery.selectedThumb.dataset.selectImage} of 4: ${newAlt}`;
    }

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        transitionGalleryAnimation(gallery)
    }
}

function transitionGalleryAnimation(gallery) {
    // Removes the previous transition's handler in case of rapid successive updates
    if (gallery.transitionEndHandler) {
        gallery.currentSlideWrapper.removeEventListener("transitionend", gallery.transitionEndHandler);
    }

    // Creates a new handler for the transition end event
    gallery.transitionEndHandler = () => {
        gallery.currentSlideWrapper.classList.remove("transition-end");
        gallery.transitionEndHandler = null;
    }

    gallery.currentSlideWrapper.classList.add("transition-start");
    gallery.currentSlideWrapper.offsetWidth; // Forces the browser to apply transition-start before transitioning to transition-end
    gallery.currentSlideWrapper.classList.replace("transition-start", "transition-end");
    gallery.currentSlideWrapper.addEventListener("transitionend", gallery.transitionEndHandler, { once: true })
}

function openLightbox() {
    lightbox.showModal();
    changeImage(lightboxProductGallery, 0, mainProductGallery.selectedThumb.dataset.selectImage);
}

function closeLightbox() {
    if (!lightbox.open) return;

    lightbox.close();
    changeImage(mainProductGallery, 0, lightboxProductGallery.selectedThumb.dataset.selectImage);
}

export function initGalleries() {
    [mainProductGallery, lightboxProductGallery].forEach(gallery => {
        gallery.nextButton.addEventListener("click", () => changeImage(gallery, 1));
        gallery.previousButton.addEventListener("click", () => changeImage(gallery, -1));

        gallery.thumbs.forEach(thumb => {
            thumb.addEventListener("click", () => changeImage(gallery, 0, thumb.dataset.selectImage))
        })
    })
    mainProductGallery.openLightbox.addEventListener("click", openLightbox);

    lightbox.addEventListener("cancel", (e) => {
        e.preventDefault();
        closeLightbox();
    });
    lightboxProductGallery.closeLightbox.addEventListener("click", closeLightbox);

    window.matchMedia("(min-width: 50rem)").addEventListener("change", () => {
        closeLightbox();
    })
}