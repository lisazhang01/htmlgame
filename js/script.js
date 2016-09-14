$(document).ready(function(){
  //Setup Canvas gameboard
  function init() {

    setInterval('draw()', 25);
  }

  // request another animation frame
  requestAnimationFrame(animate);
});

//Keyboard variables for left and right arrow
var rightKey = false;
var leftKey = false;

//On keydown function
var onKeyDown = function (event) {
  if (event.key == ArrowRight[1]) {
    rightKey = true;
  } else if (event.key == ArrowLeft[1]) {
    leftKey = true;
  }
}
// on keyup function
var onKeyUp = function (event) {
  if (event.key == ArrowRight[1]) {
    rightKey = false;
  } else if (event.key == ArrowLeft[1]) {
    leftKey = false;
  }
}
// Add eventlisterners to key functions
canvas.addEventListener(onKeyDown(event));
canvas.addEventListener(onKeyUp(event));

// clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

// Draw falling objects
function drawSprites() {
  for (var i = 0; i < sprites.length; i++) {
    var fallingObj = sprites[i];
    fallingObj.y += dropRate; //set falling speed
    ctx.drawImage(fallingObj.type, fallingObj.x, fallingObj.y, fallingObj.width, fallingObj.height);
  }
}

function drawBin() {
  for (var i = 0; i < bins.length; i++) {
    var currentBin = bins[i];
      if (rightKey) {
        currentBin.x += 5;
      }  else if (leftKey) {
        currentBin.x -= 5;
      }
      if (currentBin.x <= 0) {
        currentBin = 0;
      }
      if ((currentBin.x + currentBin.width) >= canvas.width) {
        currentBin.x = canvas.width - currentBin.width;
      }
      ctx.drawImage(currentBin.type, currentBin.x, currentBin.y, currentBin.width, currentBin.height);
  }
}

