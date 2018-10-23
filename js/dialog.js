'use strict';
(function () {
  var setupEl = document.querySelector('.setup');
  var setupOpenEl = document.querySelector('.setup-open');
  var setupCloseEl = setupEl.querySelector('.setup-close');
  var dialogHandler = setupEl.querySelector('[type=file]');
  var nameEl = setupEl.querySelector('.setup-user-name');
  var dragged;
  var startCoords;

  addEventListenersOnSetupOpenEl();
  addEventListenersOnSetupEl();

  function addEventListenersOnSetupOpenEl() {
    setupOpenEl.addEventListener('click', function () {
      openPopup();
    });

    setupOpenEl.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, openPopup);
    });
  }

  function openPopup() {
    setupEl.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  }

  function addEventListenersOnSetupEl() {
    setupCloseEl.addEventListener('click', function () {
      closePopup();
    });

    setupCloseEl.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, closePopup);
    });

    nameEl.addEventListener('input', function (evt) {
      checkValidity(evt.target);
    });

    dialogHandler.addEventListener('mousedown', onMouseDown);
  }

  function onPopupEscPress(evt) {
    window.util.isEscEvent(evt, function () {
      if (evt.target !== nameEl) {
        closePopup();
      }
    });
  }

  function closePopup() {
    setupEl.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  }

  function checkValidity(el) {
    if (el.validity.tooShort) {
      el.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (el.validity.tooLong) {
      el.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (el.validity.valueMissing) {
      el.setCustomValidity('Обязательное поле');
    } else {
      el.setCustomValidity('');
    }
  }

  function onMouseDown(evt) {
    startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    dragged = false;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  function onMouseMove(evt) {
    dragged = true;

    var shift = {
      x: evt.clientX - startCoords.x,
      y: evt.clientY - startCoords.y
    };

    startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    setupEl.style.top = setupEl.offsetTop + shift.y + 'px';
    setupEl.style.left = setupEl.offsetLeft + shift.x + 'px';
  }

  function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (dragged) {
      dialogHandler.addEventListener('click', onClickPreventDefault);
    }
  }

  function onClickPreventDefault(evt) {
    evt.preventDefault();
    dialogHandler.removeEventListener('click', onClickPreventDefault);
  }

  function getSetupEl() {
    return setupEl;
  }

  window.dialog = {
    getSetupEl: getSetupEl,
    closePopup: closePopup
  };
})();

