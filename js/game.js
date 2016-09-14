var Game = function (opt) {
  //Canvas settings
  var canvas           = opt.canvas;
  var ctx              = canvas.getContext("2d");
  // Set Canvas resolution
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  var canvasWidth      = canvas.width;
  var canvasHeight     = canvas.height;
  var canvasGutter     = 10;
  //Background
  var backGd           = null;
  //Rubbish variables
  var startLine        = 0;
  var rubbishHeight    = canvasHeight*0.1;
  var rubbishWidth     = rubbishHeight*0.8;
  var sprites          = []; //holds all falling objects
  var lastRubbishTime  = Date.now(); // save the starting time (used to calc elapsed time)
  var rubbishDropRate  = 1; //obj moves down page at this rate
  var newRate          = 1500; //makes new rubbish every
  //Bin variables
  var binHeight        = canvasHeight*0.2;
  var binWidth         = binHeight*0.75;
  var binXStart        = (canvasWidth - binWidth) / 2;
  var binYStart        = canvasHeight - binHeight;
  var binMovement      = 5;
  var bin              = null;
  var controller       = null;
  //Game variables
  var gameloop         = null;
  var score            = 0;
  var highScore        = 0;
  var level            = 1;
  var health           = 50;
  var self             = this;


  // Generate background
  var generateBgImg = function () {
    var newBg = new Background ({
      height: canvasHeight,
      width: canvasWidth,
      gameLevel: level,
      x: 0,
      y: 0
    });
    backGd = newBg;
  }

  //Generator of new rubbish
  var generateRandomRubbish = function () {
    var newRubbish = new Rubbish({
      height: rubbishHeight,
      width:  rubbishWidth,
      dropRate: rubbishDropRate,
      x: Math.random() * (canvasWidth - canvasGutter - rubbishWidth) + canvasGutter
    });

    sprites.push(newRubbish); // push all rubbish into spites array
  };

  //Generate bin
  var generateBin = function () {
    var newBin = new Bin({
      height:   binHeight,
      width:    binWidth,
      moveRate: binMovement,
      x:        binXStart,
      y:        binYStart
    });

    bin = newBin;
  };

  // Connects controller to document
  var bindController = function () {
    controller = new Controller();
  };

  // clear the canvas
  var clearCanvas = function () {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  };

  //Animate function for rubbish
  this.animate = function () {
    //call animate
    gameloop = requestAnimationFrame(self.animate);

    // get the elapsed time
    var newTime = Date.now();
    // see if its time to spawn a new rubbish
    if (newTime >= lastRubbishTime + newRate) {
      generateRandomRubbish();
      lastRubbishTime = newTime;
    }

    clearCanvas(); //clears rubbish at lastRubbishTime before drawing next frame

    backGd.render(ctx, level); //Draw background

    bin.render(ctx, controller, canvasWidth); // After clearCavas, draws bin while linking canvas, controller function and canvasWidth which is referenced in bin.js

    //Stores rubbish that has collided with the bottom of canvas
    var spritesToRemove = [];
    sprites.forEach(function(sprite, index){
      sprite.render(ctx); // each rubbish will redraw itself at every y+=

      var hit = sprite.collision(canvasHeight, binYStart, bin.getPositon(), binWidth);
      if (hit.collided) {
        spritesToRemove.push(index); // when it collides with bottom or bin coordinates it will be pushed to the to-be-removed array
        score += hit.points;
        health += hit.minHealth;
      }
    })

    spritesToRemove.forEach(function (spriteIndex){
      sprites[spriteIndex].retrieveRubbish().remove(); //returns the img of the rubbish
      sprites.splice(spriteIndex, 1); //Removes it from array
    });

    ctx.font = "20px Times New Roman";
    ctx.fillStyle = "black";
    ctx.fillText("level: " + level,20,30); // Draw level
    ctx.fillText("score: " + score,20,60); //Draw score
    ctx.fillText("health: " + health,20,90); // Draw level

    checkHealth(); //make sure to run this within the gameloop
  };

  // Check if time to level up
  var checkHealth = function () {

    if (health > 0 && score >= 20) {
      level = 2;
      alert("Level 2");

    } else if (health > 0 && score >= 40) {
      level = 3;
      alert("Level 3");

    } else if (health > 0 && score >= 60) {
      level = 4;
      alert("Level 4");

    } else if (health <= 0) {
      cancelAnimationFrame(gameloop);
      alert("Game Over. Your scored " + score + " points.");
    }
    generateBgImg();
    // backGd = new Background(opt, level);
  };

  this.start = function () { //start command can be attach to button
    bindController();
    generateBgImg();
    generateBin();
    generateRandomRubbish();
    this.animate();
  };
};
