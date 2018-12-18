'use strict';

(function () {
  // Показывает большую картинку с комментариями и лайками
  window.showBigPicture = function (objectData) {

    var LOAD_COMMENTS_COUNT = 5;
    var bigPicture = document.querySelector('.big-picture');
    var bigPictureClose = document.querySelector('#picture-cancel');
    var moreCommentsButton = document.querySelector('.comments-loader');
    var commentStartNumber = 0;

    var showNextComments = function () {
      // Показываем по 5 комментариев
      var commentEndNumber = commentStartNumber + LOAD_COMMENTS_COUNT;
      if (commentEndNumber > objectData.comments.length) {
        commentEndNumber = objectData.comments.length;
        // Прячет кнопку загрузки комментариев
        document.querySelector('.comments-loader').classList.add('visually-hidden');
      }
      showComments(commentStartNumber, commentEndNumber);
    };

    var moreCommentsButtonClickHandler = function () {
      showNextComments();
    };

    var moreCommentsButtonEnterHandler = function (evt) {
      if (evt.keyCode === window.KEYCODE_ENTER) {
        showNextComments();
      }
    };

    var closePopup = function () {
      window.hideElement(bigPicture);
      document.querySelector('body').classList.remove('modal-open');
      moreCommentsButton.removeEventListener('click', moreCommentsButtonClickHandler);
      moreCommentsButton.removeEventListener('click', moreCommentsButtonEnterHandler);
    };

    // Закрывает попап большой фотографии по клику на крест закрытия
    bigPictureClose.addEventListener('click', function () {
      closePopup();
    });

    // Закрывает попап большой фотографии по нажатию Esc
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.KEYCODE_ESCAPE) {
        closePopup();
      }
    });

    // Показываем фотку в полноэкранном режиме
    window.showElement(bigPicture);

    // Добавляем класс modal-open к элементу body
    document.querySelector('body').classList.add('modal-open');

    // Удаляем уже существующие комментарии из разметки
    var parentElement = document.querySelector('.social__comments');
    while (parentElement.firstChild) {
      parentElement.removeChild(parentElement.firstChild);
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
      commentStartNumber = lastComment;
      // Добавляем комментарии из массива комментариев
      var fragment = document.createDocumentFragment();
      for (var i = firstComment; i < lastComment; i++) {
        var templateCommentMarkup = document.querySelector('#big-comment').content;
        var commentElement = templateCommentMarkup.cloneNode(true);
        // Аватар коментатора
        commentElement.querySelector('img').setAttribute('src', objectData.comments[i].avatar);
        // Сообщение коментатора
        commentElement.querySelector('.social__text').textContent = objectData.comments[i].message;
        fragment.appendChild(commentElement);
      }
      parentElement.appendChild(fragment);
    };

    // Показываем кнопку "Загрузить ещё"
    if (document.querySelector('.comments-loader').classList.contains('visually-hidden')) {
      document.querySelector('.comments-loader').classList.remove('visually-hidden');
    }

    if (objectData.comments.length > LOAD_COMMENTS_COUNT) {
      // Если коментариев к фото больше пяти, то показываем первые 5
      showComments(0, LOAD_COMMENTS_COUNT);
    } else {
      // Показываем все коментарии
      showComments(0, objectData.comments.length);
      // Прячем кнопку загрузки комментариев
      document.querySelector('.comments-loader').classList.add('visually-hidden');
    }

    moreCommentsButton.addEventListener('click', moreCommentsButtonClickHandler);
    moreCommentsButton.addEventListener('keydown', moreCommentsButtonEnterHandler);
  };
})();
