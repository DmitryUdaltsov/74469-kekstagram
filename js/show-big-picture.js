'use strict';

(function () {
  // Показывает большую картинку с комментариями и лайками
  window.showBigPicture = function (objectData) {

    var bigPicture = document.querySelector('.big-picture');
    var bigPictureClose = document.querySelector('#picture-cancel');
    bigPictureClose.addEventListener('click', function () {
      window.hideElement(bigPicture);
      document.querySelector('body').classList.remove('modal-open');
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.KEYCODE_ESCAPE) {
        window.hideElement(bigPicture);
        document.querySelector('body').classList.remove('modal-open');
      }
    });
    // Показывает фотку в полноэкранном режиме
    window.showElement(bigPicture);
    // Добавляет класс modal-open к элементу body
    document.querySelector('body').classList.add('modal-open');
    // Прячет кнопку загрузки комментариев
    document.querySelector('.comments-loader').classList.add('visually-hidden');

    // Прячет счетчик комментариев
    document.querySelector('.social__comment-count').classList.add('visually-hidden');

    // Удаляет уже существующие комментарии из разметки
    var parentNode = document.querySelector('.social__comments');
    while (parentNode.firstChild) {
      parentNode.removeChild(parentNode.firstChild);
    }

    // Наполнет разметку данными из объекта: фото, количество лайков, количество комментариев, подпись к фотографии
    document.querySelector('.big-picture__img').querySelector('img').setAttribute('src', objectData.url);
    // Количество лайков
    document.querySelector('.likes-count').textContent = objectData.likes;
    // Количество коментариев
    document.querySelector('.comments-count').textContent = objectData.comments.length;
    // Подпись к фотографии
    document.querySelector('.social__caption').textContent = objectData.description;

    // Добавляем комментарии из массива комментариев
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < objectData.comments.length; i++) {
      var templateCommentMarkup = document.querySelector('#big-comment').content;
      var commentNode = templateCommentMarkup.cloneNode(true);
      // Аватар коментатора
      commentNode.querySelector('img').setAttribute('src', objectData.comments[i].avatar);
      // Сообщение коментатора
      commentNode.querySelector('.social__text').textContent = objectData.comments[i].message;
      fragment.appendChild(commentNode);
    }
    parentNode.appendChild(fragment);
  };
})();
