'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function rgbToHex(rgb) {
    rgb = rgb.match(
        /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i
    );
    return (rgb && rgb.length === 4) ? '#' +
      ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) +
      ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2) +
      ('0' + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
  }

  function getNextArrayItem(oldItem, arr) {
    var nextItem = arr[arr.indexOf(oldItem) + 1];
    return nextItem ? nextItem : arr[0];
  }

  function getRandomArrayItem(arr) {
    var min = 0;
    var max = arr.length - 1;
    var randomIndex = window.util.getRandomInRange(min, max);
    return arr[randomIndex];
  }

  function getRandomEls(data, count) {
    if (data.length > count) {
      var dataCopy = data.slice();
      var temp = [];

      for (var i = 0; i < count; i++) {
        temp.push(getRandomUniqueArrayEl(dataCopy));
      }

      data = temp;
    }

    return data;
  }

  function getRandomUniqueArrayEl(array) {
    var min = 0;
    var max = array.length - 1;
    var randomIndex = getRandomInRange(min, max);
    var element = array[randomIndex];
    array.splice(randomIndex, 1);
    return element;
  }

  function isEscEvent(evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  }

  function isEnterEvent(evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  }

  window.util = {
    getRandomInRange: getRandomInRange,
    rgbToHex: rgbToHex,
    getNextArrayItem: getNextArrayItem,
    getRandomArrayItem: getRandomArrayItem,
    getRandomEls: getRandomEls,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent
  };
})();
