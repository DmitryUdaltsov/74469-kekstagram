'use strict';

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
  var createBlock = function (commentObjects) {
    var fragment = document.createDocumentFragment();
    var parentNode = document.querySelector(photosClass);
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

  // Начало
  // Показываем маленькие фотографии в случайном порядке
  window.backend.load(createBlock, errorHandler);
  // Конец
})();
