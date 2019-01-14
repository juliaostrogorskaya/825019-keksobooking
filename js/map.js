'use strict';
(function () {
  var MAP_PIN_MAIN_WIDTH = 62;
  var MAP_PIN_MAIN_HEIGHT = 62;
  var MAP_PIN_MAIN_TAIL = 22;
  var filters = document.querySelector('.map__filters-container');
  var map = document.querySelector('.map');
  var address = document.getElementById('address');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapOverlay = document.querySelector('.map__overlay');

  address.readOnly = true;

  // активация карты
  var makeMapActive = function () {
    map.classList.remove('map--faded');
    window.form.enableFormElements();
    var onSuccess = function (data) {
      window.data.advertisement = data;
      window.pin.drawMapsPin(data);
    };
    window.backend.load(onSuccess, window.form.onError);
  };

  // деактивация карты
  var makeMapInactive = function () {
    resetPinMain();
    clearMap();
    map.classList.add('map--faded');
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

      if ((mapPinMain.offsetTop - shift.y) > filters.offsetTop - (MAP_PIN_MAIN_HEIGHT + MAP_PIN_MAIN_TAIL)) {
        mapPinMain.style.top = filters.offsetTop - (MAP_PIN_MAIN_HEIGHT + MAP_PIN_MAIN_TAIL) + 'px';
      }

      if ((mapPinMain.offsetTop - shift.y) < mapOverlay.offsetTop + MAP_PIN_MAIN_HEIGHT) {
        mapPinMain.style.top = mapOverlay.offsetTop + MAP_PIN_MAIN_HEIGHT + 'px';
      }

      if ((mapPinMain.offsetLeft - shift.x) > (mapOverlay.offsetWidth - MAP_PIN_MAIN_WIDTH)) {
        mapPinMain.style.left = (mapOverlay.offsetWidth - MAP_PIN_MAIN_WIDTH) + 'px';
      }

      if ((mapPinMain.offsetLeft - shift.x) < mapOverlay.offsetLeft) {
        mapPinMain.style.left = mapOverlay.offsetLeft + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      makeMapActive();
      // window.form.setDefaultCapacity();
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

  // очищает карту
  var clearMap = function () {
    var pinList = document.querySelectorAll('.map__pin');
    for (var i = 1; i < pinList.length; i++) {
      pinList[i].remove();
    }
    window.card.clearAdverts();
  };

  // определение адреса
  var setAddress = function () {
    var mapPinMainPositionX = Math.round(parseInt(mapPinMain.style.left, 10) + MAP_PIN_MAIN_WIDTH / 2);
    if (map.classList.contains('map--faded')) {
      var mapPinMainPositionY = Math.round(parseInt(mapPinMain.style.top, 10) + ((MAP_PIN_MAIN_HEIGHT + MAP_PIN_MAIN_TAIL) / 2));
    } else {
      mapPinMainPositionY = Math.round(parseInt(mapPinMain.style.top, 10) + (MAP_PIN_MAIN_HEIGHT + MAP_PIN_MAIN_TAIL));
    }
    address.value = mapPinMainPositionX + ',' + mapPinMainPositionY;
  };
  setAddress();

  window.map = {
    map: map,
    makeMapInactive: makeMapInactive,
    setAddress: setAddress,
    clearMap: clearMap
  };
})();
