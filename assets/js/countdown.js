document.addEventListener("DOMContentLoaded", function () {
  const countdowns = document.querySelectorAll('.countdown-timer');

  countdowns.forEach(function (timer) {
    const deadline = new Date(timer.getAttribute('data-deadline')).getTime();

    function updateCountdown() {
      const now = new Date().getTime();
      const distance = deadline - now;

      if (distance < 0) {
        timer.querySelector(".countdown-values").innerHTML = "已结束";
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      timer.querySelector(".days").textContent = String(days).padStart(2, '0');
      timer.querySelector(".hours").textContent = String(hours).padStart(2, '0');
      timer.querySelector(".minutes").textContent = String(minutes).padStart(2, '0');
      timer.querySelector(".seconds").textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown(); // initial call
    setInterval(updateCountdown, 1000); // update every second
  });
});