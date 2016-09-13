var Controller = function () {
  var that = this; // links eventlisteners to this func

  this.keyRight = false;
  this.keyLeft = false;

  // Key up animation
  document.addEventListener('keyup', function (event) {
    event.preventDefault();

    var keyName = event.key;
    switch(keyName) {
      case "ArrowLeft":
        that.keyLeft = false;
        break;
      case "ArrowRight":
        that.keyRight = false;
        break;
      default:
        break;
    }
  });

  // Key Down animation
  document.addEventListener('keydown', function(event){
    event.preventDefault();

    var keyName = event.key;
    switch(keyName) {
      case "ArrowLeft":
          that.keyLeft = true;
          break;
      case "ArrowRight":
          that.keyRight = true;
          break;
      default:
          break;
    }
  });
};
