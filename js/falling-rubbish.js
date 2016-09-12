$(document).ready(function(){

  // get a refrence to the canvas and its context
  var canvas = document.getElementById("canvas");

  var ctx = canvas.getContext("2d");

  // newly spawned rubbishAll start at top of page
  var startLine = 0;

  // spawn a new rubbish every 1000ms
  var newRate = 1000;

  // set how fast the rubbishAll will fall
  var dropRate = 0.50;

  // when was the last rubbish spawned
  var lastItem = -1;

  // this array holds all spawned rubbish
  var rubbishAll = [];

  // save the starting time (used to calc elapsed time)
  var startTime = Date.now();

  var canvasWidth  = 800;
  var canvasHeight = 500;

  var canvasGutter = 10;
  var rubbishHeight = 10;
  var rubbishWidth  = 12;

  // start animating
  // animate();
  animate();

  function generateRandomRubbish() {
    var rubbishImg = new Image(rubbishWidth,rubbishHeight);
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

    // create the new rubbish
    var rubbish = {
      // set this rubbishAll pic
      type: rubbishImg,
      // set x randomly but at least 10px off the canvas edges
      x: Math.random() * (canvas.width - canvasGutter - rubbishWidth) + canvasGutter,
      // set y to mark start
      y: startLine,
    }

    // add the new rubbish to the rubbishAll[] array
    rubbishAll.push(rubbish);
  }

  function animate() {
    // get the elapsed time
    var time = Date.now();
    var rubbishToDelete = [];

    // see if its time to spawn a new rubbish
    if (time > (lastItem + newRate)) {
      lastItem = time;
      generateRandomRubbish();
    }

    // request another animation frame
    requestAnimationFrame(animate);

    // clear the canvas so all rubbishAll can be
    // redrawn in new positions
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw and animation phase
    // move each rubbish down the canvas
    for (var i = 0; i < rubbishAll.length; i++) {
      var rubbish = rubbishAll[i];

       // else {
        rubbish.y += dropRate; //set falling speed
        ctx.drawImage(rubbish.type, rubbish.x, rubbish.y, rubbishWidth, rubbishHeight);
      }
    }

    // collition phase

    // delete phase

});
// End doc ready function