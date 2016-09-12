$(document).ready(function(){


var block_x;
var block_y;
var block_h = 30;
var block_w = 30;

var rightKey = false;
var leftKey = false;


function init() {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  block_x = canvas.width / 2 - block_w / 2;
  block_y = canvas.height - block_h;
  setInterval('draw()', 25);
}


function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
  clearCanvas();
  if (rightKey) {
    block_x += 5;
  }  else if (leftKey) {
    block_x -= 5;
  }
  if (block_x <= 0) {
    block_x = 0;
  }
  if ((block_x + block_w) >= canvas.width) {
    block_x = canvas.width - block_w;
  }

  ctx.fillRect(block_x,block_y,block_w,block_h);
}

canvas.addEventListener('keydown', function onKeyDown(event) {
  if (event.key == ArrowRight[1]) {
    rightKey = true;
  } else if (event.key == ArrowLeft[1]) {
    leftKey = true;
  }
});


canvas.addEventListener('keyup', function onKeyUp(event) {
  if (event.key == ArrowRight[1]) {
    rightKey = false;
  } else if (event.key == ArrowLeft[1]) {
    leftKey = false;
  }
});


});
// End doc ready function