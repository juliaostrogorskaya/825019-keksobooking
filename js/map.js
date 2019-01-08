
// map.js
'use strict';
(function () {
  var MAP_PIN_MAIN_WIDTH = 62;
  var MAP_PIN_MAIN_HEIGHT = 84;
  var fieldsets = window.form.form.getElementsByTagName('fieldset');
  var address = document.getElementById('address');
  var mapPinMain = window.data.map.querySelector('.map__pin--main');

  var disableElements = function () {
    window.form.form.classList.add('ad-form--disabled');
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].setAttribute('disabled', 'disabled');
    }
  };
  disableElements();

  var enableElements = function () {
    window.data.map.classList.remove('map--faded');
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
    if (window.data.map.classList.contains('map--faded')) {
      var mapPinMainPositionY = Math.round(parseInt(mapPinMain.style.top, 10) + MAP_PIN_MAIN_HEIGHT / 2);
    } else {
      mapPinMainPositionY = Math.round(parseInt(mapPinMain.style.top, 10) + MAP_PIN_MAIN_HEIGHT);
    }
    address.value = mapPinMainPositionX + ',' + mapPinMainPositionY;
  };
  setAddress();
})();
