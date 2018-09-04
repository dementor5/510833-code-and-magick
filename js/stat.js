'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_COLOR = '#fff';

var SHADOW_SHIFT = 10;
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';

var GAP = 15;
var TEXT_GAP = 20;
var TEXT_FONT = '16px PT mono';
var TEXT_COLOR = '#000';

var COLUMN_WIDTH = 40;
var COLUMN_MAX_HEIGHT = 150;
var COLUMN_INTERVAL = 50;
var COLUMN_FIRST_GAP = CLOUD_X + COLUMN_INTERVAL + 5;
var COLUMN_BOTTOM = CLOUD_Y + COLUMN_MAX_HEIGHT + 85;
var COLUMN_TEXT_UP_GUP = 5;
var COLUMN_TEXT_BOTTOM_GUP = 15;
var COLUMN_PLAYER_COLOR = 'rgba(255, 0, 0, 1)';

function renderCloud(ctx, color, x, y) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}

function renderText(ctx, text, x, y) {
  ctx.fillStyle = TEXT_COLOR;
  ctx.font = TEXT_FONT;
  ctx.fillText(text, x, y);
}

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function renderStatistics(ctx, names, times) {
  renderCloud(
      ctx,
      SHADOW_COLOR,
      CLOUD_X + SHADOW_SHIFT,
      CLOUD_Y + SHADOW_SHIFT
  );

  renderCloud(
      ctx,
      CLOUD_COLOR,
      CLOUD_X,
      CLOUD_Y
  );

  renderText(
      ctx,
      'Ура вы победили!',
      CLOUD_X + GAP,
      CLOUD_Y + GAP + TEXT_GAP
  );

  renderText(
      ctx,
      'Список результатов:',
      CLOUD_X + GAP,
      CLOUD_Y + GAP + TEXT_GAP * 2
  );

  var maxTime = Math.max.apply(null, times);

  for (var i = 0; i < names.length; i++) {
    var columnHeight = Math.round(COLUMN_MAX_HEIGHT * times[i] / maxTime);

    renderText(
        ctx,
        Math.round(times[i]),
        COLUMN_FIRST_GAP + (COLUMN_WIDTH + COLUMN_INTERVAL) * i,
        COLUMN_BOTTOM - columnHeight - COLUMN_TEXT_UP_GUP
    );

    ctx.fillStyle = (names[i] === 'Вы') ?
      COLUMN_PLAYER_COLOR :
      'rgb(0, 0,' + getRandomInRange(0, 255) + ')';

    ctx.fillRect(
        COLUMN_FIRST_GAP + (COLUMN_WIDTH + COLUMN_INTERVAL) * i,
        COLUMN_BOTTOM - columnHeight,
        COLUMN_WIDTH,
        columnHeight
    );

    renderText(
        ctx,
        names[i],
        COLUMN_FIRST_GAP + (COLUMN_WIDTH + COLUMN_INTERVAL) * i,
        COLUMN_BOTTOM + COLUMN_TEXT_BOTTOM_GUP
    );
  }
}

window.renderStatistics = renderStatistics;

