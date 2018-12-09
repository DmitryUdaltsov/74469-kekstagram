'use strict';

// Константы
var NUMBER_OF_PHOTOS = 25;
var KEYCODE_ESCAPE = 27;
var KEYCODE_ENTER = 13;
var MAX_VALUE = 100;
var MIN_VALUE = 0;
var MAX_SCALE_VALUE = 100;
var MIN_SCALE_VALUE = 25;
var SCALE_STEP = 25;

// Переменные
var imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
var imgUploadInputElement = document.querySelector('#upload-file');
var imgUploadFormElement = document.querySelector('.img-upload__form');
var closeUploadButton = imgUploadOverlayElement.querySelector('#upload-cancel');
var imgUploadPreviewElement = document.querySelector('.img-upload__preview img');
var previewContainerCollection = document.querySelector('.img-upload__effects li');

var effectLevelDepthElement = document.querySelector('.effect-level__depth');
var effectLevelPinElement = document.querySelector('.effect-level__pin');
var effectLevelValueElement = document.querySelector('.effect-level__value');

var sliderWrapper = document.querySelector('.img-upload__effect-level');
var defaultFilter = 'effects__preview--none';
var currentFilter = defaultFilter;

var reduceImageSizeButton = document.querySelector('.scale__control--smaller');
var increaseImageSizeButton = document.querySelector('.scale__control--bigger');
var imageSizeValueElement = document.querySelector('.scale__control--value');

var hashtagInputElement = document.querySelector('.text__hashtags');
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

// Функции
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
          description: getDescription(),
          commentorAvatar: getRandomPeriod(1, 6)
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
  nextPhoto.addEventListener('click', function () {
    showBigPicture(objectData);
  });
  nextPhoto.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEYCODE_ENTER) {
      showBigPicture(objectData);
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

// Показывает большую картинку с комментариями и лайками
var showBigPicture = function (objectData) {

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureClose = document.querySelector('#picture-cancel');
  bigPictureClose.addEventListener('click', function () {
    hideElement(bigPicture);
    document.querySelector('body').classList.remove('modal-open');
  });
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEYCODE_ESCAPE) {
      hideElement(bigPicture);
      document.querySelector('body').classList.remove('modal-open');
    }
  });
  // Показывает фотку в полноэкранном режиме
  showElement(bigPicture);
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
  document.querySelector('.likes-count').textContent = objectData.likes;
  document.querySelector('.comments-count').textContent = objectData.comments.length;
  document.querySelector('.social__caption').textContent = objectData.description;

  // Добавляем комментарии из массива комментариев
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < objectData.comments.length; i++) {
    var templateCommentMarkup = document.querySelector('#big-comment').content;
    var commentNode = templateCommentMarkup.cloneNode(true);
    commentNode.querySelector('img').setAttribute('src', 'img/avatar-' + objectData.commentorAvatar + '.svg');
    commentNode.querySelector('.social__text').textContent = objectData.comments[i];
    fragment.appendChild(commentNode);
  }
  parentNode.appendChild(fragment);
};

// Закрывает всплывающее окно element, если передано clearInputValue то очистить
var hideElement = function (element, clearInputValue) {
  if (clearInputValue) {
    clearInputValue.value = '';
  }
  element.classList.add('hidden');
};

// Открывает всплывающее окно element
var showElement = function (element) {
  element.classList.remove('hidden');
};

// Получает значение фильтра
var getFilterProperty = function (filterClass, sliderValue) {
  var filterProperty = '';
  switch (filterClass) {
    case 'effects__preview--chrome' :
      filterProperty = 'grayscale(' + sliderValue / 100 + ')';
      break;
    case 'effects__preview--sepia' :
      filterProperty = 'sepia(' + sliderValue / 100 + ')';
      break;
    case 'effects__preview--marvin' :
      filterProperty = 'invert(' + sliderValue + '%)';
      break;
    case 'effects__preview--phobos' :
      filterProperty = 'blur(' + Math.round(sliderValue / 33) + 'px)';
      break;
    case 'effects__preview--heat' :
      filterProperty = 'brightness(' + Math.round(sliderValue / 33) + ')';
      break;
  }
  return filterProperty;
};

// Устанавливает значения элементам согласно положению слайдера
var setSliderValues = function (value) {
  effectLevelValueElement.setAttribute('value', value);
  effectLevelDepthElement.style.width = value + '%';
  effectLevelPinElement.style.left = value + '%';
};

// Устанавливает значения элементам равное полю масштаба
var setScaleValue = function (value) {
  imageSizeValueElement.setAttribute('value', value + '%');
  imgUploadPreviewElement.style.transform = 'scale(' + (value / 100) + ')';
};

var hashtagCheckHandler = function () {
  var ErrorObj = function (messageText) {
    this.list = [];
    this.message = function () {
      return (messageText + this.list.join(', '));
    };
  };

  var doubles = new ErrorObj('Удалите повторяющиеся элементы: ');
  var tooBigs = new ErrorObj('Отредактируйте хэштеги длиной более 20 символов: ');
  var notStartedWithHashs = new ErrorObj('Эти хэштеги начинаются не с решетки: ');
  var moreThanFives = new ErrorObj('Удалите хэштеги сверх пяти максимально возможных: ');
  var onlyHashs = new ErrorObj('Исправьте хэштеги состоящие только из одного символпа #: ');

  var hashtags = hashtagInputElement
    .value
    .toLowerCase()
    .split(' ')
    .filter(function (hashtag) {
    // Удаляем пустые элементы, которые могли образоваться из за нескольких пробелов  подряд
      return (hashtag !== '');
    });

  // Проверка хэштегов
  for (var i = 0; i < hashtags.length; i++) {
    // Проврка на повторяющиеся хэш-теги
    if (hashtags.indexOf(hashtags[i]) !== i) {
      doubles.list.push(hashtags[i]);
    }
    // Проверка на хэштеги более 20 символов
    if (hashtags[i].length > 20) {
      tooBigs.list.push(hashtags[i]);
    }
    // Проверка на хэштеги не начинающиеся с '#'
    if (hashtags[i].indexOf('#') !== 0) {
      notStartedWithHashs.list.push(hashtags[i]);
    }
    // Проверка на максимальное количество хэштегов
    if (i > 4) {
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
      hashtagInputElement.setCustomValidity(errors[j].message());
      return false;
    }
  }
  hashtagInputElement.setCustomValidity('');

  return true;
};

// Добавляем обработчики событий
var addListeners = function () {

  // Событие загрузки фотографии
  imgUploadInputElement.addEventListener('change', function () {
    // Показываем окно изменения фотографии
    showElement(imgUploadOverlayElement);
    // Прячем слайдер
    hideElement(sliderWrapper);
    imageSizeValueElement.setAttribute('value', MAX_VALUE + '%');
  });

  // Слайдер
  effectLevelPinElement.addEventListener('mousedown', function (evt) {
    // Отключаю выделение объектов
    evt.preventDefault();
    var effectLevelBarEndX = document.querySelector('.effect-level__line').getBoundingClientRect().right;
    var effectLevelBarStartX = document.querySelector('.effect-level__line').getBoundingClientRect().left;
    var effectLevelBarWidth = document.querySelector('.effect-level__line').getBoundingClientRect().width;
    var startXCoord = evt.clientX;
    var sliderMouseMoveHandler = function (moveEvt) {
      if ((moveEvt.clientX <= effectLevelBarEndX) && (moveEvt.clientX >= effectLevelBarStartX)) {
        var shift = moveEvt.clientX - startXCoord;
        var shiftPercent = shift * 100 / effectLevelBarWidth;
        var nextValue = Math.round(parseFloat(effectLevelValueElement.value) + parseFloat(shiftPercent));
        // Костыль для слайдера уходящего в минус и в бесконечность
        if (nextValue < MIN_VALUE) {
          nextValue = MIN_VALUE;
        } else if (nextValue > MAX_VALUE) {
          nextValue = MAX_VALUE;
        }
        setSliderValues(nextValue);
        // Обновление эффектов
        imgUploadPreviewElement.style.setProperty('filter', getFilterProperty(currentFilter, nextValue));
        // Ставим начальную координату
        startXCoord = moveEvt.clientX;
      }
    };
    var sliderMouseUpHandler = function () {
      document.removeEventListener('mousemove', sliderMouseMoveHandler);
      document.removeEventListener('mouseup', sliderMouseUpHandler);
    };
    document.addEventListener('mousemove', sliderMouseMoveHandler);
    document.addEventListener('mouseup', sliderMouseUpHandler);
  });

  // Функция добавления листенера нажатия на превьюшки с эффектами
  var thumbnailClickHandler = function (element) {
    element.addEventListener('click', function () {
      // Убираем все классы эффектов
      while (imgUploadPreviewElement.classList.length) {
        imgUploadPreviewElement.classList.remove(imgUploadPreviewElement.classList[0]);
      }
      // Убираем фильтр
      imgUploadPreviewElement.style.removeProperty('filter');
      currentFilter = element.querySelector('.effects__preview').classList[1];
      imgUploadPreviewElement.classList.add(currentFilter);

      // Показывает слайдер на всех картинках кроме о
      if (currentFilter !== defaultFilter) {
        showElement(sliderWrapper);
      } else {
        hideElement(sliderWrapper);
      }

      // Устанавливаем максимальное значение
      setSliderValues(MAX_VALUE);
      getFilterProperty(currentFilter, MAX_VALUE);
    });
  };

  // Устанавливаем листенер нажатия на превьюшки с эффектами
  for (var effectNumber = 0; effectNumber < previewContainerCollection.length; effectNumber++) {
    thumbnailClickHandler(previewContainerCollection[effectNumber]);
  }

  // Увеличивает фотографию по клику на кнопку увеличения фотографии
  increaseImageSizeButton.addEventListener('click', function () {
    var imageSizeNumericValue = parseFloat(imageSizeValueElement.value);
    if (imageSizeNumericValue >= MAX_SCALE_VALUE) {
      imageSizeNumericValue = MAX_SCALE_VALUE;
    } else if (imageSizeNumericValue < MIN_SCALE_VALUE) {
      imageSizeNumericValue = MIN_SCALE_VALUE;
    } else {
      imageSizeNumericValue += SCALE_STEP;
    }
    setScaleValue(imageSizeNumericValue);
  });

  // Уменьшает фотографию по клику на кнопку уменьшения фотографии
  reduceImageSizeButton.addEventListener('click', function () {
    var imageSizeNumericValue = parseFloat(imageSizeValueElement.value);
    if (imageSizeNumericValue > MAX_SCALE_VALUE) {
      imageSizeNumericValue = MAX_SCALE_VALUE;
    } else if (imageSizeNumericValue <= MIN_SCALE_VALUE) {
      imageSizeNumericValue = MIN_SCALE_VALUE;
    } else {
      imageSizeNumericValue -= SCALE_STEP;
    }
    setScaleValue(imageSizeNumericValue);
  });

  // Обрабатывает клик по кресту окна загрузки фотографии
  closeUploadButton.addEventListener('click', function () {
    // очищаем форму ввода, чтобы можно было загрузить такую же фотографию
    hideElement(imgUploadOverlayElement, imgUploadInputElement);
  }
  );

  // Обрабатывает нажатие клавиши Escape для закрытия окна загрузки фотографии
  document.addEventListener('keydown', function (evt) {
    if ((evt.keyCode === KEYCODE_ESCAPE) && (hashtagInputElement !== document.activeElement)) {
      // очищаем форму ввода, чтобы можно было загрузить такую же фотографию
      hideElement(imgUploadOverlayElement, imgUploadInputElement);
    }
  });

  hashtagInputElement.addEventListener('input', hashtagCheckHandler);
  imgUploadFormElement.addEventListener('submit', hashtagCheckHandler);
};

// Начало
addListeners();

// Заполняем массив из которого будем брать случайные элементы
fillArray(1, NUMBER_OF_PHOTOS);
// Создаем массив из объектов Photo
var photos = createPhotoArray(NUMBER_OF_PHOTOS);
// Показываем маленькие фотографии в случайном порядке
createBlock(photosClass, photoTemplateId, photos);

// Конец
