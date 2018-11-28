'use strict';

var ADVERT_NUMBER = 8;
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

var OFFER_CHECKOUT = [ // если у них одинаковые данные, можно объединить в один с каким-нибудь общим названием типа time?
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
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var map = document.querySelector('.map');
var pinsArea = document.querySelector('.map__pins');
var similarMapPin = document.querySelector('#pin').content.querySelector('.map__pin');

// рандомный элемент массива
var getRandomValue = function (array) {
  var RandomValue = Math.floor(Math.random() * array.length);
  return RandomValue;
};

// рандомное число из заданных
var getRandomNumber = function (min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min)) + min;
  return randomNumber;
};

// функция создания одного объекта - объявления(массив)
// 1.сейчас данные повторяются, хотя не должны. Т.е. рандом не подходит или еть какой-то другой метод?
// 2.массив строк случайной длины - предполагает, что не одно значение, а несколько, если я правильно поняла. Пока вообще не могу представить как это реализовать.
var generateOneAdvert = function () {
  var advert = {
    author: {
      avatar: 'img/avatars/user' + '0' + getRandomNumber(1, 8) + '.png'
    },
    offer: {
      title: OFFER_TITLES[getRandomValue(OFFER_TITLES)],
      address: getRandomNumber(0, 1200) + ', ' + getRandomNumber(130, 630),
      price: getRandomNumber(1000, 1000000),
      type: OFFER_TYPES[getRandomValue(OFFER_TYPES)],
      rooms: getRandomNumber(1, 5),
      guests: getRandomNumber(1, 6), // сколько гостей, если не указано в задании?
      checkin: OFFER_CHECKIN[getRandomValue(OFFER_CHECKIN)],
      checkout: OFFER_CHECKOUT[getRandomValue(OFFER_CHECKOUT)],
      features: OFFER_FEATURES[getRandomValue(OFFER_FEATURES)],
      description: ' ',
      photos: OFFER_PHOTOS[getRandomValue(OFFER_PHOTOS)]
    },
    location: {
      locationX: getRandomNumber(0, 1200),
      locationY: getRandomNumber(130, 630)
    }
  };
  return advert;
};


// функция создания массива объектов - объявлений
var generateAllAdverts = function () {
  var adverts = [];
  for (var i = 0; i < ADVERT_NUMBER; i++) {
    var advert = generateOneAdvert();
    adverts.push(advert);
  }
  return adverts;
};

// функция создания одной метки на карте
var renderMapPin = function (advert) {
  var mapPinElement = similarMapPin.cloneNode(true);
  mapPinElement.style.left = advert.location.locationX + 'px';
  mapPinElement.style.top = advert.location.locationY + 'px';
  mapPinElement.querySelector('img').src = advert.author.avatar;
  mapPinElement.querySelector('img').alt = ADVERT_TITLE;
  return mapPinElement;
};

// функция создания и отрисовки меток
var createMapPinsFragment = function () {
  var fragment = document.createDocumentFragment();
  var adverts = generateAllAdverts();
  for (var j = 0; j < adverts.length; j++) {
    fragment.appendChild(renderMapPin(adverts[j]));
    pinsArea.appendChild(fragment);
  }
};
createMapPinsFragment();

map.classList.remove('map--faded');
