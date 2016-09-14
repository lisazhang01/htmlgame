document.addEventListener("DOMContentLoaded", function(event) {

  // var state = ''; // "lodaing" | "menu" | "playing" | "finish"
  //   if (state == 'playing') {
  //     hide(menu);
  //   } else if (state == 'finish') {
  //     show(menu);
  //   }

  // Menu page
  var menu = document.getElementById('menu');

  var hide = function (el) {
    el.style.display = 'none';
  };

  var show = function (el) {
    el.style.display = 'block';
  };

  menu.addEventListener('click', function() {
    hide(menu); //hides menu when click detected
    var game = new Game({canvas: document.getElementById('canvas')});
    game.start();
  })

});





