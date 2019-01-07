'use strict';
// модуль util.js
(function () {
  var ESC_KEYCODE = 27;
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

  var getUniqueArrayItem = function (array) {
    var removedEl = array.splice(getRandomNumber(0, array.length - 1), 1);
    return removedEl[0];
  };

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

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    getRandomNumber: getRandomNumber,
    trimToRandomArrayLength: trimToRandomArrayLength,
    getUniqueArrayItem: getUniqueArrayItem,
    shuffleArray: shuffleArray
  };
})();

// модуль data.js
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
    MAX_Y: MAX_Y
  };
})();

// card.js
(function () {
  var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  /**
     * Определяет тип жилья
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

  // функция создания одного объекта - объявления(массив)
  var generateOneAdvert = function (options) {
    var locationX = window.util.getRandomNumber(options.locationXMin, options.locationXMax);
    var locationY = window.util.getRandomNumber(options.locationYMin, options.locationYMax);

    var advert = {
      author: {
        avatar: window.util.getUniqueArrayItem(options.avatars)
      },
      offer: {
        title: window.util.getUniqueArrayItem(options.offerTitles),
        address: locationX + ', ' + locationY,
        price: window.util.getRandomNumber(options.priceMin, options.priceMax),
        type: options.offerTypes[window.util.getRandomNumber(0, options.offerTypes.length - 1)],
        rooms: window.util.getRandomNumber(options.roomsMin, options.roomsMax),
        guests: window.util.getRandomNumber(options.guestsMin, options.guestsMax),
        checkin: options.offerChekins[window.util.getRandomNumber(0, options.offerChekins.length - 1)],
        checkout: options.offercheckouts[window.util.getRandomNumber(0, options.offercheckouts.length - 1)],
        features: window.util.trimToRandomArrayLength(options.offerFeatures),
        description: ' ',
        photos: window.util.shuffleArray(options.offerPhotos).slice() // Копируем перемешанный массив
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

  var advertisement = generateAllAdverts(window.data.ADVERTS_NUMBER, window.data.generateOptions);
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

    var advertClose = cardElement.querySelector('.popup__close');
    advertClose.addEventListener('click', function () {
      cardElement.remove();
    });

    return cardElement;
  };

  // удаляет открытые объявления
  var clearAdverts = function () {
    var advertElements = document.querySelector('.map__card');
    if (advertElements) {
      advertElements.remove();
    }
  };

  // закрытие объявления по esc
  document.addEventListener('keydown', function (evt) {
    var advertElement = map.querySelector('.map__card');
    if (evt.keyCode === window.util.ESC_KEYCODE && advertElement) {
      advertElement.remove();
    }
  });

  window.card = {
    clearAdverts: clearAdverts,
    renderCards: renderCards
  };
})();


var map = document.querySelector('.map'); // куда??


//  модуль pin.js
(function () {
  var PIN_SIZE_X = 50;
  var PIN_SIZE_Y = 70;
  var ADVERT_TITLE = 'заголовок объявления';
  var pinsArea = map.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapContainer = map.querySelector('.map__filters-container');
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
    mapPinElement.addEventListener('click', function () {
      window.card.clearAdverts();
      map.insertBefore(window.card.renderCards(advert), mapContainer);
    });

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
})();


// map.js
(function () {
  var MAP_PIN_MAIN_WIDTH = 62;
  var MAP_PIN_MAIN_HEIGHT = 84;
  var fieldsets = window.form.form.getElementsByTagName('fieldset');
  var address = document.getElementById('address');
  var mapPinMain = map.querySelector('.map__pin--main');

  var disableElements = function () {
    window.form.form.classList.add('ad-form--disabled');
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].setAttribute('disabled', 'disabled');
    }
  };
  disableElements();

  var enableElements = function () {
    map.classList.remove('map--faded');
    window.form.form.classList.remove('ad-form--disabled');
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].removeAttribute('disabled');
    }
  };


  // перемещение метки по клику
  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';

      if ((mapPinMain.offsetTop - shift.y) > window.data.MAX_Y) {
        mapPinMain.style.top = window.data.MAX_Y + 'px';
      }

      if ((mapPinMain.offsetTop - shift.y) < window.data.MIN_Y) {
        mapPinMain.style.top = window.data.MIN_Y + 'px';
      }

      if ((mapPinMain.offsetLeft - shift.x) > (window.data.MAX_X - MAP_PIN_MAIN_WIDTH)) {
        mapPinMain.style.left = (window.data.MAX_X - MAP_PIN_MAIN_WIDTH) + 'px';
      }

      if ((mapPinMain.offsetLeft - shift.x) < window.data.MIN_X) {
        mapPinMain.style.left = window.data.MIN_X + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      enableElements();
      drawMapsPin(advertisement);
      window.form.chooseCapacity();
      setAddress();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // возвращает главную метку в исходное положение
  var resetPinMain = function () {
    mapPinMain.style.left = 570 + 'px';
    mapPinMain.style.top = 375 + 'px';
  };

  // определение адреса
  var setAddress = function () {
    var mapPinMainPositionX = Math.round(parseInt(mapPinMain.style.left, 10) + MAP_PIN_MAIN_WIDTH / 2);
    if (map.classList.contains('map--faded')) {
      var mapPinMainPositionY = Math.round(parseInt(mapPinMain.style.top, 10) + MAP_PIN_MAIN_HEIGHT / 2);
    } else {
      mapPinMainPositionY = Math.round(parseInt(mapPinMain.style.top, 10) + MAP_PIN_MAIN_HEIGHT);
    }
    address.value = mapPinMainPositionX + ',' + mapPinMainPositionY;
  };
  setAddress();
})();

// form.js
(function () {
  var notice = document.querySelector('.notice');
  var form = notice.querySelector('.ad-form');
  var resetButton = form.querySelector('.ad-form__reset');
  var submitButton = form.querySelector('.ad-form__submit');
  var typeOfFlat = document.getElementById('type');
  var price = document.getElementById('price');
  var roomNumber = document.getElementById('room_number');
  var guestNumber = document.getElementById('capacity');
  var title = document.getElementById('title');

  // выбор цены и типа жилья
  price.addEventListener('change', function () {
    if (Number(price.value) >= 0 && Number(price.value) < 1000) {
      typeOfFlat.value = 'bungalo';
    } else if (Number(price.value) >= 1000 && Number(price.value) < 5000) {
      typeOfFlat.value = 'flat';
    } else if (Number(price.value) >= 5000 && Number(price.value) < 10000) {
      typeOfFlat.value = 'house';
    } else if (Number(price.value) >= 10000) {
      typeOfFlat.value = 'palace';
    }
  });

  // выбор количества гостей и комнат, по умолчанию один гость - одна комната
  var chooseCapacity = function () {
    guestNumber.value = '1';
    guestNumber.options[0].setAttribute('disabled', 'disabled');
    guestNumber.options[1].setAttribute('disabled', 'disabled');
    guestNumber.options[3].setAttribute('disabled', 'disabled');
  };

  roomNumber.addEventListener('change', function () {
    for (var i = 0; i < guestNumber.options.length; i++) {
      guestNumber.options[i].setAttribute('disabled', 'disabled');
    }
    if (Number(roomNumber.value) === 1) {
      guestNumber.options[2].disabled = false;
      guestNumber.value = '1';
    } else if (Number(roomNumber.value) === 2) {
      guestNumber.options[1].disabled = false;
      guestNumber.options[2].disabled = false;
      guestNumber.value = '2';
    } else if (Number(roomNumber.value) === 3) {
      guestNumber.options[0].disabled = false;
      guestNumber.options[1].disabled = false;
      guestNumber.options[2].disabled = false;
      guestNumber.value = '3';
    } else if (Number(roomNumber.value) === 100) {
      guestNumber.options[3].disabled = false;
      guestNumber.value = '0';
    }
  });

  // проверка правильности введенных данных
  var checkValidity = function (element) {
    if (!element.validity.valid) {
      element.style.borderColor = 'red';
      element.style.borderWidth = '5px';
    }
  };

  var removeValididty = function (element) {
    element.style.borderColor = '';
    element.style.borderWidth = '';
  };

  submitButton.addEventListener('click', function () {
    checkValidity(title);
    checkValidity(price);
  });

  // очистить форму
  var resetButtonClickHandler = function (evt) {
    evt.preventDefault();
    disableElements();
    removeValididty(title);
    removeValididty(price);
    resetPinMain();

    var pinList = document.querySelectorAll('.map__pin');
    for (var i = 1; i < pinList.length; i++) {
      pinList[i].remove();
    }
    window.card.clearAdverts();

    map.classList.add('map--faded');
    form.reset();
    setAddress();
  };

  resetButton.addEventListener('click', resetButtonClickHandler);

  window.form = {
    chooseCapacity: chooseCapacity,
    form: form
  };
})();
