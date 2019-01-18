'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var DEBOUNCE_INTERVAL = 500;

  var lastTimeout;
  var debounce = function (callBack) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(callBack, DEBOUNCE_INTERVAL);
  };

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };

  window.util = {
    isEscEvent: isEscEvent,
    debounce: debounce
  };
})();
