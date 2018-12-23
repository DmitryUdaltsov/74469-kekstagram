'use strict';
(function () {
  var imgUploadFormElement = document.querySelector('.img-upload__form');
  var imgUploadInputElement = document.querySelector('#upload-file');
  var imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
  var closeUploadButton = imgUploadOverlayElement.querySelector('#upload-cancel');
  var filtersRadioButtons = document.querySelectorAll('.effects__radio');

  window.imgUploadPreviewElement = document.querySelector('.img-upload__preview img');

  var closeUploadPhotoPopup = function () {
    window.elementControl.hideElement(imgUploadOverlayElement, imgUploadInputElement);
    imgUploadFormElement.reset();
  };

  // Событие загрузки фотографии
  imgUploadInputElement.addEventListener('change', function () {
    // Показываем окно изменения фотографии
    window.elementControl.showElement(imgUploadOverlayElement);
    // Прячем слайдер
    window.elementControl.hideElement(window.sliderWrapper);
    window.imageSizeValueElement.setAttribute('value', window.DEFAULT_VALUE + '%');
    window.imgUploadPreviewElement.style.transform = 'scale(' + (window.DEFAULT_VALUE / 100) + ')';
    window.imgUploadPreviewElement.removeAttribute('class');
    filtersRadioButtons.forEach(function (button) {
      button.removeAttribute('checked');
    });
    document.querySelector('#effect-none').setAttribute('checked', true);
  });

  // Обрабатывает клик по кресту окна загрузки фотографии
  closeUploadButton.addEventListener('click', function () {
    // очищаем форму ввода, чтобы можно было загрузить такую же фотографию
    closeUploadPhotoPopup();
  });

  // Обрабатывает нажатие клавиши Escape для закрытия окна загрузки фотографии
  document.addEventListener('keydown', function (evt) {
    if ((evt.keyCode === window.utils.KEYCODE_ESCAPE) && (window.hashtagInputElement !== document.activeElement)) {
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

    var closeMessagePopup = function () {
      var messageDomElement = document.querySelector('.' + templateSelector);
      document.querySelector('main').removeChild(messageDomElement);
      document.removeEventListener('click', documentClickHandler);
      document.removeEventListener('keydown', documentEscapeHandler);
      button.removeEventListener('keydown', messageButtonEnterHandler);
    };

    // Закрывает сообщение по клику на любой области страницы
    var documentClickHandler = function () {
      closeMessagePopup();
    };

    // Закрывает сообщение по Esc
    var documentEscapeHandler = function (evt) {
      if (evt.keyCode === window.utils.KEYCODE_ESCAPE) {
        closeMessagePopup();
      }
    };

    // Закрывает сообщение по Enter
    var messageButtonEnterHandler = function (evt) {
      if (evt.keyCode === window.utils.KEYCODE_ENTER) {
        closeMessagePopup();
      }
    };

    // Темплэйт с сообщением
    var templateBlock = document.querySelector('#' + templateSelector).content;
    // Добавляем темплейт в блок main
    var messageElement = templateBlock.cloneNode(true);
    document.querySelector('main').appendChild(messageElement);

    document.addEventListener('click', documentClickHandler);
    document.addEventListener('keydown', documentEscapeHandler);

    var buttonClassName = '.' + templateSelector + '__button';
    var button = document.querySelector(buttonClassName);
    button.addEventListener('keydown', messageButtonEnterHandler);
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
