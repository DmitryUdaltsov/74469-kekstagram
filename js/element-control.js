'use strict';

(function () {

  window.elementControl = {
    // Закрывает всплывающее окно element, если передано clearInputValue то очистить
    hideElement: function (element, clearInputValue) {
      if (clearInputValue) {
        clearInputValue.value = '';
      }
      element.classList.add('hidden');
    },

    // Открывает всплывающее окно element
    showElement: function (element) {
      element.classList.remove('hidden');
    }
  };
})();
