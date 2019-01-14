'use strict';
(function () {
  var filters = document.querySelector('.map__filters');
  var housingType = filters.querySelector('#housing-type');
  var housingPrice = filters.querySelector('#housing-price');
  var housingRooms = filters.querySelector('#housing-rooms');
  var housingGuests = filters.querySelector('#housing-guests');
  var features = filters.querySelectorAll('#housing-features');

  var filterPins = function () {
    var adverts = window.data.advertisement;
    var filteredPins = adverts.filter(function (data) {
      if (housingType.value === 'any') {
        return true;
      } else {
        return data.offer.type === housingType.value;
      }
    }).filter(function (data) {
      var price;
      if (housingPrice.value === 'any') {
        price = data.offer.price >= 0;
      } else if (housingPrice.value === 'middle') {
        price = data.offer.price >= 10000 && data.offer.price <= 50000;
      } else if (housingPrice.value === 'low') {
        price = data.offer.price <= 10000;
      } else if (housingPrice.value === 'high') {
        price = data.offer.price >= 50000;
      }
      return price;
    }).filter(function (data) {
      if (housingRooms.value === 'any') {
        return true;
      } else {
        return data.offer.rooms === Number(housingRooms.value);
      }
    }).filter(function (data) {
      if (housingGuests.value === 'any') {
        return true;
      } else {
        return data.offer.guests === Number(housingGuests.value);
      }
    }).filter(function (data) {
      var choosenFeatures = features.querySelectorAll('input[type=checkbox]:checked');
      return Array.from(choosenFeatures).every(function (el) {
        return data.offer.features.includes(el.value);
      });
    });

    return filteredPins;
  };


  filters.addEventListener('change', function () {
    window.pin.drawMapsPin(filterPins);
    window.map.clearMap();
  });
  filters.addEventListener('change', window.util.debounce(filterPins));


})();
