$(document).ready(function(){

// get a refrence to the canvas and its context
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// newly spawned rubbishAll start at top of page
var startLine = 0;

// spawn a new rubbish every 1500ms
var newRate = 1000;

// set how fast the rubbishAll will fall
var dropRate = 0.50;

// when was the last rubbish spawned
var lastItem = -1;

// this array holds all spawned rubbish
var rubbishAll = [];

// save the starting time (used to calc elapsed time)
var startTime = Date.now();

// start animating
animate();


function generateRandomRubbish() {

    // select a random pic for this new rubbish
    var t;

    if (Math.random() < 0.20) {
        t = "red";
    } else if (Math.random() < 0.40){
        t = "blue";
    } else if (Math.random() < 0.60) {
        t = "yellow";
    } else if (Math.random() < 0.80) {
        t = "white";
    } else if (Math.random() < 1.00) {
        t = "white";
    }

    // var rubbishImg = new pic(20,20);

    // if (Math.random() < 0.20) {
    //     rubbishImg.src = "assets/obj-can-red.jpg";
    // } else if (Math.random() < 0.40){
    //     rubbishImg.src = "assets/obj-can-red.jpg";
    // } else if (Math.random() < 0.60) {
    //     rubbishImg.src = "assets/obj-can-red.jpg";
    // } else if (Math.random() < 0.80) {
    //     rubbishImg.src = "assets/obj-sandwich.png";
    // } else if (Math.random() < 1.00) {
    //     rubbishImg.src = "assets/obj-sandwich.png";
    // }

    // create the new rubbish
    var rubbish = {
        // set this rubbishAll pic
        pic: t,
        // set x randomly but at least 10px off the canvas edges
        x: Math.random() * (canvas.width - 20) + 10,
        // set y to mark start
        y: startLine,
    }

    // add the new rubbish to the rubbishAll[] array
    rubbishAll.push(rubbish);
}



function animate() {

    // get the elapsed time
    var time = Date.now();

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

    // move each rubbish down the canvas
    for (var i = 0; i < rubbishAll.length; i++) {
        var rubbish = rubbishAll[i];
        rubbish.y += dropRate; //set falling speed
        ctx.beginPath();
        ctx.rect(rubbish.x, rubbish.y, 10, 8);
        ctx.closePath();


      // var rubbishImg = new pic(20,20);

      // if (Math.random() < 0.20) {
      //     rubbishImg.src = "assets/obj-can-red.jpg";
      // } else if (Math.random() < 0.40){
      //     rubbishImg.src = "assets/obj-can-red.jpg";
      // } else if (Math.random() < 0.60) {
      //     rubbishImg.src = "assets/obj-can-red.jpg";
      // } else if (Math.random() < 0.80) {
      //     rubbishImg.src = "assets/obj-sandwich.png";
      // } else if (Math.random() < 1.00) {
      //     rubbishImg.src = "assets/obj-sandwich.png";
      // }

      // rubbishImg.onload = function() {
      //   ctx.pic(rubbishImg, 10, 8);
      // };


        ctx.fillStyle = rubbish.pic;
        ctx.fill();
    }

}


});
// End doc ready function