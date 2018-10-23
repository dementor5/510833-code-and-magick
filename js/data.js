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
  var wizardCoatColors = window.color.getWizardCoats();
  var wizardEyesColors = window.color.getWizardEyes();

  function getWizardsInfo(count) {
    var wizardsDataList = [];
    for (var i = 0; i <= count; i++) {
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
      colorCoat: window.util.getRandomArrayItem(wizardCoatColors),
      colorEyes: window.util.getRandomArrayItem(wizardEyesColors)
    };
  }

  window.data = {
    getWizardsInfo: getWizardsInfo
  };
})();
