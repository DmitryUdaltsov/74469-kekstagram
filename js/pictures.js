'use strict';

var NUMBER_OF_PHOTOS = 25;
var photosClass = '.pictures';
var photoTemplateId = '#picture';

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

var randomNumbers = [];

// Получает случайное число в заданном диапазоне от beginNumber до endNumber
var getRandomPeriod = function (beginNumber, endNumber) {
  return Math.round(beginNumber + Math.random() * (endNumber - beginNumber));
};

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
  var randomIndex = getRandomPeriod(0, array.length - 1);
  var randomElement = array[randomIndex];
  array.splice(randomIndex, 1);
  return randomElement;
};

// Получает массив комментариев к фотографии
var getComments = function (commentsNumber) {
  var selectedComments = [];
  for (var i = 0; i < commentsNumber; i++) {
    selectedComments.push(comments[getRandomPeriod(0, comments.length - 1)]);
  }
  return selectedComments;
};

// Получает описание фотографии
var getDescription = function () {
  return descriptions[getRandomPeriod(0, descriptions.length - 1)];
};

// Создает массив из объектов фотографий
var createPhotoArray = function (numberOfPhotos) {
  var photos = [];
  for (var i = 0; i < numberOfPhotos; i++) {
    photos.push(
        {
          url: 'photos/' + getRandomNumberFromArray(randomNumbers) + '.jpg',
          likes: getRandomPeriod(15, 200),
          comments: getComments(getRandomPeriod(1, 2)),
          description: getDescription()
        }
    );
  }
  return photos;
};

// Создаёт DOM-элементы, соответствующие фотографиям и заполняет их данными из массива:
var createDomElementFromTemplate = function (templateId, objectData) {
  var templateBlock = document.querySelector(templateId).content.querySelector('.picture');
  var nextPhoto = templateBlock.cloneNode(true);
  nextPhoto.querySelector('.picture__img').setAttribute('src', objectData.url);
  nextPhoto.querySelector('.picture__likes').textContent = objectData.likes;
  nextPhoto.querySelector('.picture__comments').textContent = objectData.comments.length;
  return nextPhoto;
};

// Отрисовывает сгенерированные DOM-элементы в блок parentNode
var createBlock = function (parentNode, templateId, array) {
  var fragment = document.createDocumentFragment();
  var parent = document.querySelector(parentNode);
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(createDomElementFromTemplate(templateId, array[i]));
  }
  parent.appendChild(fragment);
};

// Показывает большую картинку с комментариями и лайками
var showBigPicture = function (objectData) {

  // Показывает фотку в полноэкранном режиме
  document.querySelector('.big-picture').classList.remove('hidden');

  // Прячет кнопку загрузки комментариев
  document.querySelector('.comments-loader').classList.add('visually-hidden');

  // Прячет счетчик комментариев
  document.querySelector('.social__comment-count').classList.add('visually-hidden');

  // Удаляет уже существующие комментарии из разметки
  var parent = document.querySelector('.social__comments');
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }

  // Наполнет разметку данными из объекта: фото, количество лайков, количество комментариев, подпись к фотографии
  document.querySelector('.big-picture__img').querySelector('img').setAttribute('src', objectData.url);
  document.querySelector('.likes-count').textContent = objectData.likes;
  document.querySelector('.comments-count').textContent = objectData.comments.length;
  document.querySelector('.social__caption').textContent = objectData.description;

  // Добавляем комментарии из массива комментариев
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < objectData.comments.length; i++) {
    var nextComment = document.querySelector('#big-comment').content;
    nextComment.cloneNode(true);
    nextComment.querySelector('img').setAttribute('src', 'img/avatar-' + getRandomPeriod(1, 6) + '.svg');
    nextComment.querySelector('.social__text').textContent = objectData.comments[i];
    fragment.appendChild(nextComment);
  }
  parent.appendChild(fragment);
};

// Начало
// Заполняем массив из которого будем брать случайные элементы
fillArray(1, NUMBER_OF_PHOTOS);
// Создаем массив из объектов Photo
var photos = createPhotoArray(NUMBER_OF_PHOTOS);
// Показываем маленькие фотографии в случайном порядке
createBlock(photosClass, photoTemplateId, photos);
// Показываем большую картинку
showBigPicture(photos[1]);

// Конец
