document.addEventListener("DOMContentLoaded", function(event) {

  var state = ''; // "lodaing" | "menu" | "playing" | "finish"
    if (state == 'playing') {
      hide(menu);
    } else if (state == 'finish') {
      show(menu);
    }

  // Menu page
  var menu = document.getElementById('menu');

  function hide(el) {
    el.style.display = 'hide';
  }
  function show(el) {
    el.style.display = 'block';
  }
  // function mainMenu () {
    show(menu);
  // }

  menu.addEventListener('click', function() {
    hide(menu); //hides menu when click detected
    var game = new Game({canvas: document.getElementById('canvas')});
    game.start();
  });

});










