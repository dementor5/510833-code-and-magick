'use strict';
(function () {
  var HOVER_COLOR = 'yellow';
  var setupSimilarEl = document.querySelector('.setup-similar');
  var setupSimilarListEl = document.querySelector('.setup-similar-list');
  var setupEl = window.dialog.getSetupEl();
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
  var wizardsData = window.data.getWizardsInfo();

  addListenersOnUserWizard();
  addListenerOnShopEl();
  addListenersOnBackpackEl();
  appendWizardsOnPage();

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
    var nextColor = window.data.getNextCoatColor(currentColor);
    userWizardCoatEl.style.fill = nextColor;
    userWizardCoatHiddenInputEl.value = nextColor;
  }

  function setNextFireballsColor() {
    var currentColor = getComputedStyle(fireballWrapEl).backgroundColor;
    var nextColor = window.data.getNextFireballsColor(currentColor);

    fireballWrapEl.style.backgroundColor = nextColor;
    fireballWrapHiddenInputEl.value = nextColor;
  }

  function setNextEyesColor() {
    var currentColor = userWizardEyesEl.style.fill;
    var nextColor = window.data.getNextEyesColor(currentColor);
    userWizardEyesEl.style.fill = nextColor;
    userWizardEyesHiddenInputEl.value = nextColor;
  }

  function addListenerOnShopEl() {
    shopEl.addEventListener('dragstart', function (evt) {
      saveDraggedItem(evt.target);
    });

    shopEl.addEventListener('dragenter', function (evt) {
      if (evt.target !== shopEl) {
        setHoverBackground(evt.target, 'on');
      }
    });

    shopEl.addEventListener('dragleave', function (evt) {
      setHoverBackground(evt.target, 'off');
    });

    shopEl.addEventListener('dragover', function (evt) {
      evt.preventDefault();
    });

    shopEl.addEventListener('drop', function (evt) {
      evt.target.appendChild(draggedItem);
      setHoverBackground(evt.target, 'off');
    });
  }

  function addListenersOnBackpackEl() {
    backpackEl.addEventListener('dragstart', function (evt) {
      saveDraggedItem(evt.target);
    });

    backpackEl.addEventListener('dragenter', function (evt) {
      setHoverBackground(evt.target, 'on');
    });

    backpackEl.addEventListener('dragleave', function (evt) {
      setHoverBackground(evt.target, 'off');
    });

    backpackEl.addEventListener('dragover', function (evt) {
      evt.preventDefault();
    });

    backpackEl.addEventListener('drop', function (evt) {
      evt.target.appendChild(draggedItem);
      setHoverBackground(evt.target, 'off');
    });
  }

  function saveDraggedItem(item) {
    if (item.tagName === 'IMG') {
      draggedItem = item;
    }
  }

  function setHoverBackground(el, flag) {
    switch (flag) {
      case 'on':
        el.style.backgroundColor = HOVER_COLOR;
        break;
      case 'off':
        el.style.backgroundColor = '';
        break;
    }
  }

  function appendWizardsOnPage() {
    var wizardsFragment = getWizardsFragment();
    setupSimilarEl.classList.remove('hidden');
    setupSimilarListEl.appendChild(wizardsFragment);
  }

  function getWizardsFragment() {
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
    wizardCoat.style.fill = wizardInfo.coatColor;
    wizardEyes.style.fill = wizardInfo.eyesColor;

    return wizardEl;
  }
})();
