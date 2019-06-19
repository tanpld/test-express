const searchInput = document.getElementById('search-input');
const form = document.getElementById('search-form');

form.addEventListener('submit', () => {
  sessionStorage.setItem('q', searchInput.value);
});

searchInput.value = sessionStorage.getItem('q') || '';
