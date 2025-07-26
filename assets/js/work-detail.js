
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

// Masonary
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded, looking for photo wall...');
    const photoWall = document.querySelector('#photo-wall');

    if (!photoWall) {
        console.error('Photo wall element not found!');
        return;
    }

    console.log('Photo wall found, images count:', photoWall.querySelectorAll('.photo-item').length);

    // Check if Masonry is available
    if (typeof Masonry === 'undefined') {
        console.error('Masonry library not loaded!');
        return;
    }

    // Check if imagesLoaded is available
    if (typeof imagesLoaded === 'undefined') {
        console.error('imagesLoaded library not loaded!');
        // Initialize masonry without waiting for images
        initMasonry();
        return;
    }

    // Wait for images to load before initializing masonry
    imagesLoaded(photoWall, function () {
        console.log('All images loaded, initializing masonry...');
        initMasonry();
    });

    function initMasonry() {
        try {
            // Initialize Masonry
            const masonry = new Masonry(photoWall, {
                itemSelector: '.photo-item',
                columnWidth: '.photo-item',
                gutter: 0, // We handle spacing with CSS margins
                percentPosition: true,
                fitWidth: false // Changed to false for better responsiveness
            });

            console.log('Masonry initialized successfully');

            // Add loaded class for animation
            photoWall.classList.add('masonry-loaded');

            // Handle window resize for responsive layout
            let resizeTimer;
            window.addEventListener('resize', function () {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function () {
                    console.log('Relaying masonry...');
                    masonry.layout();
                }, 250);
            });

        } catch (error) {
            console.error('Error initializing masonry:', error);
        }
    }
});

// Add this function and call after masonry initialization
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const photoItems = document.querySelectorAll('.photo-item');
    
    let currentIndex = 0;
    let photos = [];
    
    // Collect all photos data
    photoItems.forEach((item, index) => {
        const img = item.querySelector('.photo-image');
        const caption = item.querySelector('.photo-caption');
        const fullSrc = item.dataset.lightboxSrc || img.src;
        
        photos.push({
            src: fullSrc,
            alt: img.alt,
            caption: caption ? caption.textContent : ''
        });
        
        // Add click handler
        item.addEventListener('click', function() {
            currentIndex = index;
            openLightbox();
        });
        
        item.style.cursor = 'pointer';
    });
    
    function openLightbox() {
        const photo = photos[currentIndex];
        
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close" aria-label="Close"></button>
                <button class="lightbox-nav lightbox-prev" aria-label="Previous"></button>
                <button class="lightbox-nav lightbox-next" aria-label="Next"></button>
                <div class="lightbox-loading">Loading...</div>
            </div>
        `;
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        const img = new Image();
        img.onload = function() {
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <button class="lightbox-close" aria-label="Close"></button>
                    <button class="lightbox-nav lightbox-prev" aria-label="Previous"></button>
                    <button class="lightbox-nav lightbox-next" aria-label="Next"></button>
                    <img class="lightbox-image" src="${photo.src}" alt="${photo.alt}">
                    <div class="lightbox-caption">${photo.caption}</div>
                </div>
            `;
            updateNavigation();
            bindLightboxEvents();
        };
        img.src = photo.src;
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function nextPhoto() {
        if (currentIndex < photos.length - 1) {
            currentIndex++;
            openLightbox();
        }
    }
    
    function prevPhoto() {
        if (currentIndex > 0) {
            currentIndex--;
            openLightbox();
        }
    }
    
    function updateNavigation() {
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');
        
        if (photos.length <= 1) {
            lightbox.setAttribute('data-single', 'true');
        } else {
            lightbox.removeAttribute('data-single');
            if (prevBtn) prevBtn.style.display = currentIndex > 0 ? 'flex' : 'none';
            if (nextBtn) nextBtn.style.display = currentIndex < photos.length - 1 ? 'flex' : 'none';
        }
    }
    
    function bindLightboxEvents() {
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');
        
        if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
        if (prevBtn) prevBtn.addEventListener('click', prevPhoto);
        if (nextBtn) nextBtn.addEventListener('click', nextPhoto);
    }
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) closeLightbox();
    });
    
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape': closeLightbox(); break;
            case 'ArrowLeft': prevPhoto(); break;
            case 'ArrowRight': nextPhoto(); break;
        }
    });
}

initLightbox();
