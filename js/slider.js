'use strict';

(function () {
  // Слайдер
  var MAX_SLIDER_VALUE = 100;
  var MIN_SLIDER_VALUE = 0;
  var effectLevelDepthElement = document.querySelector('.effect-level__depth');
  var effectLevelPinElement = document.querySelector('.effect-level__pin');
  var effectLevelValueElement = document.querySelector('.effect-level__value');
  window.sliderWrapper = document.querySelector('.img-upload__effect-level');

  // Устанавливает значения элементам согласно положению слайдера
  window.setSliderValues = function (value) {
    effectLevelValueElement.setAttribute('value', value);
    effectLevelDepthElement.style.width = value + '%';
    effectLevelPinElement.style.left = value + '%';
  };

  effectLevelPinElement.addEventListener('mousedown', function (evt) {
    // Отключаю выделение объектов
    evt.preventDefault();
    var effectLevelBarEndX = document.querySelector('.effect-level__line').getBoundingClientRect().right;
    var effectLevelBarStartX = document.querySelector('.effect-level__line').getBoundingClientRect().left;
    var effectLevelBarWidth = document.querySelector('.effect-level__line').getBoundingClientRect().width;
    var startXCoord = evt.clientX;
    var sliderMouseMoveHandler = function (moveEvt) {
      if ((moveEvt.clientX <= effectLevelBarEndX) && (moveEvt.clientX >= effectLevelBarStartX)) {
        var shift = moveEvt.clientX - startXCoord;
        var shiftPercent = shift * 100 / effectLevelBarWidth;
        var nextValue = parseFloat(effectLevelValueElement.value) + parseFloat(shiftPercent);
        // Костыль для слайдера уходящего в минус и в бесконечность
        if (nextValue < MIN_SLIDER_VALUE) {
          nextValue = MIN_SLIDER_VALUE;
        } else if (nextValue > MAX_SLIDER_VALUE) {
          nextValue = MAX_SLIDER_VALUE;
        }
        window.setSliderValues(nextValue);
        // Обновление эффектов
        window.imgUploadPreviewElement.style.setProperty('filter', window.getFilterProperty(window.currentFilter, nextValue));
        // Ставим начальную координату
        startXCoord = moveEvt.clientX;
      }
    };
    var sliderMouseUpHandler = function () {
      document.removeEventListener('mousemove', sliderMouseMoveHandler);
      document.removeEventListener('mouseup', sliderMouseUpHandler);
    };
    document.addEventListener('mousemove', sliderMouseMoveHandler);
    document.addEventListener('mouseup', sliderMouseUpHandler);
  });
})();
