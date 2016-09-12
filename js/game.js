var Game = function (opt) {
  //Game global variables
  var canvas           = opt.canvas;
  var ctx              = canvas.getContext("2d");
  var canvasWidth      = canvas.width;
  var canvasHeight     = canvas.height;
  var canvasGutter     = 10;
  var startLine        = 0;
  var rubbishHeight    = 10;
  var rubbishWidth     = 12;
  var sprites          = []; //holds all falling objects
  var lastRubbishTime  = Date.now();   // save the starting time (used to calc elapsed time)
  var score            = 0;
  var level            = 0;

  //Global Changeable variables
  var rubbishDropRate = 3; //obj moves down page at this rate
  var newRate         = 200; //makes new rubbish every 1s

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

    clearCanvas();

    var spritesToRemove = [];
    sprites.forEach(function(sprite, index){
      sprite.render(ctx);
      if (sprite.collision(canvasHeight)) {
        spritesToRemove.push(index);
      }
    })

    spritesToRemove.forEach(function (spriteIndex){
      sprites[spriteIndex].retrieveRubbish().remove();
      sprites.splice(spriteIndex, 1);
    });

    //call animate
    requestAnimationFrame(animate);
  };

  this.start = function () {
    generateRandomRubbish();
    animate();
  };
};
