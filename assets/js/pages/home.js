document.addEventListener('DOMContentLoaded', () => {
  const activityList = document.querySelector('[data-activity-list]');
  const loadMoreButton = document.querySelector('[data-activity-load-more]');

  if (!activityList || !loadMoreButton) {
    return;
  }

  const batchSize = Number.parseInt(activityList.dataset.batchSize, 10) || 3;
  const activityItems = Array.from(activityList.querySelectorAll('.activity-item'));

  const updateButtonVisibility = () => {
    const hasHiddenItems = activityItems.some((item) => item.classList.contains('activity-item--hidden'));
    loadMoreButton.hidden = !hasHiddenItems;
  };

  loadMoreButton.addEventListener('click', () => {
    const hiddenItems = activityItems.filter((item) => item.classList.contains('activity-item--hidden'));

    hiddenItems.slice(0, batchSize).forEach((item) => {
      item.classList.remove('activity-item--hidden');
    });

    updateButtonVisibility();
  });

  updateButtonVisibility();
});
