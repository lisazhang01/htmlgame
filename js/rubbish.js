var Rubbish = function (opt) {
  var rubbishImg = new Image();
  var height     = opt.height;
  var width      = opt.width;
  var dropRate   = opt.dropRate;
  var x          = opt.x;
  var y          = 0;   // starts from top of page

  var typeRandomizer = Math.random();
  if (typeRandomizer < 0.20) {
    rubbishImg.src = "assets/obj-can-red.jpg";
  } else if (typeRandomizer < 0.40){
    rubbishImg.src = "assets/obj-can-red.jpg";
  } else if (typeRandomizer < 0.60) {
    rubbishImg.src = "assets/obj-can-red.jpg";
  } else if (typeRandomizer < 0.80) {
    rubbishImg.src = "assets/obj-sandwich.png";
  } else if (typeRandomizer < 1.00) {
    rubbishImg.src = "assets/obj-sandwich.png";
  }
  // Draw rubbish as it moves down page
  this.render = function (ctx) {
    y += dropRate;
    ctx.drawImage(rubbishImg, x, y, width, height);
  };

  this.collision = function (canvasHeight, binYStart, bin, binWidth) {
    if (y + height >= canvasHeight) {
      return true;
    } else if (y + height >= binYStart && x >= bin.x && x + width <= bin.x + binWidth) {
      return true;
    }
  };

  // Grabs rubbishImg from private to be used in game.js
  this.retrieveRubbish = function () {
    return rubbishImg;
  };
};
