document.addEventListener('DOMContentLoaded', function() {
    console.log('about.js loaded');

    // Initialize photo slider
    initPhotoSlider();

    // Initialize language toggle
    initLanguageToggle();
});

document.addEventListener("DOMContentLoaded", () => {
    const trio = document.querySelector("#threeUpCarousel");
    new bootstrap.Carousel(trio, {
        interval: 15000,  // auto‑advance every 15 s
        pause: "hover",
        wrap: true
    });
});

/**
 * Initialize the photo slider functionality
 */
function initPhotoSlider() {
    const sliderTrack = document.querySelector('.slider-track');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const sliderItems = document.querySelectorAll('.slider-item');

    if (!sliderTrack || !prevArrow || !nextArrow || sliderItems.length === 0) {
        console.error('Slider elements not found');
        return;
    }

    // Calculate item width based on viewport
    const calculateItemWidth = () => {
        const isMobile = window.innerWidth <= 768;
        return isMobile ?
            sliderTrack.clientWidth :
            (sliderTrack.clientWidth - 40) / 3; // 3 items with gap
    };

    let currentIndex = 0;
    let itemWidth = calculateItemWidth();

    // Update slider position
    const updateSliderPosition = () => {
        // Recalculate item width in case of resize
        itemWidth = calculateItemWidth();

        // Calculate offset
        const offset = -currentIndex * (itemWidth + 20); // 20px is the gap
        sliderTrack.style.transform = `translateX(${offset}px)`;
    };

    // Handle previous button click
    prevArrow.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSliderPosition();
        }
    });

    // Handle next button click
    nextArrow.addEventListener('click', () => {
        const isMobile = window.innerWidth <= 768;
        const maxIndex = isMobile ?
            sliderItems.length - 1 :
            sliderItems.length - 3; // Show 3 items at once on desktop

        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSliderPosition();
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        // Reset position on resize
        currentIndex = 0;
        updateSliderPosition();
    });

    // Initialize slider position
    updateSliderPosition();

    // Touch swipe functionality for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    sliderTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    sliderTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    const handleSwipe = () => {
        const swipeThreshold = 50; // Minimum swipe distance

        if (touchStartX - touchEndX > swipeThreshold) {
            // Swipe left, go to next
            nextArrow.click();
        } else if (touchEndX - touchStartX > swipeThreshold) {
            // Swipe right, go to previous
            prevArrow.click();
        }
    };
}

/**
 * Initialize language toggle functionality
 */
function initLanguageToggle() {
    const langButtons = document.querySelectorAll('.lang-button');

    if (!langButtons || langButtons.length === 0) {
        console.error('Language buttons not found');
        return;
    }

    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedLang = this.getAttribute('data-language');

            // Update active state on buttons
            langButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Toggle content visibility (excluding buttons themselves)
            const allLangElements = document.querySelectorAll('[data-lang]');
            allLangElements.forEach(element => {
                const elementLang = element.getAttribute('data-lang');
                if (elementLang === selectedLang) {
                    element.style.display = '';
                } else {
                    element.style.display = 'none';
                }
            });

            console.log(`Switched to ${selectedLang === 'zh' ? 'Chinese' : 'English'}`);
        });
    });
}
