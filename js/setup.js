'use strict';

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
var HIDE_CLASS = 'hidden';
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content.querySelector('.setup-similar-item');
var setupSimilar = document.querySelector('.setup-similar');
var setupSimilarList = document.querySelector('.setup-similar-list');
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');
var setupWizard = setup.querySelector('.setup-wizard');
var wizardCoat = setupWizard.querySelector('.wizard-coat');
var wizardCoatHiddenInput = setup.querySelector('[name="coat-color"]');
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var wizardEyesHiddenInput = setup.querySelector('[name="eyes-color"]');
var fireballWrap = setup.querySelector('.setup-fireball-wrap');
var fireballWrapHiddenInput =
  fireballWrap.querySelector('[name="fireball-color"]');

appendWizardsOnPage(prepareWizardsElements());
showElement(setupSimilar);

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput
			.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
  }
});

wizardCoat.addEventListener('click', function () {
  changeWizardCoatColor();
});

wizardEyes.addEventListener('click', function () {
  changeWizardEyesColor();
});

fireballWrap.addEventListener('click', function () {
  changeWizardFireballsColor();
});

function appendWizardsOnPage(wizardsElements) {
  setupSimilarList.appendChild(wizardsElements);
}

function prepareWizardsElements() {
  var fragment = document.createDocumentFragment();
  var wizardsData = getWizardsData();

  for (var i = 0; i < wizardsData.length; i++) {
    fragment.appendChild(renderWizard(wizardsData[i]));
  }
  return fragment;
}

function getWizardsData() {
  var wizardsDataList = [];
  for (var i = 0; i <= WIZARD_COUNT; i++) {
    wizardsDataList[i] = getRandomWizardData();
  }
  return wizardsDataList;
}

function getRandomWizardData() {
  var wizardData = {};
  var firstName = getRandomItem(WIZARD_NAMES);
  var lastName = getRandomItem(WIZARD_LAST_NAMES);
  var isNameAndLastNameChanged = window.getRandomInRange(0, 1);

  if (isNameAndLastNameChanged) {
    var temp = firstName;
    firstName = lastName;
    lastName = temp;
  }

  wizardData.name = firstName + ' ' + lastName;
  wizardData.coatColor = getRandomItem(WIZARD_COATS_COLORS);
  wizardData.eyesColor = getRandomItem(WIZARD_EYES_COLORS);

  return wizardData;
}

function renderWizard(wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
}

function openPopup() {
  showElement(setup);
  document.addEventListener('keydown', onPopupEscPress);
}

function closePopup() {
  hideElement(setup);
  document.removeEventListener('keydown', onPopupEscPress);
}

function onPopupEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE && evt.target !== userNameInput) {
    closePopup();
  }
}

function changeWizardCoatColor() {
  var oldCoatColor = wizardCoat.style.fill;
  var newColor = getNextItem(oldCoatColor, WIZARD_COATS_COLORS);
  wizardCoat.style.fill = newColor;
  wizardCoatHiddenInput.value = newColor;
}

function changeWizardEyesColor() {
  var oldEyesColor = wizardEyes.style.fill;
  var newColor = getNextItem(oldEyesColor, WIZARD_EYES_COLORS);
  wizardEyes.style.fill = newColor;
  wizardEyesHiddenInput.value = newColor;
}

function changeWizardFireballsColor() {
  var oldFireballsColor = fireballWrap.style.backgroundColor;
  var newColor;

  if (oldFireballsColor) {
    oldFireballsColor = rgb2hex(oldFireballsColor);
  }

  newColor = getNextItem(oldFireballsColor, WIZARD_FIREBALL_COLORS);
  fireballWrap.style.backgroundColor = newColor;
  fireballWrapHiddenInput.value = newColor;
}

function rgb2hex(rgb) {
  rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
  return (rgb && rgb.length === 4) ? '#' +
    ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) +
    ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2) +
    ('0' + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
}

function showElement(element) {
  element.classList.remove(HIDE_CLASS);
}

function hideElement(element) {
  element.classList.add(HIDE_CLASS);
}

function getNextItem(oldItem, items) {
  var nextIndex = 1;
  var oldItemIndex;

  if (oldItem) {
    oldItemIndex = items.indexOf(oldItem);
    nextIndex = oldItemIndex + 1;

    if (nextIndex === items.length) {
      nextIndex = 0;
    }
  }

  return items[nextIndex];
}

function getRandomItem(items) {
  var min = 0;
  var max = items.length - 1;
  var randomIndex = window.getRandomInRange(min, max);
  return items[randomIndex];
}
