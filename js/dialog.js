'use strict';
(function () {
  var setup = document.querySelector('.setup');
  var dialogHandler = setup.querySelector('[type=file]');
  var dragged;
  var startCoords;

  dialogHandler.addEventListener('mousedown', function (evt) {
    startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    dragged = false;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

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

    setup.style.top = setup.offsetTop + shift.y + 'px';
    setup.style.left = setup.offsetLeft + shift.x + 'px';
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
})();

