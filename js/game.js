var Game = function (opt) {
  //Game global variables
  var canvas           = opt.canvas;
  var ctx              = canvas.getContext("2d");
  // Set Canvas resolution
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  var canvasWidth      = canvas.width;
  var canvasHeight     = canvas.height;
  var canvasGutter     = 10;
  var startLine        = 0;
  var binHeight        = 120;
  var binWidth         = 120;
  var binXStart        = (canvasWidth - binWidth) / 2;
  var binYStart        = canvasHeight - binHeight;
  var binMovement      = 5;
  var collisionY       = canvasHeight - binHeight;
  var collisionXLeft   = (canvasWidth - binWidth) / 2;
  var collisionXRight  = (canvasWidth + binWidth) / 2;
  var rubbishHeight    = 60;
  var rubbishWidth     = 60;
  var controller       = null;
  var bin              = null;
  var sprites          = []; //holds all falling objects
  var lastRubbishTime  = Date.now();   // save the starting time (used to calc elapsed time)
  var score            = 0;
  var level            = 0;

  //Global Changeable variables
  var rubbishDropRate  = 1; //obj moves down page at this rate
  var newRate          = 1000; //makes new rubbish every

  // Generate background


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
  var animate = function () {
    // get the elapsed time
    var newTime = Date.now();
    // see if its time to spawn a new rubbish
    if (newTime >= lastRubbishTime + newRate) {
      generateRandomRubbish();
      lastRubbishTime = newTime;
    }

    clearCanvas(); //clears rubbish at lastRubbishTime before drawing next frame

    bin.render(ctx, controller, canvasWidth); // draws bin while linking canvas, controller function and canvasWidth which is referenced in bin.js

    //Stores rubbish that has collided with the bottom of canvas
    var spritesToRemove = [];
    sprites.forEach(function(sprite, index){
      sprite.render(ctx); // each rubbish will redraw itself at every y+=
      if (sprite.collision(canvasHeight)) {
        spritesToRemove.push(index); // when it collides with bottom it will be pushed to the to-be-removed array
      }
    })

    spritesToRemove.forEach(function (spriteIndex){
      sprites[spriteIndex].retrieveRubbish().remove(); //returns the img of the rubbish
      sprites.splice(spriteIndex, 1); //Removes it from array
    });

    //call animate
    requestAnimationFrame(animate);
  };

  this.start = function () { //start command can be attach to button
    bindController();
    generateBin();
    generateRandomRubbish();
    animate();
  };
};
