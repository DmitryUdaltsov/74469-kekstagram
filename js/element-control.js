'use strict';

(function () {
  // Закрывает всплывающее окно element, если передано clearInputValue то очистить
  window.hideElement = function (element, clearInputValue) {
    if (clearInputValue) {
      clearInputValue.value = '';
    }
    element.classList.add('hidden');
  };

  // Открывает всплывающее окно element
  window.showElement = function (element) {
    element.classList.remove('hidden');
  };
})();
