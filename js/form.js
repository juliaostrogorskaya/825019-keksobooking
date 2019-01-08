// form.js
'use strict';
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
