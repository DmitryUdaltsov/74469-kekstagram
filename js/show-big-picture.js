'use strict';

(function () {
  // Показывает большую картинку с комментариями и лайками
  window.showBigPicture = function (objectData) {

    var LOAD_COMMENTS_COUNT = 5;
    var bigPicture = document.querySelector('.big-picture');
    var bigPictureClose = document.querySelector('#picture-cancel');
    var loadMoreCommentsButton = document.querySelector('.comments-loader');
    var nextCommentNumberStart = 0;

    var loadMoreCommentsButtonEventHandler = function () {
      // Показываем по 5 комментариев
      var nextCommentNumberEnd = nextCommentNumberStart + LOAD_COMMENTS_COUNT;
      if (nextCommentNumberEnd > objectData.comments.length) {
        nextCommentNumberEnd = objectData.comments.length;
        // Прячет кнопку загрузки комментариев
        document.querySelector('.comments-loader').classList.add('visually-hidden');
      }
      showComments(nextCommentNumberStart, nextCommentNumberEnd);
    };

    // Закрывает попап большой фотографии по клику на крест закрытия
    bigPictureClose.addEventListener('click', function () {
      window.hideElement(bigPicture);
      document.querySelector('body').classList.remove('modal-open');
      loadMoreCommentsButton.removeEventListener('click', loadMoreCommentsButtonEventHandler);
    });

    // Закрывает попап большой фотографии по нажатию Esc
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.KEYCODE_ESCAPE) {
        window.hideElement(bigPicture);
        document.querySelector('body').classList.remove('modal-open');
        loadMoreCommentsButton.removeEventListener('click', loadMoreCommentsButtonEventHandler);
      }
    });

    // Показывает фотку в полноэкранном режиме
    window.showElement(bigPicture);

    // Добавляет класс modal-open к элементу body
    document.querySelector('body').classList.add('modal-open');

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

    var showComments = function (firstComment, lastComment) {
      // Меняем счетчик показываеммых коментариев
      document.querySelector('.comments-shown').textContent = lastComment;
      nextCommentNumberStart = lastComment;
      // Добавляем комментарии из массива комментариев
      var fragment = document.createDocumentFragment();
      for (var i = firstComment; i < lastComment; i++) {
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

    // Показывает кнопку "Загрузить ещё"
    if (document.querySelector('.comments-loader').classList.contains('visually-hidden')) {
      document.querySelector('.comments-loader').classList.remove('visually-hidden');
    }

    if (objectData.comments.length > LOAD_COMMENTS_COUNT) {
      showComments(0, LOAD_COMMENTS_COUNT);
    } else {
      // Прячет кнопку загрузки комментариев
      document.querySelector('.comments-loader').classList.add('visually-hidden');
      showComments(0, objectData.comments.length);
    }

    loadMoreCommentsButton.addEventListener('click', loadMoreCommentsButtonEventHandler);

  };
})();
