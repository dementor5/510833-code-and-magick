'use strict';
(function () {
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

  function getWizardCoatsColors() {
    return WIZARD_COATS_COLORS;
  }

  function getWizardEyesColors() {
    return WIZARD_EYES_COLORS;
  }

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

  window.color = {
    getWizardCoats: getWizardCoatsColors,
    getWizardEyes: getWizardEyesColors,
    getNextCoat: getNextCoatColor,
    getNextFireballs: getNextFireballsColor,
    getNextEyes: getNextEyesColor
  };
})();
