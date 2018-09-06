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

function renderShape(ctx, color, x, y) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}

function renderCloud(ctx) {
  renderShape(
      ctx,
      SHADOW_COLOR,
      CLOUD_X + SHADOW_SHIFT,
      CLOUD_Y + SHADOW_SHIFT
  );

  renderShape(
      ctx,
      CLOUD_COLOR,
      CLOUD_X,
      CLOUD_Y
  );
}

function renderText(ctx, text, x, y) {
  ctx.fillStyle = TEXT_COLOR;
  ctx.font = TEXT_FONT;
  ctx.fillText(text, x, y);
}

function renderGreeting(ctx) {
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
}

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function renderColumn(ctx, columnX, columnHeight, columnColor, name, time) {

  renderText(
      ctx,
      time,
      columnX,
      COLUMN_BOTTOM - columnHeight - COLUMN_TEXT_UP_GUP
  );

  ctx.fillStyle = columnColor;

  ctx.fillRect(
      columnX,
      COLUMN_BOTTOM - columnHeight,
      COLUMN_WIDTH,
      columnHeight
  );

  renderText(
      ctx,
      name,
      columnX,
      COLUMN_BOTTOM + COLUMN_TEXT_BOTTOM_GUP
  );
}

function renderStatistics(ctx, names, times) {
  renderCloud(ctx);
  renderGreeting(ctx);

  var maxTime = Math.max.apply(null, times);
  var columnX;
  var columnHeight;
  var columnColor;

  for (var i = 0; i < names.length; i++) {
    columnX = COLUMN_FIRST_GAP + (COLUMN_WIDTH + COLUMN_INTERVAL) * i;

    columnHeight = Math.round(COLUMN_MAX_HEIGHT * times[i] / maxTime);

    columnColor = (names[i] === 'Вы') ?
      COLUMN_PLAYER_COLOR :
      'rgb(0, 0,' + getRandomInRange(0, 255) + ')';

    renderColumn(ctx, columnX, columnHeight, columnColor, names[i], Math.round(times[i]));
  }
}

window.renderStatistics = renderStatistics;

