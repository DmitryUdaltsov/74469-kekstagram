'use strict';
(function () {
  // Получает случайное число в заданном диапазоне от beginNumber до endNumber
  window.getRandomPeriod = function (beginNumber, endNumber) {
    return Math.round(beginNumber + Math.random() * (endNumber - beginNumber));
  };
})();

