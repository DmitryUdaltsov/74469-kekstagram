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
  var createBlock = function (parentNodeClassName, templateId, commentObjects) {
    var fragment = document.createDocumentFragment();
    var parentNode = document.querySelector(parentNodeClassName);
    for (var i = 0; i < commentObjects.length; i++) {
      fragment.appendChild(createDomElementFromTemplate(templateId, commentObjects[i]));
    }
    parentNode.appendChild(fragment);
  };

  // Начало
  // Показываем маленькие фотографии в случайном порядке
  createBlock(photosClass, photoTemplateId, window.photos);
  // Конец
})();
