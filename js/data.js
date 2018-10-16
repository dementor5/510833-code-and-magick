'use strict';
(function () {
  var WIZARD_NAMES = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];
  var WIZARD_LAST_NAMES = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ];
  var WIZARD_COATS_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];
  var WIZARD_EYES_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];
  var WIZARD_FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];
  var WIZARD_COUNT = 4;

  function getNextCoatColor(currentColor) {
    return window.util.getNextArrayItem(currentColor, WIZARD_COATS_COLORS);
  }

  function getNextFireballsColor(currentColor) {
    return window.util.getNextArrayItem(window.util.rgbToHex(currentColor),
        WIZARD_FIREBALL_COLORS);
  }

  function getNextEyesColor(currentColor) {
    currentColor = currentColor ? currentColor : WIZARD_EYES_COLORS[0];
    return window.util.getNextArrayItem(currentColor, WIZARD_EYES_COLORS);
  }

  function getWizardsInfo() {
    var wizardsDataList = [];
    for (var i = 0; i <= WIZARD_COUNT; i++) {
      wizardsDataList[i] = getRandomWizardInfo();
    }
    return wizardsDataList;
  }

  function getRandomWizardInfo() {
    var firstName = window.util.getRandomArrayItem(WIZARD_NAMES);
    var lastName = window.util.getRandomArrayItem(WIZARD_LAST_NAMES);
    var fullNameSwapped = window.util.getRandomInRange(0, 1) === 1;

    if (fullNameSwapped) {
      var temp = firstName;
      firstName = lastName;
      lastName = temp;
    }

    return {
      name: firstName + ' ' + lastName,
      coatColor: window.util.getRandomArrayItem(WIZARD_COATS_COLORS),
      eyesColor: window.util.getRandomArrayItem(WIZARD_EYES_COLORS)
    };
  }

  window.data = {
    getNextCoatColor: getNextCoatColor,
    getNextFireballsColor: getNextFireballsColor,
    getNextEyesColor: getNextEyesColor,
    getWizardsInfo: getWizardsInfo
  };

})();
