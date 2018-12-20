'use strict';

(function () {
  window.DEFAULT_VALUE = 100;
  var defaultFilter = 'effects__preview--none';
  window.currentFilter = defaultFilter;
  var previewContainerCollection = document.querySelectorAll('.effects__item');

  // Получает значение фильтра
  window.getFilterProperty = function (filterClass, sliderValue) {
    var filterProperty = '';
    switch (filterClass) {
      case 'effects__preview--chrome' :
        filterProperty = 'grayscale(' + sliderValue / 100 + ')';
        break;
      case 'effects__preview--sepia' :
        filterProperty = 'sepia(' + sliderValue / 100 + ')';
        break;
      case 'effects__preview--marvin' :
        filterProperty = 'invert(' + sliderValue + '%)';
        break;
      case 'effects__preview--phobos' :
        filterProperty = 'blur(' + Math.round(sliderValue / 33) + 'px)';
        break;
      case 'effects__preview--heat' :
        filterProperty = 'brightness(' + Math.round(sliderValue / 33) + ')';
        break;
    }
    return filterProperty;
  };

  // Функция добавления листенера нажатия на превьюшки с эффектами
  var thumbnailClickHandler = function (element) {
    element.addEventListener('click', function () {
      // Убираем все классы эффектов
      while (window.imgUploadPreviewElement.classList.length) {
        window.imgUploadPreviewElement.classList.remove(window.imgUploadPreviewElement.classList[0]);
      }
      // Убираем фильтр
      window.imgUploadPreviewElement.style.removeProperty('filter');
      window.currentFilter = element.querySelector('.effects__preview').classList[1];
      window.imgUploadPreviewElement.classList.add(window.currentFilter);

      // Показывает слайдер на всех картинках кроме фильтра Original
      if (window.currentFilter !== defaultFilter) {
        window.elementControl.showElement(window.sliderWrapper);
      } else {
        window.elementControl.hideElement(window.sliderWrapper);
      }

      // Устанавливаем максимальное значение
      window.setSliderValues(window.DEFAULT_VALUE);
      window.getFilterProperty(window.currentFilter, window.DEFAULT_VALUE);
    });
  };

  // Устанавливаем листенер нажатия на превьюшки с эффектами
  for (var effectNumber = 0; effectNumber < previewContainerCollection.length; effectNumber++) {
    thumbnailClickHandler(previewContainerCollection[effectNumber]);
  }
})();
