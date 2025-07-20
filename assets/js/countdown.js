document.addEventListener('DOMContentLoaded', function () {
    const countdownTimer = document.querySelector('.countdown-timer');
    const eventDateStr = countdownTimer.getAttribute('data-event-date');
    console.log('eventDateStr: ', eventDateStr)
    const eventDate = new Date(eventDateStr).getTime();

    console.log('eventDate:', eventDateStr)
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const countdownMessage = document.getElementById('countdown-message');

    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = eventDate - now;

        if (timeLeft < 0) {
            // Event has started or passed
            countdownTimer.style.display = 'none';
            countdownMessage.style.display = 'block';
            return;
        }

        // Calculate time units
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        // Update display with leading zeros
        daysElement.textContent = days.toString().padStart(2, '0');
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');

        // Add animation effect
        secondsElement.style.animation = 'pulse 1s ease-in-out';
        setTimeout(() => {
            secondsElement.style.animation = '';
        }, 1000);
    }

    // Update immediately
    updateCountdown();

    // Update every second
    const countdownInterval = setInterval(updateCountdown, 1000);

    // Clean up interval when page is unloaded
    window.addEventListener('beforeunload', function () {
        clearInterval(countdownInterval);
    });
});