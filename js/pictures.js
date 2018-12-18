'use strict';

/**
 *  Отображает плитку из маленьких фотографий на странице
 */
(function () {
  // Переменные
  var photosClass = '.pictures';
  var photoTemplateId = '#picture';

  // Функции
  // Создаёт DOM-элементы, соответствующие фотографиям и заполняет их данными из массива:
  var createDomElementFromTemplate = function (templateId, objectData) {
    var templateBlock = document.querySelector(templateId).content.querySelector('.picture');
    var nextPhoto = templateBlock.cloneNode(true);
    nextPhoto.querySelector('.picture__img').setAttribute('src', objectData.url);
    nextPhoto.querySelector('.picture__likes').textContent = objectData.likes;
    nextPhoto.querySelector('.picture__comments').textContent = objectData.comments.length;

    nextPhoto.addEventListener('click', function () {
      window.showBigPicture(objectData);
    });
    nextPhoto.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.KEYCODE_ENTER) {
        window.showBigPicture(objectData);
      }
    });
    return nextPhoto;
  };

  // Отрисовывает сгенерированные DOM-элементы в блок parentNode
  window.createBlock = function (commentObjects) {
    var fragment = document.createDocumentFragment();
    var parentNode = document.querySelector(photosClass);
    // Очищаем блок с отрисовыванными плитками фотографий
    var picturesCollection = document.querySelectorAll('.pictures .picture');
    for (var j = 0; j < picturesCollection.length; j++) {
      picturesCollection[j].remove();
    }
    for (var i = 0; i < commentObjects.length; i++) {
      fragment.appendChild(createDomElementFromTemplate(photoTemplateId, commentObjects[i]));
    }
    parentNode.appendChild(fragment);
  };

  // Плашка сверху сайта об ошибке загрузки фотографий
  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red; padding: 20px 0';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var successHandler = function (photos) {
    window.createBlock(photos);
    window.getSortedArray(photos);
  };

  // Показываем маленькие фотографии
  window.backend.load(successHandler, errorHandler);

})();
