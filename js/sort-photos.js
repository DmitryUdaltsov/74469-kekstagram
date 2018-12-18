'use strict';

(function () {
  window.getSortedArray = function (photos) {
    var filterPopularButton = document.querySelector('#filter-popular');
    var filterNewButton = document.querySelector('#filter-new');
    var filterDiscussedButton = document.querySelector('#filter-discussed');
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');

    var newButtonEventHandler = window.debounce(function (evt) {
      if (evt.type === 'click' || evt.keyCode === window.KEYCODE_ENTER) {
        var NEW_PHOTOS_COUNT = 10; // Количество новых фотографий
        var photosNew = [];

        // Заполняет массив числами по порядку от min до max
        var fillArray = function (min, max) {
          var array = [];
          if (min > max) {
            var temp = max;
            max = min;
            min = temp;
          }
          for (var i = min; i <= max; i++) {
            array.push(i);
          }
          return array;
        };

        // Получает случайное число из массива и удаляет его
        var getRandomNumberFromArray = function (array) {
          var randomIndex = window.getRandomPeriod(0, array.length - 1);
          var randomElement = array[randomIndex];
          array.splice(randomIndex, 1);
          return randomElement;
        };
        // Заполняем массив для случайных неповторяющихся чисел
        var randomNumbers = fillArray(0, photos.length - 1);
        // Заполняем новый массив со случайными неповторяющимися объектами фотографий
        for (var i = 0; i < NEW_PHOTOS_COUNT; i++) {
          photosNew.push(photos[getRandomNumberFromArray(randomNumbers)]);
        }
        window.createBlock(photosNew);
      }
    });

    var popularButtonHandler = window.debounce(function (evt) {
      if (evt.type === 'click' || evt.keyCode === window.KEYCODE_ENTER) {
        window.createBlock(photos);
      }
    });

    var discussedButtonEventHandler = window.debounce(function (evt) {
      if (evt.type === 'click' || evt.keyCode === window.KEYCODE_ENTER) {
        window.createBlock(photos.slice().sort(function (left, right) {
          return right.comments.length - left.comments.length;
        }));
      }
    });

    filterNewButton.addEventListener('click', newButtonEventHandler);

    filterPopularButton.addEventListener('click', popularButtonHandler);

    filterDiscussedButton.addEventListener('click', discussedButtonEventHandler);

    filterNewButton.addEventListener('keydown', newButtonEventHandler);

    filterPopularButton.addEventListener('keydown', popularButtonHandler);

    filterDiscussedButton.addEventListener('keydown', discussedButtonEventHandler);
  };
})();
