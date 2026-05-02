const searchForm = document.querySelector('#searchForm');
const searchInput = document.querySelector('#searchInput');
const clearSearch = document.querySelector('#clearSearch');
const categories = Array.from(document.querySelectorAll('.category'));

function updateClearButton() {
  clearSearch.classList.toggle('visible', searchInput.value.trim().length > 0);
}

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const query = searchInput.value.trim();
  if (!query) {
    searchInput.focus();
    return;
  }

  const searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
  window.open(searchUrl, '_blank', 'noopener,noreferrer');
});

searchInput.addEventListener('input', updateClearButton);

clearSearch.addEventListener('click', () => {
  searchInput.value = '';
  updateClearButton();
  searchInput.focus();
});

categories.forEach((category) => {
  category.addEventListener('toggle', () => {
    if (!category.open) return;
    categories.forEach((other) => {
      if (other !== category) other.open = false;
    });
  });
});

document.addEventListener('keydown', (event) => {
  const activeElement = document.activeElement;
  const isTyping = activeElement instanceof HTMLInputElement ||
    activeElement instanceof HTMLTextAreaElement ||
    activeElement?.isContentEditable;

  if (event.key === '/' && !isTyping) {
    event.preventDefault();
    searchInput.focus();
    return;
  }

  if (event.key === 'Escape') {
    categories.forEach((category) => {
      category.open = false;
    });
    if (isTyping) activeElement.blur();
  }
});
