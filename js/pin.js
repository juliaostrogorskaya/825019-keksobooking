'use strict';
(function () {
  var PIN_SIZE_X = 50;
  var PIN_SIZE_Y = 70;
  var ADVERT_TITLE = 'заголовок объявления';
  var pinsArea = window.map.map.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapContainer = window.map.map.querySelector('.map__filters-container');
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
      window.map.map.insertBefore(window.card.renderCards(advert), mapContainer);
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


  window.pin = {
    drawMapsPin: drawMapsPin
  };
})();
