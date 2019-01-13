'use strict';
(function () {
  var filters = document.querySelector('.map__filters');
  var type = filters.querySelector('#housing-type');
  var price = filters.querySelector('#housing-price');
  var rooms = filters.querySelector('#housing-rooms');
  var guests = filters.querySelector('#housing-guests');
  var features = filters.querySelectorAll('.map__checkbox');


  // выбор типа жилья
  var adverts = window.data.advertisement;
  var filteredPins = adverts.filter(function (data) {
    if (type.value === 'any') {
      return true;
    } else {
      return data.offer.type === type.value;
    }
  });

  // выбор цены
  filteredPins = filteredPins.filter(function (data) {
    var housingPrice;
    if (price.value === 'any') {
      housingPrice = data.offer.price >= 0;
    } else if (price.value === 'middle') {
      housingPrice = data.offer.price >= 10000 && data.offer.price <= 50000;
    } else if (price.value === 'low') {
      housingPrice = data.offer.price <= 10000;
    } else if (price.value === 'high') {
      housingPrice = data.offer.price >= 50000;
    }
    return price;
  });

  // выбор кол-ва комнат
  filteredPins = filteredPins.filter(function (data) {
    if (rooms.value === 'any') {
      return true;
    } else {
      return data.offer.rooms === Number(rooms.value);
    }
  });

  // выбор кол-ва гостей
  filteredPins = filteredPins.filter(function (data) {
    if (guests.value === 'any') {
      return true;
    } else {
      return data.offer.guests === Number(guests.value);
    }
  });

  filters.addEventListener('change', function () {
    window.map.clearMap();
    window.pin.drawMapsPin(filteredPins);
  });
  // filters.addEventListener('change', window.util.debounce(filteredPins));

  window.filters = {
    filterPins: filteredPins
  };

})();
