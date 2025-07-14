console.log("navbar loaded")

document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('navbar-toggle');
    const navbarMobileMenu = document.querySelector('.navbar-mobile-menu');

    // Toggle mobile menu
    function toggleMenu() {
        console.log("toggle menu!")
        if (navbarMobileMenu) {
            navbarMobileMenu.classList.toggle('active');
        }
        if (toggleButton) {
            toggleButton.classList.toggle('active');
        }
    }

    // Close menu
    function closeMenu() {
        if (navbarMobileMenu) {
            navbarMobileMenu.classList.remove('active');
        }
        if (toggleButton) {
            toggleButton.classList.remove('active');
        }
    }

    // Add event listeners
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleMenu);
    }

    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
        if (!event.target.closest('.navbar')) {
            closeMenu();
        }
    });

    // Close menu when pressing escape key
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });

    // Close menu when clicking on a link (for mobile)
    const navbarLinks = document.querySelectorAll('.navbar-link');
    navbarLinks.forEach(link => {
        link.addEventListener('click', function () {
            // Only close on mobile
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
    });
});