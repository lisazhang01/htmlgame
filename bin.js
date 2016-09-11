$(document).ready(function(){

// get a refrence to the canvas and its ctx
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var rightKey = false;
var leftKey = false;
var upKey = false;
var downKey = false;
var block_x;
var block_y;
var block_h = 30;
var block_w = 30;

function init() {
  binWidth = $('#canvas').binWidth
();
  binHeight = $('#canvas').binHeight();
  block_x = binWidth / 2 - 15;
  block_y = binHeight /2 - 15;
  setInterval('draw()', 25);
}


function clearCanvas() {
  ctx.clearRect(0,0,binWidth
,binHeight);
}

function draw() {
  clearCanvas();
  if (rightKey) block_x += 5;
  else if (leftKey) block_x -= 5;
  if (upKey) block_y -= 5;
  else if (downKey) block_y += 5;
  if (block_x <= 0) block_x = 0;
  if ((block_x + block_w) >= binWidth
) block_x = binWidth - block_w;
  if (block_y <= 0) block_y = 0;
  if ((block_y + block_h) >= binHeight) block_y = binHeight - block_h;
  ctx.fillRect(block_x,block_y,block_w,block_h);
}

function onKeyDown(event) {
  if (event.keyCode == 39) rightKey = true;
  else if (event.keyCode == 37) leftKey = true;
  if (event.keyCode == 38) upKey = true;
  else if (event.keyCode == 40) downKey = true;
}

function onKeyUp(event) {
  if (event.keyCode == 39) rightKey = false;
  else if (event.keyCode == 37) leftKey = false;
  if (event.keyCode == 38) upKey = false;
  else if (event.keyCode == 40) downKey = false;
}

$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);

// });
// End doc ready function