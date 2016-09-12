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
  var binHeight        = 30;
  var binWidth         = 30;
  var bin              = null;
  var sprites          = []; //holds all falling objects
  var lastRubbishTime  = Date.now();   // save the starting time (used to calc elapsed time)
  //Keyboard variables for left and right arrow
  var keyRight         = false;
  var keyLeft          = false;
  var binMovement      = 5;
  var score            = 0;
  var level            = 0;

  //Global Changeable variables
  var rubbishDropRate  = 1; //obj moves down page at this rate
  var newRate          = 1000; //makes new rubbish every

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
      height: binHeight,
      width: binWidth,
      x: (canvasWidth - binWidth)/2,
      y: canvasHeight - binHeight
    });

    bin = newBin; //Make new bin the global bin
    console.log("bin made");
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

    // Key up animation
    canvas.addEventListener('keyup', function (event) {
      var keyName = event.key;
      switch(keyName) {
        case "ArrowLeft":
          keyRight = false;
          break;
        case "ArrowRight":
          keyLeft = false;
          break;
        default:
          break;
      }
      console.log("keyup");
    });

    // Key Down animation
    canvas.addEventListener('keydown', function(event){
      var keyName = event.key;
      switch(keyName) {
        case "ArrowLeft":
            keyLeft = true;
            break;
        case "ArrowRight":
            keyRight = true;
            break;
        default:
            break;
      }
      console.log("keydown");
  });

    clearCanvas(); //clears rubbish at lastRubbishTime before drawing next frame

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
    generateRandomRubbish();
    generateBin();
    animate();
  };
};
