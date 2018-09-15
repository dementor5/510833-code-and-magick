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

var WIZARD_COUNT = 4;

function showElementBySelector(selector) {
  document.querySelector(selector).classList.remove('hidden');
}

function getRandomItemFromArray(array) {
  var min = 0;
  var max = array.length - 1;
  var randomIndex = window.getRandomInRange(min, max);
  return array[randomIndex];
}

function getRandomWizardData() {
  var wizardData = {};
  var firstName = getRandomItemFromArray(WIZARD_NAMES);
  var lastName = getRandomItemFromArray(WIZARD_LAST_NAMES);
  var isNameAndLastNameChanged = window.getRandomInRange(0, 1);

  if (isNameAndLastNameChanged) {
    var temp = firstName;
    firstName = lastName;
    lastName = temp;
  }

  wizardData.name = firstName + ' ' + lastName;
  wizardData.coatColor = getRandomItemFromArray(WIZARD_COATS_COLORS);
  wizardData.eyesColor = getRandomItemFromArray(WIZARD_EYES_COLORS);

  return wizardData;
}

function getWizardsData() {
  var wizardsDataList = [];
  for (var i = 0; i <= WIZARD_COUNT; i++) {
    wizardsDataList[i] = getRandomWizardData();
  }
  return wizardsDataList;
}

function renderWizard(wizard) {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content.querySelector('.setup-similar-item');
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
}

function prepareWizardsElements() {
  var fragment = document.createDocumentFragment();
  var wizardsData = getWizardsData();

  for (var i = 0; i < wizardsData.length; i++) {
    fragment.appendChild(renderWizard(wizardsData[i]));
  }
  return fragment;
}

function appendWizardsOnPage(wizardsElements) {
  var similarListElement = document.querySelector('.setup-similar-list');
  similarListElement.appendChild(wizardsElements);
}

showElementBySelector('.setup');
var wizardElements = prepareWizardsElements();
appendWizardsOnPage(wizardElements);
showElementBySelector('.setup-similar');
