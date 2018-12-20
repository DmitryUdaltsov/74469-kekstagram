'use strict';

(function () {
  window.getSortedArray = function (photos) {
    var NEW_PHOTOS_COUNT = 10; // Количество новых фотографий по фильтру "НОВЫЕ"
    var filterPopularButton = document.querySelector('#filter-popular');
    var filterNewButton = document.querySelector('#filter-new');
    var filterDiscussedButton = document.querySelector('#filter-discussed');
    // Показывает кнопки фильтров
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');

    var makeActiveButton = function (activeButton) {
      var imgFiltersButtonCollection = document.querySelectorAll('.img-filters__button');
      for (var i = 0; i < imgFiltersButtonCollection.length; i++) {
        // Убираем у всех кнопок класс активности
        imgFiltersButtonCollection[i].classList.remove('img-filters__button--active');
      }
      activeButton.classList.add('img-filters__button--active');
    };

    var getRandomPhotos = function (numberOfPhotos) {
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
      for (var i = 0; i < numberOfPhotos; i++) {
        photosNew.push(photos[getRandomNumberFromArray(randomNumbers)]);
      }
      return photosNew;
    };

    var newButtonClickHandler = window.debounce(function () {
      window.createBlock(getRandomPhotos(NEW_PHOTOS_COUNT));
      makeActiveButton(filterNewButton);
    });

    var newButtonEnterHandler = window.debounce(function (evt) {
      if (evt.keyCode === window.utils.KEYCODE_ENTER) {
        window.createBlock(getRandomPhotos(NEW_PHOTOS_COUNT));
        makeActiveButton(filterNewButton);
      }
    });

    var popularButtonClickHandler = window.debounce(function () {
      window.createBlock(photos);
      makeActiveButton(filterPopularButton);
    });

    var popularButtonEnterHandler = window.debounce(function (evt) {
      if (evt.type === 'click' || evt.keyCode === window.utils.KEYCODE_ENTER) {
        window.createBlock(photos);
        makeActiveButton(filterPopularButton);
      }
    });

    var discussedButtonClickHandler = window.debounce(function () {
      window.createBlock(photos.slice().sort(function (left, right) {
        return right.comments.length - left.comments.length;
      }));
      makeActiveButton(filterDiscussedButton);
    });

    var discussedButtonEnterHandler = window.debounce(function (evt) {
      if (evt.keyCode === window.utils.KEYCODE_ENTER) {
        window.createBlock(photos.slice().sort(function (left, right) {
          return right.comments.length - left.comments.length;
        }));
        makeActiveButton(filterDiscussedButton);
      }
    });

    filterNewButton.addEventListener('click', newButtonClickHandler);

    filterPopularButton.addEventListener('click', popularButtonClickHandler);

    filterDiscussedButton.addEventListener('click', discussedButtonClickHandler);

    filterNewButton.addEventListener('keydown', newButtonEnterHandler);

    filterPopularButton.addEventListener('keydown', popularButtonEnterHandler);

    filterDiscussedButton.addEventListener('keydown', discussedButtonEnterHandler);
  };
})();
