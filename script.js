const searchForm = document.querySelector('#searchForm');
const searchInput = document.querySelector('#searchInput');
const clearSearch = document.querySelector('#clearSearch');
const categories = Array.from(document.querySelectorAll('.category'));
const storageKey = 'bewf-start-open-section';

function updateClearButton() {
  clearSearch.classList.toggle('visible', searchInput.value.trim().length > 0);
}

function closeOtherCategories(activeCategory) {
  categories.forEach((category) => {
    if (category !== activeCategory) category.open = false;
  });
}

function openCategory(category) {
  if (!category) return;
  category.open = true;
  closeOtherCategories(category);
  localStorage.setItem(storageKey, category.id);
}

function closeAllCategories() {
  categories.forEach((category) => {
    category.open = false;
  });
  localStorage.removeItem(storageKey);
}

function restoreLastOpenCategory() {
  const savedCategoryId = localStorage.getItem(storageKey);
  const savedCategory = savedCategoryId ? document.getElementById(savedCategoryId) : null;

  if (savedCategory) {
    openCategory(savedCategory);
    return;
  }

  const defaultCategory = document.querySelector('#media-category');
  if (defaultCategory) openCategory(defaultCategory);
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
    if (category.open) {
      closeOtherCategories(category);
      localStorage.setItem(storageKey, category.id);
      return;
    }

    const hasOpenCategory = categories.some((item) => item.open);
    if (!hasOpenCategory && localStorage.getItem(storageKey) === category.id) {
      localStorage.removeItem(storageKey);
    }
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

  if (!isTyping && /^[1-5]$/.test(event.key)) {
    event.preventDefault();
    const targetCategory = categories.find((category) => category.dataset.shortcut === event.key);
    openCategory(targetCategory);
    return;
  }

  if (event.key === 'Escape') {
    closeAllCategories();
    if (isTyping) activeElement.blur();
  }
});

restoreLastOpenCategory();
updateClearButton();
