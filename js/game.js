var Game = function (opt) {
  //Canvas settings
  var canvas           = opt.canvas;
  var ctx              = canvas.getContext("2d");
  // Set Canvas resolution
  ctx.canvas.width     = window.innerWidth;
  ctx.canvas.height    = window.innerHeight;
  var canvasWidth      = canvas.width;
  var canvasHeight     = canvas.height;
  var canvasGutter     = 10;
  //Background
  var backGd           = null;
  //Rubbish variables
  var startLine        = -2;
  var rubbishHeight    = canvasHeight*0.1;
  var rubbishWidth     = rubbishHeight;
  var sprites          = []; //holds all falling objects
  var lastRubbishTime  = Date.now(); // save the starting time (used to calc elapsed time)
  var rubbishDropRate  = 1; //obj moves down page at this rate
  var newRate          = 1500; //makes new rubbish every
  //Bin variables
  var binHeight        = canvasHeight*0.2;
  var binWidth         = binHeight;
  var binXStart        = (canvasWidth - binWidth) / 2;
  var binYStart        = canvasHeight - binHeight;
  var binMovement      = 10;
  var bin              = null;
  var controller       = null;
  //Game variables
  var gameloop         = null;
  var score            = 0;
  var highScore        = 120;
  var level            = 1;
  var health           = 50;
  var self             = this;
  var message          = "Level 1";
  var alpha            = 1.0;
  var alphaSpeed       = 0.02;

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

    if (message) {
      ctx.fillStyle = "rgba(100,255,30,"+ alpha + ")";
      ctx.font      = "50px Chelsea Market";
      ctx.textAlign = "center";
      ctx.fillText(message, canvasWidth/2,canvasHeight/2);
      alpha         = alpha - 0.01;

      if (alpha <= 0) {
        message = ""
        alpha   = 1.0;
      }
    }

    ctx.font      = "30px Chelsea Market";
    ctx.fillStyle = "white";
    ctx.fillText("Level: " + level,100,40); // Draw level
    ctx.fillText("Score: " + score,100,80); //Draw score
    ctx.fillText("Energy: " + health,100,120); // Draw level

    checkHealth(); //make sure to run this within the gameloop
  };

  var doRestart = function () {
    self.restart();
  };

  var bindRestart = function () {
    $(canvas).one("mousedown", doRestart); //need jquery to make sure it only is able to detect first mousedown
  };

  // Gameover page
  var summary = function () {
    ctx.font = "50px Chelsea Market";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", canvasWidth/2, canvasHeight/2-60);
    ctx.fillText("Score = " + score,canvasWidth/2,canvasHeight/2); // Draw level
    var currentScore = score;
      if (currentScore > highScore) {
        highScore = currentScore;
      }
    ctx.fillText("High score = " + highScore, canvasWidth/2, canvasHeight/2+60);
    ctx.fillText("Click to play again",canvasWidth/2, canvasHeight/2+200);
  };

  // Level up fadeout
  var fadeOut = function(text) {
    messageAlpha = 1.0;
    message      = text;
  };
  // Check level up
  var checkHealth = function() {
    if (health > 0 && score > 60) {
      rubbishDropRate = 2; //(0.1 * (Math.sqrt(level))) + (-0.2 * level) + 1.2;
      level = 4;
      // fadeOut("Level 4");
    } else if (health > 0 && score >40 && score < 61) {
      rubbishDropRate = 1.5; //(0.1 * (Math.sqrt(level))) + (-0.2 * level) + 1.2;
      level = 3;
      // fadeOut("Level 3");
    } else if (health > 0 && score >19 && score < 41) {
      rubbishDropRate = 1.2; //(0.1 * (Math.sqrt(level))) + (-0.2 * level) + 1.2;
      level = 2;
      // fadeOut("Level 2");
    } else if (health <= 0) {
      cancelAnimationFrame(gameloop);
      summary();
      bindRestart();
    }
    generateBgImg();
  }

  var bgSound   = new Audio("sound/park-bench-atmosphere.wav");

// Restart function at gameover to reset counters
  this.restart = function () {
    health           = 100;
    sprites          = [];
    level            = 1;
    score            = 0;
    backGd           = null;
    lastRubbishTime  = Date.now();
    generateRandomRubbish();
    this.animate();
  };

  this.start = function () { //start command can be attach to button
    bgSound.play();
    bindController();
    generateBgImg(level);
    generateBin();
    generateRandomRubbish();
    this.animate();
  };
};
