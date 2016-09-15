document.addEventListener("DOMContentLoaded", function(event) {
  // Menu page
  var menu = document.getElementById('menu');
  //Hide menu function
  var hide = function (el) {
    el.style.display = 'none';
  };

  // var show = function (el) {
  //   el.style.display = 'block';
  // };

  menu.addEventListener('click', function() {
    hide(menu); //hides menu when click detected
    var game = new Game({canvas: document.getElementById('canvas')});
    game.start();
  })

});





