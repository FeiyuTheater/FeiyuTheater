console.log('about.js loaded');

document.addEventListener("DOMContentLoaded", () => {
  const trio = document.querySelector("#threeUpCarousel");
  new bootstrap.Carousel(trio, {
    interval: 3800,  // auto‑advance every 3.8 s
    pause: "hover",
    wrap: true
  });
});