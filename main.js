// Modern Web Development Exercises - Interactive Logic

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('exerciseSearch');
  const filterPills = document.querySelectorAll('.filter-pills .pill');
  const exerciseCards = document.querySelectorAll('.exercise-card');
  const emptyState = document.getElementById('noResults');
  const resetBtn = document.getElementById('resetFilters');

  let currentFilter = 'all';
  let searchQuery = '';

  function filterExercises() {
    let visibleCount = 0;

    exerciseCards.forEach((card) => {
      const category = card.getAttribute('data-category');
      const keywords = card.getAttribute('data-keywords') || '';
      const title = card.querySelector('.exercise-title')?.textContent.toLowerCase() || '';
      const desc = card.querySelector('.exercise-desc')?.textContent.toLowerCase() || '';

      const matchesFilter = (currentFilter === 'all' || category === currentFilter);
      const searchTarget = `${title} ${desc} ${keywords}`.toLowerCase();
      const matchesSearch = searchQuery === '' || searchTarget.includes(searchQuery);

      if (matchesFilter && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (visibleCount === 0) {
      emptyState.classList.remove('hidden');
    } else {
      emptyState.classList.add('hidden');
    }
  }

  // Search input handler
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim().toLowerCase();
    filterExercises();
  });

  // Filter pills handler
  filterPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      filterPills.forEach((p) => {
        p.classList.remove('active');
        p.setAttribute('aria-selected', 'false');
      });

      pill.classList.add('active');
      pill.setAttribute('aria-selected', 'true');
      currentFilter = pill.getAttribute('data-filter');
      filterExercises();
    });
  });

  // Reset filters button
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      currentFilter = 'all';
      filterPills.forEach((p) => {
        const isAll = p.getAttribute('data-filter') === 'all';
        p.classList.toggle('active', isAll);
        p.setAttribute('aria-selected', isAll ? 'true' : 'false');
      });
      filterExercises();
    });
  }
});
