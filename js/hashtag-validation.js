'use strict';

(function () {
  var HASHTAG_MAX_LENGH = 20;
  var HASHTAG_MAX_COUNT = 4;
  window.hashtagInputElement = document.querySelector('.text__hashtags');

  window.hashtagValidation = function () {
    var ErrorObj = function (messageText) {
      this.list = [];
      this.message = function () {
        return (messageText + this.list.join(', '));
      };
    };

    var doubles = new ErrorObj('Удалите повторяющиеся элементы: ');
    var tooBigs = new ErrorObj('Отредактируйте хэштеги длиной более ' + HASHTAG_MAX_LENGH + ' символов: ');
    var notStartedWithHashs = new ErrorObj('Эти хэштеги начинаются не с решетки: ');
    var moreThanFives = new ErrorObj('Удалите хэштеги сверх пяти максимально возможных: ');
    var onlyHashs = new ErrorObj('Исправьте хэштеги состоящие только из одного символпа #: ');

    var hashtags = window.hashtagInputElement
      .value
      .toLowerCase()
      .split(' ')
      .filter(function (hashtag) {
        // Удаляем пустые элементы, которые могли образоваться из за нескольких пробелов  подряд
        return (hashtag !== '');
      });

    // Проверка хэштегов
    for (var i = 0; i < hashtags.length; i++) {
      // Проверка на повторяющиеся хэш-теги
      if (hashtags.indexOf(hashtags[i]) !== i) {
        doubles.list.push(hashtags[i]);
      }
      // Проверка на хэштеги более 20 символов
      if (hashtags[i].length > HASHTAG_MAX_LENGH) {
        tooBigs.list.push(hashtags[i]);
      }
      // Проверка на хэштеги не начинающиеся с '#'
      if (hashtags[i].indexOf('#') !== 0) {
        notStartedWithHashs.list.push(hashtags[i]);
      }
      // Проверка на максимальное количество хэштегов
      if (i > HASHTAG_MAX_COUNT) {
        moreThanFives.list.push(hashtags[i]);
      }
      // Проверка на хэштеги состоящие только из '#'
      if (hashtags[i].length === 1) {
        onlyHashs.list.push(hashtags[i]);
      }
    }

    var errors = [doubles, tooBigs, notStartedWithHashs, moreThanFives, onlyHashs];
    for (var j = 0; j < errors.length; j++) {
      if (errors[j].list.length > 0) {
        window.hashtagInputElement.setCustomValidity(errors[j].message());
        return false;
      }
    }
    window.hashtagInputElement.setCustomValidity('');

    return true;
  };
  window.hashtagInputElement.addEventListener('input', window.hashtagValidation);
})();
