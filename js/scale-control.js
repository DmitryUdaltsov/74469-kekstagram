'use strict';

(function () {
  var MAX_SCALE_VALUE = 100;
  var MIN_SCALE_VALUE = 25;
  var SCALE_STEP = 25;

  var reduceImageSizeButton = document.querySelector('.scale__control--smaller');
  var increaseImageSizeButton = document.querySelector('.scale__control--bigger');
  window.imageSizeValueElement = document.querySelector('.scale__control--value');

  // Устанавливает значения элементам равное полю масштаба
  var setScaleValue = function (value) {
    window.imageSizeValueElement.setAttribute('value', value + '%');
    window.imgUploadPreviewElement.style.transform = 'scale(' + (value / 100) + ')';
  };

  // Увеличивает фотографию по клику на кнопку увеличения фотографии
  increaseImageSizeButton.addEventListener('click', function () {
    var imageSizeNumericValue = parseFloat(window.imageSizeValueElement.value);
    if (imageSizeNumericValue >= MAX_SCALE_VALUE) {
      imageSizeNumericValue = MAX_SCALE_VALUE;
    } else if (imageSizeNumericValue < MIN_SCALE_VALUE) {
      imageSizeNumericValue = MIN_SCALE_VALUE;
    } else {
      imageSizeNumericValue += SCALE_STEP;
    }
    setScaleValue(imageSizeNumericValue);
  });

  // Уменьшает фотографию по клику на кнопку уменьшения фотографии
  reduceImageSizeButton.addEventListener('click', function () {
    var imageSizeNumericValue = parseFloat(window.imageSizeValueElement.value);
    if (imageSizeNumericValue > MAX_SCALE_VALUE) {
      imageSizeNumericValue = MAX_SCALE_VALUE;
    } else if (imageSizeNumericValue <= MIN_SCALE_VALUE) {
      imageSizeNumericValue = MIN_SCALE_VALUE;
    } else {
      imageSizeNumericValue -= SCALE_STEP;
    }
    setScaleValue(imageSizeNumericValue);
  });
})();
