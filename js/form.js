'use strict';
(function () {
  var minPrices = {
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };
  var successSelector = '.success';
  var errorSelector = '.error';
  var notice = document.querySelector('.notice');
  var form = notice.querySelector('.ad-form');
  var fieldsets = form.getElementsByTagName('fieldset');
  var resetButton = form.querySelector('.ad-form__reset');
  var submitButton = form.querySelector('.ad-form__submit');
  var typeOfFlat = document.getElementById('type');
  var price = document.getElementById('price');
  var roomNumber = document.getElementById('room_number');
  var guestNumber = document.getElementById('capacity');
  var title = document.getElementById('title');
  var timeinSelect = form.querySelector('[name="timein"]');
  var timeoutSelect = form.querySelector('[name="timeout"]');
  var successTemplate = document.querySelector('#success').content;
  var errorTemplate = document.querySelector('#error').content;


  // выбор цены и типа жилья
  var setMinPrice = function (propertyType, priceInput) {
    priceInput.setAttribute('min', minPrices[propertyType] || 0);
    priceInput.setAttribute('placeholder', minPrices[propertyType] || 0);
  };

  typeOfFlat.addEventListener('change', function () {
    setMinPrice(typeOfFlat.value, price);
  });


  roomNumber.addEventListener('change', function () {
    checkRoomsCapacity();
  });
  guestNumber.addEventListener('change', function () {
    checkRoomsCapacity();
  });

  // выбор количества гостей и комнат, по умолчанию один гость - одна комната
  var checkRoomsCapacity = function () {
    for (var i = 0; i < guestNumber.options.length; i++) {
      guestNumber.options[i].setAttribute('disabled', 'disabled');
    }
    if (Number(roomNumber.value) === 1) {
      guestNumber.options[2].disabled = false;
      if (Number(guestNumber.value) === 1) {
        guestNumber.setCustomValidity('');
      } else {
        guestNumber.setCustomValidity('Выберите возможный вариант: «для 1 гостя»');
      }
    } else if (Number(roomNumber.value) === 2) {
      guestNumber.options[1].disabled = false;
      guestNumber.options[2].disabled = false;
      if (Number(guestNumber.value) === 1 || Number(guestNumber.value) === 2) {
        guestNumber.setCustomValidity('');
      } else {
        guestNumber.setCustomValidity('Выберите возможные варианты: «для 2 гостей» или «для 1 гостя»');
      }
    } else if (Number(roomNumber.value) === 3) {
      guestNumber.options[0].disabled = false;
      guestNumber.options[1].disabled = false;
      guestNumber.options[2].disabled = false;
      if (Number(guestNumber.value) === 1 || Number(guestNumber.value) === 2 || Number(guestNumber.value) === 3) {
        guestNumber.setCustomValidity('');
      } else {
        guestNumber.setCustomValidity('Выберите возможные варианты: «для 3 гостей», «для 2 гостей» или «для 1 гостя»');
      }
    } else if (Number(roomNumber.value) === 100) {
      guestNumber.options[3].disabled = false;
      if (Number(guestNumber.value) === 0) {
        guestNumber.setCustomValidity('');
      } else {
        guestNumber.setCustomValidity('Выберите возможный вариант: «не для гостей»');
      }
    }
  };

  // синхронизация времени заезда выезда
  function syncFields(select1, select2) {
    var value1 = select1.value;
    var options = select2.options;
    for (var i = 0; i < options.length; i++) {
      if (options[i].value === value1) {
        select2.selectedIndex = i;
      }
    }
  }

  timeinSelect.addEventListener('change', function () {
    syncFields(timeinSelect, timeoutSelect);
  });

  timeoutSelect.addEventListener('change', function () {
    syncFields(timeoutSelect, timeinSelect);
  });

  // проверка правильности введенных данных
  var checkValidity = function (element) {
    if (!element.validity.valid) {
      element.style.borderColor = 'red';
      element.style.borderWidth = '5px';
    }
    element.addEventListener('change', function () {
      removeValididty(element);
    });
  };

  var removeValididty = function (element) {
    element.style.borderColor = '';
    element.style.borderWidth = '';
  };

  submitButton.addEventListener('click', function () {
    checkValidity(title);
    checkValidity(price);
  });

  // успешная отправка данных
  var onLoad = function () {
    window.messages.renderStatusMessage(successTemplate, successSelector);
    deactivateForm();
  };

  // неуспешная отправка данных
  var onError = function () {
    window.messages.renderStatusMessage(errorTemplate, errorSelector);
  };

  form.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(form), onLoad, onError);
    evt.preventDefault();
  });

  // деактивация элементов формы
  var disableFormElements = function () {
    form.classList.add('ad-form--disabled');
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].setAttribute('disabled', 'disabled');
    }
  };
  disableFormElements();

  // активация формы
  var enableFormElements = function () {
    form.classList.remove('ad-form--disabled');
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].removeAttribute('disabled');
    }
    checkRoomsCapacity();
    setMinPrice(typeOfFlat.value, price);
  };

  // деактивация формы
  var deactivateForm = function () {
    disableFormElements();
    window.map.makeMapInactive();
    removeValididty(title);
    removeValididty(price);
    form.reset();
  };

  // очистить форму
  var resetButtonClickHandler = function (evt) {
    evt.preventDefault();
    deactivateForm();
  };

  resetButton.addEventListener('click', resetButtonClickHandler);

  window.form = {
    enableFormElements: enableFormElements,
    form: form,
    errorTemplate: errorTemplate,
    errorSelector: errorSelector
  };
})();
