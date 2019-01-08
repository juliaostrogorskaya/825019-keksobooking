'use strict';
// модуль util.js
(function () {
  var ESC_KEYCODE = 27;
  /**
     * Выбирает рандомное число из заданного промежутка чисел

     * @param {number} min Минимальное число.
     * @param {number} max Максимальное число.
     * @return {number} randomNumber Рандомное число.
     */
  var getRandomNumber = function (min, max) {
    var randomNumber = Math.floor(Math.random() * (max - min)) + min;
    return randomNumber;
  };

  /**
     * Создает массив рандомной длины

     * @param {array} array Массив.
     * @return {array}  array Новый массив рандомной длины.
     */
  var trimToRandomArrayLength = function (array) {
    var randomNum = getRandomNumber(1, array.length + 1);
    return array.slice(0, randomNum);
  };

  var getUniqueArrayItem = function (array) {
    var removedEl = array.splice(getRandomNumber(0, array.length - 1), 1);
    return removedEl[0];
  };

  /**
     * Перемешивает элементы массива в случайном порядке
     *
     * @param {array} array Массив, который нужно перемешать.
     * @return {array} array Итоговый массив.
     */
  function shuffleArray(array) {
    var currentIndex = array.length;
    var temporaryValue;
    var randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    getRandomNumber: getRandomNumber,
    trimToRandomArrayLength: trimToRandomArrayLength,
    getUniqueArrayItem: getUniqueArrayItem,
    shuffleArray: shuffleArray
  };
})();
