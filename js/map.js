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
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var map = document.querySelector('.map');
var pinsArea = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var mapContainer = map.querySelector('.map__filters-container');


// рандомный элемент массива
var getRandomArrayItem = function (array) {
  var randomArrayItem = array[Math.floor(Math.random() * array.length)];
  return randomArrayItem;
};

// рандомное число из заданных
var getRandomNumber = function (min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min)) + min;
  return randomNumber;
};

// функция создания массива рандомной длины - features
var trimToRandomArrayLength = function (array) {
  var randomNum = getRandomNumber(1, array.length + 1);
  return array.slice(0, randomNum); // возвращает новый массив
};

// функция создания списка - features
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

// функция создания фото жилья
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

// функция определния типа жилья
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

// функция создания случайного элемента массива и его укорачивания
var getPhotosArray = function (array) {
  var newArray = array;
  for (var i = newArray.length; i > 0; i--) {
    var x = getRandomArrayItem(newArray);
    // newArray.pop(); // удаляет последний элемент массива
    newArray.length = newArray.length - 1;
  }
  return x; // я вижу, что эта функция будет удалять с каждым циклом, но мне надо
  // чтобы она получала значение и сохраняла его, потом уменьшала массив и снова получала значение.. что не так здесь?
};

// функция создания массива аватара автора объявления
var setAvatar = function (number) {
  var avatars = [];
  for (var i = 1; i <= number; i++) {
    var avatar = 'img/avatars/user' + '0' + i + '.png';
    avatars.push(avatar);
  }
  return avatars;
};


// функция создания одного объекта - объявления(массив)
var generateOneAdvert = function () {
  var advert = {
    author: {
      avatar: getPhotosArray(setAvatar(8))
    },
    offer: {
      title: getRandomArrayItem(OFFER_TITLES),
      address: getRandomNumber(0, 1200) + ', ' + getRandomNumber(130, 630),
      price: getRandomNumber(1000, 1000000),
      type: getRandomArrayItem(OFFER_TYPES),
      rooms: getRandomNumber(1, 5),
      guests: getRandomNumber(1, 6),
      checkin: getRandomArrayItem(OFFER_CHECKIN),
      checkout: getRandomArrayItem(OFFER_CHECKOUT),
      features: trimToRandomArrayLength(OFFER_FEATURES),
      description: ' ',
      photos: OFFER_PHOTOS
    },
    location: {
      locationX: getRandomNumber(0, 1200),
      locationY: getRandomNumber(130, 630)
    }
  };
  return advert;
};


// функция создания массива объектов - объявлений
var generateAllAdverts = function (number) {
  var adverts = [];
  for (var i = 0; i < number; i++) {
    var advert = generateOneAdvert();
    adverts.push(advert);
  }
  return adverts;
};

// функция создания одной метки на карте
var renderMapPin = function (advert) {
  var mapPinElement = mapPinTemplate.cloneNode(true);
  mapPinElement.style.left = advert.location.locationX + 'px';
  mapPinElement.style.top = advert.location.locationY + 'px';
  mapPinElement.querySelector('img').src = advert.author.avatar;
  mapPinElement.querySelector('img').alt = ADVERT_TITLE;
  return mapPinElement;
};

var mapPinsFragment = generateAllAdverts(ADVERT_NUMBER);

// функция создания меток
var renderMapPinsFragment = function () {
  var fragment = document.createDocumentFragment();
  var adverts = mapPinsFragment;
  for (var i = 0; i < adverts.length; i++) {
    fragment.appendChild(renderMapPin(adverts[i]));
  }
  return fragment;
};

// функция отрисовки меток
var drawMapsPin = function () {
  pinsArea.appendChild(renderMapPinsFragment());
};

drawMapsPin();
map.classList.remove('map--faded');

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

map.insertBefore(renderCards(generateAllAdverts(8)[0]), mapContainer);
