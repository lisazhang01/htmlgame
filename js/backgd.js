  var Background = function (opt, level) {
    var height    = opt.height;
    var width     = opt.width;
    var x         = opt.x;
    var y         = opt.y;
    var gameLevel = opt.gameLevel;
    var backGdImg = new Image();

    if (gameLevel == 1) {
      backGdImg.src = "assets/bg-polluted-city.jpg";
    } else if (gameLevel == 2) {
      backGdImg.src = "assets/bg-polluted-city2.png";
    } else if (gameLevel == 3) {
      backGdImg.src = "assets/bg-green-park.png";
    }

    this.render = function (ctx) {
      ctx.drawImage(backGdImg, x, y, width, height);
    };
};