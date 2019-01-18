'use strict';
(function () {
  // Создает сообщение об ошибке или успехе
  var renderStatusMessage = function (statusTemplate, statusElement) {

    var mainContainer = document.querySelector('main');
    var messageFragment = document.createDocumentFragment();
    var messageBlock = statusTemplate.cloneNode(true);

    messageFragment.appendChild(messageBlock);

    var statusBlock = messageFragment.querySelector(statusElement);

    mainContainer.insertBefore(statusBlock, mainContainer.firstChild);
    document.querySelector(statusElement).addEventListener('click', closeMessage);
    document.addEventListener('keydown', onEscPress);
    setTimeout(function () {
      mainContainer.firstChild.remove();
    }, 5000);

  };

  var closeMessage = function () {
    var container = document.querySelector('main');
    container.firstChild.remove();
    document.removeEventListener('keydown', onEscPress);
  };

  var onEscPress = function (evt) {
    window.utils.isEscEvent(evt, closeMessage);
  };

  window.messages = {
    renderStatusMessage: renderStatusMessage
  };

})();
