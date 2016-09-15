// Rubbish generator funtion
var Rubbish = function (opt) {
  var rubbishImg = new Image();
  var height     = opt.height;
  var width      = opt.width;
  var dropRate   = opt.dropRate;
  var x          = opt.x;
  var y          = 0;   // starts from top of page
  var points     = 0; //points for each obj recycled
  var minHealth  = 0; //Stores bad health points
  var missPoints = 0; //Neg points for missed objs
  var hitSound   = new Audio(); //Collision sounds

//Randomly generate a different type of sprite
var typeRandomizer = Math.random();
  if (typeRandomizer < 0.10) {
    rubbishImg.src = "assets/obj-bottles-clear.png";
    points = 5;
    minHealth = 0;
    missPoints = 1;
    hitSound.src = "sound/plastic-crunch.wav";
  } else if (typeRandomizer < 0.20){
    rubbishImg.src = "assets/obj-crushedcan-brown.png";
    points = 10;
    minHealth = 0;
    missPoints = -1;
    hitSound.src = "sound/plastic-crunch.wav";
  } else if (typeRandomizer < 0.30) {
    rubbishImg.src = "assets/obj-duffcan.png";
    points = 8;
    minHealth = 0;
    missPoints = -1;
    hitSound.src = "sound/burp.wav";
  } else if (typeRandomizer < 0.40) {
    rubbishImg.src = "assets/obj-newspaper-stack.png";
    points = 10;
    minHealth = 0;
    missPoints = -1;
    hitSound.src = "sound/plastic-crunch.wav";
  } else if (typeRandomizer < 0.50) {
    rubbishImg.src = "assets/obj-crushedbottle-gray.png";
    points = 5;
    minHealth = 0;
    missPoints = -1;
    hitSound.src = "sound/plastic-crunch.wav";
  } else if (typeRandomizer < 0.60) {
    rubbishImg.src = "assets/heart.png";
    minHealth = +5;
    hitSound.src = "sound/add-health.wav";
  } else if (typeRandomizer < 0.70) {
    rubbishImg.src = "assets/obj-eatencandybar-red.png";
    points = 0;
    minHealth = -5;
    hitSound.src = "sound/splat.wav";
  } else if (typeRandomizer < 0.80) {
    rubbishImg.src = "assets/obj-sandwich.png";
    points = 0;
    minHealth = -10;
    hitSound.src = "sound/splat.wav";
  } else if (typeRandomizer < 0.90) {
    rubbishImg.src = "assets/obj-applecore-dull.png";
    points = 0;
    minHealth = -10;
    hitSound.src = "sound/splat.wav";
  } else if (typeRandomizer < 1.00) {
    rubbishImg.src = "assets/obj-donut-homer.png";
    points = 0;
    minHealth = -15;
    hitSound.src = "sound/splat.wav";
  }

// Draw rubbish as it moves down page
  this.render = function (ctx) {
    y += dropRate;
    ctx.drawImage(rubbishImg, x, y, width, height);
  };

//Detects collision with floor and also the bin
  this.collision = function (canvasHeight, binYStart, bin, binWidth) {
    if (y + height*0.5 >= canvasHeight) {
      return {collided: true, points: 0, minHealth: missPoints};
    } else if (y + height*0.5 >= binYStart && x >= bin.x && x + width <= bin.x + binWidth) {
      hitSound.play(); // Play sound effect
      return {collided: true, points: points, minHealth: minHealth};
    } else {
      return {collided: false};
    }
  };

// Grabs rubbishImg from private to be used in game.js
  this.retrieveRubbish = function () {
    return rubbishImg;
  };
};
