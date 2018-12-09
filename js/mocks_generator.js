'use strict';

(function () {
  var NUMBER_OF_PHOTOS = 25;
  var randomNumbers = [];
  var comments = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var descriptions = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];

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
    randomNumbers = array;
  };

  // Получает случайное число из массива и удаляет его
  var getRandomNumberFromArray = function (array) {
    var randomIndex = window.getRandomPeriod(0, array.length - 1);
    var randomElement = array[randomIndex];
    array.splice(randomIndex, 1);
    return randomElement;
  };

  // Получает массив комментариев к фотографии
  var getComments = function (commentsNumber) {
    var selectedComments = [];
    for (var i = 0; i < commentsNumber; i++) {
      selectedComments.push(comments[window.getRandomPeriod(0, comments.length - 1)]);
    }
    return selectedComments;
  };

  // Получает описание фотографии
  var getDescription = function () {
    return descriptions[window.getRandomPeriod(0, descriptions.length - 1)];
  };

  // Создает массив из объектов фотографий
  var createPhotoArray = function (numberOfPhotos) {
    var photos = [];
    for (var i = 0; i < numberOfPhotos; i++) {
      photos.push(
          {
            url: 'photos/' + getRandomNumberFromArray(randomNumbers) + '.jpg',
            likes: window.getRandomPeriod(15, 200),
            comments: getComments(window.getRandomPeriod(1, 2)),
            description: getDescription(),
            commentorAvatar: window.getRandomPeriod(1, 6)
          }
      );
    }
    return photos;
  };
  // Заполняем массив из которого будем брать случайные элементы
  fillArray(1, NUMBER_OF_PHOTOS);
  // Создаем массив из объектов Photo
  window.photos = createPhotoArray(NUMBER_OF_PHOTOS);
})();
