'use strict';
(function () {
  var MAP_PIN_MAIN_WIDTH = 62;
  var MAP_PIN_MAIN_HEIGHT = 62;
  var MAP_PIN_MAIN_TAIL = 22;
  var MAP_PIN_MAIN_POSITION_X = 570;
  var MAP_PIN_MAIN_POSITION_Y = 375;
  var MIN_Y = 130;
  var MAX_Y = 630;
  var map = document.querySelector('.map');
  var address = document.getElementById('address');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapOverlay = document.querySelector('.map__overlay');

  address.readOnly = true;

  // активация карты
  var makeMapActive = function () {
    if (map.classList.contains('map--faded')) {
      map.classList.remove('map--faded');
      window.filters.activate();
      window.form.enableFormElements();
      var onSuccess = function (data) {
        window.data.advertisement = data;
        window.pin.drawMapsPin(window.data.advertisement);
      };
      window.backend.load(onSuccess, onError);
    }
  };

  // ошибка
  var onError = function (errorMessage) {
    window.messages.renderStatusMessage(window.form.errorTemplate, window.form.errorSelector);
    var node = document.querySelector('.error__message');
    node.textContent = errorMessage;
  };

  // деактивация карты
  var makeMapInactive = function () {
    resetPinMain();
    clearMap();
    window.filters.deactivate();
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

      if ((mapPinMain.offsetTop - shift.y) < (MIN_Y - (MAP_PIN_MAIN_HEIGHT + MAP_PIN_MAIN_TAIL))) {
        mapPinMain.style.top = MIN_Y - (MAP_PIN_MAIN_HEIGHT + MAP_PIN_MAIN_TAIL) + 'px';
      }
      if ((mapPinMain.offsetTop - shift.y) > (MAX_Y - (MAP_PIN_MAIN_HEIGHT + MAP_PIN_MAIN_TAIL))) {
        mapPinMain.style.top = MAX_Y - (MAP_PIN_MAIN_HEIGHT + MAP_PIN_MAIN_TAIL) + 'px';
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
      setAddress();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // возвращает главную метку в исходное положение
  var resetPinMain = function () {
    mapPinMain.style.left = MAP_PIN_MAIN_POSITION_X + 'px';
    mapPinMain.style.top = MAP_PIN_MAIN_POSITION_Y + 'px';
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
    clearMap: clearMap
  };
})();
