var Bin = function (opt) {
  var height = opt.height;
  var width  = opt.width;
  var x      = opt.x;
  var y      = opt.y;
  var binImg = new Image();
  binImg.src = "assets/bin-green-full.png";


  //draw the bin at location
  this.render = function (ctx) {
    if (keyRight) {
      x += binMovement;
    } else if (keyLeft) {
      x -= binMovement;
    }
    if (x <= 0) {
      x = 0;
    }
    if ((x + width) >= canvasWidth) {
      x = canvasWidth - width;
    }
    ctx.drawImage(binImg, x, y, width, height);
    console.log("draw bin");
  };

  //Grab binImg from private to be used in game.js
  this.retrieveBin = function () {
    return binImg;
  };
};