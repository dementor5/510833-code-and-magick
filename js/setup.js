'use strict';
(function () {
  var HOVER_COLOR = 'yellow';
  var ON = true;
  var OFF = false;
  var MAX_WIZARDS_COUNT = 4;
  var errorMessageEl = document.querySelector('.error-message');
  var setupSimilarEl = document.querySelector('.setup-similar');
  var setupSimilarListEl = document.querySelector('.setup-similar-list');
  var setupEl = window.dialog.getSetupEl();
  var setupFormEl = setupEl.querySelector('.setup-wizard-form');
  var setupWizardEl = setupEl.querySelector('.setup-wizard');
  var userWizardCoatEl = setupWizardEl.querySelector('.wizard-coat');
  var userWizardCoatHiddenInputEl = setupEl.querySelector('[name=coat-color]');
  var userWizardEyesEl = setupWizardEl.querySelector('.wizard-eyes');
  var userWizardEyesHiddenInputEl = setupEl.querySelector('[name=eyes-color]');
  var fireballWrapEl = setupEl.querySelector('.setup-fireball-wrap');
  var fireballWrapHiddenInputEl =
    fireballWrapEl.querySelector('[name=fireball-color]');
  var templateWizardEl = document.querySelector('#similar-wizard-template')
    .content.querySelector('.setup-similar-item');
  var shopEl = setupEl.querySelector('.setup-artifacts-shop');
  var backpackEl = setupEl.querySelector('.setup-artifacts');
  var draggedItem = null;

  addEventListenerOnForm();
  addListenersOnUserWizard();
  addListenerOnShopEl();
  addListenersOnBackpackEl();
  // appendWizardsOnPage(window.data.getWizardsInfo(MAX_WIZARDS_COUNT));
  window.backend.load(appendWizardsOnPage, onError);

  function addEventListenerOnForm() {
    setupFormEl.addEventListener('submit', function (evt) {
      evt.preventDefault();
      sendForm();
    });
  }

  function sendForm() {
    var formData = new FormData(setupFormEl);
    window.backend.save(formData, onSuccess, onError);
  }

  function onSuccess() {
    window.dialog.closePopup();
    errorMessageEl.classList.add('hidden');
  }

  function onError(errorMessage) {
    errorMessageEl.textContent = errorMessage;
    errorMessageEl.classList.remove('hidden');
  }

  function addListenersOnUserWizard() {
    userWizardCoatEl.addEventListener('click', function () {
      setNextCoatColor();
    });

    fireballWrapEl.addEventListener('click', function () {
      setNextFireballsColor();
    });

    userWizardEyesEl.addEventListener('click', function () {
      setNextEyesColor();
    });
  }

  function setNextCoatColor() {
    var currentColor = getComputedStyle(userWizardCoatEl).fill;
    var nextColor = window.color.getNextCoat(currentColor);
    userWizardCoatEl.style.fill = nextColor;
    userWizardCoatHiddenInputEl.value = nextColor;
  }

  function setNextFireballsColor() {
    var currentColor = getComputedStyle(fireballWrapEl).backgroundColor;
    var nextColor = window.color.getNextFireballs(currentColor);

    fireballWrapEl.style.backgroundColor = nextColor;
    fireballWrapHiddenInputEl.value = nextColor;
  }

  function setNextEyesColor() {
    var currentColor = userWizardEyesEl.style.fill;
    var nextColor = window.color.getNextEyes(currentColor);
    userWizardEyesEl.style.fill = nextColor;
    userWizardEyesHiddenInputEl.value = nextColor;
  }

  function addListenerOnShopEl() {
    shopEl.addEventListener('dragstart', function (evt) {
      saveDraggedItem(evt.target);
    });

    shopEl.addEventListener('dragenter', function (evt) {
      if (evt.target !== shopEl) {
        setHoverBackground(evt.target, ON);
      }
    });

    shopEl.addEventListener('dragleave', function (evt) {
      setHoverBackground(evt.target, OFF);
    });

    shopEl.addEventListener('dragover', function (evt) {
      evt.preventDefault();
    });

    shopEl.addEventListener('drop', function (evt) {
      evt.target.appendChild(draggedItem);
      setHoverBackground(evt.target, OFF);
    });
  }

  function addListenersOnBackpackEl() {
    backpackEl.addEventListener('dragstart', function (evt) {
      saveDraggedItem(evt.target);
    });

    backpackEl.addEventListener('dragenter', function (evt) {
      setHoverBackground(evt.target, ON);
    });

    backpackEl.addEventListener('dragleave', function (evt) {
      setHoverBackground(evt.target, OFF);
    });

    backpackEl.addEventListener('dragover', function (evt) {
      evt.preventDefault();
    });

    backpackEl.addEventListener('drop', function (evt) {
      evt.target.appendChild(draggedItem);
      setHoverBackground(evt.target, OFF);
    });
  }

  function saveDraggedItem(item) {
    if (item.tagName === 'IMG') {
      draggedItem = item;
    }
  }

  function setHoverBackground(el, flag) {
    el.style.background = flag ? HOVER_COLOR : '';
  }

  function appendWizardsOnPage(data) {
    var wizardsData = window.util.getRandomEls(data, MAX_WIZARDS_COUNT);
    var wizardsFragment = getWizardsFragment(wizardsData);
    setupSimilarEl.classList.remove('hidden');
    setupSimilarListEl.appendChild(wizardsFragment);
  }

  function getWizardsFragment(wizardsData) {
    var fragment = document.createDocumentFragment();
    wizardsData.forEach(function (it) {
      var newWizardEl = getNewWizardEl(it);
      fragment.appendChild(newWizardEl);
    });

    return fragment;
  }

  function getNewWizardEl(wizardInfo) {
    var wizardEl = templateWizardEl.cloneNode(true);
    var wizardFullName = wizardEl.querySelector('.setup-similar-label');
    var wizardCoat = wizardEl.querySelector('.wizard-coat');
    var wizardEyes = wizardEl.querySelector('.wizard-eyes');

    wizardFullName.textContent = wizardInfo.name;
    wizardCoat.style.fill = wizardInfo.colorCoat;
    wizardEyes.style.fill = wizardInfo.colorEyes;

    return wizardEl;
  }
})();
