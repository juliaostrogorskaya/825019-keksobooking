'use strict';

var ADVERTS_NUMBER = 8;
var AUTHOR_AVATARS = generateAvatarLinks(ADVERTS_NUMBER);
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MIN_GUESTS = 1;
var MAX_GUESTS = 3;
var MIN_X = 0;
var MAX_X = 1200;
var MIN_Y = 130;
var MAX_Y = 630;
var PIN_SIZE_X = 50;
var PIN_SIZE_Y = 70;
var ADVERT_TITLE = 'заголовок объявления';
var OFFER_TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var OFFER_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var OFFER_CHECKIN = [
  '12:00',
  '13:00',
  '14:00'
];

var OFFER_CHECKOUT = [
  '12:00',
  '13:00',
  '14:00'
];

var OFFER_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var OFFER_PHOTOS = [
  'https://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'https://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'https://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var map = document.querySelector('.map');
var pinsArea = map.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var mapContainer = map.querySelector('.map__filters-container');


/**
   * Выбирает рандомное число из заданного промежутка чисел

   * @param {number} min Минимальное число.
   * @param {number} max Максимальное число.
   * @return {number} randomNumber Рандомное число.
   */
var getRandomNumber = function (min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min)) + min;
  return randomNumber;
};

/**
   * Создает массив рандомной длины

   * @param {array} array Массив.
   * @return {array}  array Новый массив рандомной длины.
   */
var trimToRandomArrayLength = function (array) {
  var randomNum = getRandomNumber(1, array.length + 1);
  return array.slice(0, randomNum);
};

/**
   * Создает массив строк с адресами изображений аватаров

   * @param {number} num Длина массива.
   * @return {array} links Итоговый массив.
   */
function generateAvatarLinks(num) {
  var links = [];

  for (var i = 1; i <= num; i++) {
    var link = 'img/avatars/user' + leadingZeroes(i, 2) + '.png';
    links.push(link);
  }

  return links;
}

/**
   * Добавляет 0 перед числом меньше заданной длины

   * @param {number} number Число, перед которым нужно добавить 0.
   * @param {number} length Минимальная длина строки, включая ведущие нули.
   * @return {string} str Итоговая строка.
   */
function leadingZeroes(number, length) {
  var str = '' + number;

  while (str.length < length) {
    str = '0' + str;
  }

  return str;
}

/**
   * Перемешивает элементы массива в случайном порядке
   *
   * @param {array} array Массив, который нужно перемешать.
   * @return {array} array Итоговый массив.
   */
function shuffleArray(array) {
  var currentIndex = array.length;
  var temporaryValue;
  var randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

var getUniqueArrayItem = function (array) {
  var removedEl = array.splice(getRandomNumber(0, array.length - 1), 1);
  return removedEl[0];
};
/**
   * Создает список преимуществ.
   *
   * @param {array} features Массив преимуществ.
   * @return {object} list Список преимуществ.
   */
var getFeaturesList = function (features) {
  var list = document.createDocumentFragment();
  for (var i = 0; i < features.length; i++) {
    var listItemElement = document.createElement('li');
    listItemElement.classList.add('popup__feature');
    listItemElement.classList.add('popup__feature--' + features[i]);
    list.appendChild(listItemElement);
  }
  return list;
};

/**
   * Создает фото жилья.
   *
   * @param {array} photos Массив фото жилья.
   * @return {object} photosContainer Фото.
   */
var getPhotos = function (photos) {
  var photosContainer = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    var photo = document.createElement('img');
    photo.classList.add('popup__photo');
    photo.src = photos[i];
    photo.alt = 'Фотография жилья';
    photo.width = 45;
    photo.height = 40;
    photosContainer.appendChild(photo);
  }
  return photosContainer;
};

/**
   * Определяет тип жилья
   *
   * @param {array} advert Массив объявлений.
   * @return {string} offerType Тип жилья.
   */
var defineOfferType = function (advert) {
  var offerType = '';
  if (advert.offer.type === 'flat') {
    offerType = 'Квартира';
  } else if (advert.offer.type === 'bungalo') {
    offerType = 'Бунгало';
  } else if (advert.offer.type === 'house') {
    offerType = 'Дом';
  } else if (advert.offer.type === 'palace') {
    offerType = 'Дворец';
  }
  return offerType;
};

// функция создания одного объекта - объявления(массив)
var generateOneAdvert = function (options) {
  var locationX = getRandomNumber(options.locationXMin, options.locationXMax);
  var locationY = getRandomNumber(options.locationYMin, options.locationYMax);

  var advert = {
    author: {
      avatar: getUniqueArrayItem(options.avatars)
    },
    offer: {
      title: getUniqueArrayItem(options.offerTitles),
      address: locationX + ', ' + locationY,
      price: getRandomNumber(options.priceMin, options.priceMax),
      type: options.offerTypes[getRandomNumber(0, options.offerTypes.length - 1)],
      rooms: getRandomNumber(options.roomsMin, options.roomsMax),
      guests: getRandomNumber(options.guestsMin, options.guestsMax),
      checkin: options.offerChekins[getRandomNumber(0, options.offerChekins.length - 1)],
      checkout: options.offercheckouts[getRandomNumber(0, options.offercheckouts.length - 1)],
      features: trimToRandomArrayLength(options.offerFeatures),
      description: ' ',
      photos: shuffleArray(options.offerPhotos).slice() // Копируем перемешанный массив
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
  return advert;
};


/** Создает массив с объявлениями

  * @param {number} number Длина массива.
  * @param {array} options Массив данных.
  * @return {array} advers Итоговый массив.
  */
var generateAllAdverts = function (number, options) {
  var adverts = [];
  for (var i = 0; i < number; i++) {
    var advert = generateOneAdvert(options);
    adverts.push(advert);
  }
  return adverts;
};

/**
   * Создает метку на карте

   * @param {array} advert Рандомное объявление.
   * @return {object} mapPinElement Метка.
   */
var renderMapPin = function (advert) {
  var mapPinElement = mapPinTemplate.cloneNode(true);
  mapPinElement.style.left = advert.location.x - PIN_SIZE_X / 2 + 'px';
  mapPinElement.style.top = advert.location.y - PIN_SIZE_Y / 2 + 'px';
  mapPinElement.querySelector('img').src = advert.author.avatar;
  mapPinElement.querySelector('img').alt = ADVERT_TITLE;
  return mapPinElement;
};


/**
   * Создает метки.
   * @param {array} adverts Массив объявлений.
   * @return {object} fragment Метки.
   */
var renderMapPinsFragment = function (adverts) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adverts.length; i++) {
    fragment.appendChild(renderMapPin(adverts[i]));
  }
  return fragment;
};


/**
   * Отрисовывает метки.
   * @param {array} adverts Массив объявлений.
   */
var drawMapsPin = function (adverts) {
  var pinsFragment = renderMapPinsFragment(adverts);
  pinsArea.appendChild(pinsFragment);
};


// функция создания объявления
var renderCards = function (advert) {
  var cardElement = mapCardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = advert.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = advert.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = advert.offer.price + ' ₽/ночь';
  cardElement.querySelector('.popup__type').textContent = defineOfferType(advert);
  cardElement.querySelector('.popup__text--capacity').textContent = advert.offer.rooms + ' комнаты для '
  + advert.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + advert.offer.checkin
  + ', выезд до ' + advert.offer.checkout;
  cardElement.querySelector('.popup__features').innerHTML = '';
  cardElement.querySelector('.popup__features').appendChild(getFeaturesList(advert.offer.features));
  cardElement.querySelector('.popup__description').textContent = advert.offer.description;
  cardElement.querySelector('.popup__photos').innerHTML = '';
  cardElement.querySelector('.popup__photos').appendChild(getPhotos(advert.offer.photos));
  cardElement.querySelector('.popup__avatar').src = advert.author.avatar;

  return cardElement;
};


var generateOptions = {
  avatars: AUTHOR_AVATARS.slice(),
  offerTitles: OFFER_TITLES.slice(),
  offerTypes: OFFER_TYPES,
  offerChekins: OFFER_CHECKIN,
  offercheckouts: OFFER_CHECKOUT,
  offerFeatures: OFFER_FEATURES,
  offerPhotos: OFFER_PHOTOS,

  priceMin: MIN_PRICE,
  priceMax: MAX_PRICE,
  roomsMin: MIN_ROOMS,
  roomsMax: MAX_ROOMS,
  guestsMin: MIN_GUESTS,
  guestsMax: MAX_GUESTS,
  locationXMin: MIN_X,
  locationXMax: MAX_X,
  locationYMin: MIN_Y,
  locationYMax: MAX_Y
};

// var randomAdvert = generateOneAdvert(generateOptions);
var advertisement = generateAllAdverts(ADVERTS_NUMBER, generateOptions);
drawMapsPin(advertisement);
map.insertBefore(renderCards(advertisement[0]), mapContainer);
map.classList.remove('map--faded');
