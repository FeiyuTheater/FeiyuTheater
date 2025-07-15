
document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.production-team-carousel');
    if (!carousel) return;

    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const nextBtn = carousel.querySelector('.carousel-next');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const indicators = carousel.querySelectorAll('.indicator');

    let currentSlide = 0;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    // Update carousel position
    function updateCarousel() {
        const translateX = -currentSlide * 100;
        track.style.transform = `translateX(${translateX}%)`;

        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });

        // Update button states
        prevBtn.style.opacity = currentSlide === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentSlide === slides.length - 1 ? '0.5' : '1';
    }

    // Next slide
    function nextSlide() {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            updateCarousel();
        }
    }

    // Previous slide
    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateCarousel();
        }
    }

    // Go to specific slide
    function goToSlide(index) {
        currentSlide = index;
        updateCarousel();
    }

    // Event listeners for buttons
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });

    // Touch/swipe functionality
    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        track.style.transition = 'none';
    });

    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        currentX = e.touches[0].clientX;
        const diffX = currentX - startX;
        const translateX = -currentSlide * 100 + (diffX / track.offsetWidth) * 100;
        track.style.transform = `translateX(${translateX}%)`;
    });

    track.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        track.style.transition = 'transform 0.3s ease';

        const diffX = currentX - startX;
        const threshold = track.offsetWidth * 0.2; // 20% of width

        if (Math.abs(diffX) > threshold) {
            if (diffX > 0 && currentSlide > 0) {
                prevSlide();
            } else if (diffX < 0 && currentSlide < slides.length - 1) {
                nextSlide();
            } else {
                updateCarousel();
            }
        } else {
            updateCarousel();
        }
    });

    // Mouse drag functionality for desktop
    track.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        isDragging = true;
        track.style.transition = 'none';
        track.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        currentX = e.clientX;
        const diffX = currentX - startX;
        const translateX = -currentSlide * 100 + (diffX / track.offsetWidth) * 100;
        track.style.transform = `translateX(${translateX}%)`;
    });

    document.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        track.style.transition = 'transform 0.3s ease';
        track.style.cursor = 'grab';

        const diffX = currentX - startX;
        const threshold = track.offsetWidth * 0.2;

        if (Math.abs(diffX) > threshold) {
            if (diffX > 0 && currentSlide > 0) {
                prevSlide();
            } else if (diffX < 0 && currentSlide < slides.length - 1) {
                nextSlide();
            } else {
                updateCarousel();
            }
        } else {
            updateCarousel();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // Initialize
    updateCarousel();
});