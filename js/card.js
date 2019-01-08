// card.js
'use strict';
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
    var advertElement = document.querySelector('.map__card');
    if (evt.keyCode === window.util.ESC_KEYCODE && advertElement) {
      advertElement.remove();
    }
  });

  window.card = {
    clearAdverts: clearAdverts,
    renderCards: renderCards
  };
})();
