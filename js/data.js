'use strict';
(function () {
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

  window.data = {
    generateOptions: generateOptions,
    ADVERTS_NUMBER: ADVERTS_NUMBER,
    MIN_X: MIN_X,
    MIN_Y: MIN_Y,
    MAX_X: MAX_X,
    MAX_Y: MAX_Y,
  };
})();
