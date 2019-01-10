'use strict';
(function () {
  var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var OFFER_TYPES = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало',
    'palace': 'Дворец'
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
    cardElement.querySelector('.popup__type').textContent = OFFER_TYPES[advert.offer.type];
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
    renderCards: renderCards,
  };
})();
