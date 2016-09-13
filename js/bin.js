var Bin = function (opt) {
  var binImg   = new Image();
  var height   = opt.height;
  var width    = opt.width;
  var moveRate = opt.moveRate
  var x        = opt.x;
  var y       = opt.y;

  binImg.src = "assets/bin-green-full.png";

  //draw the bin at location
  this.render = function (ctx, controller, canvasWidth) {
    if (controller.keyRight) {
      x += moveRate; // right key moves x position right
    } else if (controller.keyLeft) {
      x -= moveRate; // left key moves x position left
    }

    if (x <= 0) {
      x = 0; // keeps bin within left border of canvas
    }

    if (x + width >= canvasWidth) {
      x = canvasWidth - width; // keeps bin within right border of canvas
    }

    ctx.drawImage(binImg, x, y, width, height); //draws bin at start point center bottom
  };

  //Grab binImg from private to be used in game.js
  this.retrieveBin = function () {
    return binImg;
  };

  this.getPositon = function(){
    return { "x": x, "y": y };
  }


};