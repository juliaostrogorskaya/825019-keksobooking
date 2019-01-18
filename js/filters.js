'use strict';
(function () {
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var mapfilters = mapFiltersContainer.querySelector('.map__filters');

  var Filters = {
    'housing': {
      'type': mapfilters.querySelector('#housing-type').value,
      'price': mapfilters.querySelector('#housing-price').value,
      'rooms': mapfilters.querySelector('#housing-rooms').value,
      'guests': mapfilters.querySelector('#housing-guests').value
    },
    'features': {
      'wifi': mapfilters.querySelector('#filter-wifi').checked,
      'dishwasher': mapfilters.querySelector('#filter-dishwasher').checked,
      'parking': mapfilters.querySelector('#filter-parking').checked,
      'washer': mapfilters.querySelector('#filter-washer').checked,
      'elevator': mapfilters.querySelector('#filter-elevator').checked,
      'conditioner': mapfilters.querySelector('#filter-conditioner').checked
    }
  };

  // Изменение фильтров
  mapfilters.addEventListener('change', function (evt) {

    if (evt.target.name === 'features') {
      Filters.features[evt.target.value] = evt.target.checked;
    } else {
      var key = evt.target.name.split('-')[1];
      Filters.housing[key] = evt.target.value;
    }

    window.util.debounce(updateAdvertsPin);

  });

  var updateAdvertsPin = function () {

    window.map.clearMap();
    window.pin.drawMapsPin(window.data.advertisement);

  };

  var setDefaultFilters = function () {
    for (var property in Filters.housing) {
      if (Filters.housing.hasOwnProperty(property)) {
        if ((Filters.housing[property] !== 'any')) {
          Filters.housing[property] = 'any';
        }
      }
    }
    for (var feature in Filters.features) {
      if (Filters.features.hasOwnProperty(feature)) {
        if ((Filters.features[feature] === true)) {
          Filters.features[feature] = false;
        }
      }
    }
  };

  var activateFilters = function () {
    for (var i = 0; i < mapfilters.children.length; i++) {
      mapfilters.children[i].disabled = false;
    }
  };

  /**
   * Блокировка фильтров
   *
   */
  var deactivateFilters = function () {
    setDefaultFilters();
    mapfilters.reset();
    for (var i = 0; i < mapfilters.children.length; i++) {
      mapfilters.children[i].disabled = true;
    }
  };

  function getPriceCategory(price) {
    if (price < 10000) {
      return 'low';
    } else if (price >= 50000) {
      return 'high';
    }

    return 'middle';
  }


  var checkFilters = function (hotel) {
    // Проверяем основные параметры жилья
    for (var prop in Filters.housing) {
      if (Filters.housing.hasOwnProperty(prop)) {
        var hotelPropValue = hotel.offer[prop];
        if (prop === 'price') {
          hotelPropValue = getPriceCategory(hotelPropValue);
        }
        if ((Filters.housing[prop] !== 'any') && (hotelPropValue.toString() !== Filters.housing[prop])) {
          return false;
        }
      }
    }
    // Проверяем удобства
    for (var feat in Filters.features) {
      if (Filters.features.hasOwnProperty(feat)) {
        if (Filters.features[feat] === true && hotel.offer.features.indexOf(feat) === -1) {
          return false;
        }
      }
    }

    return true;
  };


  window.filters = {
    checkAdvert: checkFilters,
    activate: activateFilters,
    deactivate: deactivateFilters
  };
})();
