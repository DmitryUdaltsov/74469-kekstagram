'use strict';
(function () {
  var imgUploadFormElement = document.querySelector('.img-upload__form');
  var imgUploadInputElement = document.querySelector('#upload-file');
  var imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
  var closeUploadButton = imgUploadOverlayElement.querySelector('#upload-cancel');

  window.imgUploadPreviewElement = document.querySelector('.img-upload__preview img');

  var closeUploadPhotoPopup = function () {
    window.hideElement(imgUploadOverlayElement, imgUploadInputElement);
    imgUploadFormElement.reset();
  };

  // Событие загрузки фотографии
  imgUploadInputElement.addEventListener('change', function () {
    // Показываем окно изменения фотографии
    window.showElement(imgUploadOverlayElement);
    // Прячем слайдер
    window.hideElement(window.sliderWrapper);
    window.imageSizeValueElement.setAttribute('value', window.DEFAULT_VALUE + '%');
    window.imgUploadPreviewElement.style.transform = 'scale(' + (window.DEFAULT_VALUE / 100) + ')';
  });

  // Обрабатывает клик по кресту окна загрузки фотографии
  closeUploadButton.addEventListener('click', function () {
    // очищаем форму ввода, чтобы можно было загрузить такую же фотографию
    closeUploadPhotoPopup();
  });

  // Обрабатывает нажатие клавиши Escape для закрытия окна загрузки фотографии
  document.addEventListener('keydown', function (evt) {
    if ((evt.keyCode === window.KEYCODE_ESCAPE) && (window.hashtagInputElement !== document.activeElement)) {
      // очищаем форму ввода, чтобы можно было загрузить такую же фотографию
      closeUploadPhotoPopup();
    }
  });

  /**
   * Показывает сообщение при удачной или не удачной загрузке фотографии
   * @param {string} templateSelector error или success
   */
  var showMessage = function (templateSelector) {
    closeUploadPhotoPopup();
    var buttonClassName = '.' + templateSelector + '__button';

    var closeMessagePopup = function () {
      var messageDomElement = document.getElementsByClassName(templateSelector)[0];
      document.querySelector('main').removeChild(messageDomElement);
      document.removeEventListener('click', clickAnywhereHandler);
      document.removeEventListener('keydown', escapeHandler);
      button.removeEventListener('keydown', enterHandler);
    };

    // Закрывает сообщение по клику на любой области страницы
    var clickAnywhereHandler = function () {
      closeMessagePopup();
    };

    // Закрывает сообщение по Esc
    var escapeHandler = function (evt) {
      if (evt.keyCode === window.KEYCODE_ESCAPE) {
        closeMessagePopup();
      }
    };

    // Закрывает сообщение по Enter
    var enterHandler = function (evt) {
      if (evt.keyCode === window.KEYCODE_ENTER) {
        closeMessagePopup();
      }
    };

    // Темплэйт с сообщением
    var templateBlock = document.getElementById(templateSelector).content;
    // Добавляем темплейт в блок main
    var messageNode = templateBlock.cloneNode(true);
    document.querySelector('main').appendChild(messageNode);

    document.addEventListener('click', clickAnywhereHandler);
    document.addEventListener('keydown', escapeHandler);
    //
    var button = document.querySelector(buttonClassName);
    button.addEventListener('keydown', enterHandler);
  };

  var showSuccessMessage = function () {
    showMessage('success');
  };

  var showErrorMessage = function () {
    showMessage('error');
  };

  // Отправка формы
  imgUploadFormElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(imgUploadFormElement), showSuccessMessage, showErrorMessage);
  });
})();
