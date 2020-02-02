var lastTimestamp = 0;
var movement = null;
var level = null;
var playerElement = null;
const MAIN_MENU = -1;
const GAME_START = 0;
const GAME_RUNNING = 1;
const GAME_OVER = 2;
const GAME_WIN = 3;

var state = MAIN_MENU;

var pickFood = function(obj) {
  obj.style.display = 'none';
}

var pickTool = function(obj) {
  obj.style.display = 'none';
}

var die = function() {
  changeState(GAME_OVER);
}


var changeState = function(newState) {
  if (newState == MAIN_MENU) {
    document.querySelector('#main-menu').style.display = 'block';
  } else
  if (newState == GAME_START) {
    document.querySelector('#main-menu').style.display = 'none';
    document.querySelector('#gameover-screen').style.display = 'none';
    document.querySelector('#win-screen').style.display = 'none';
    //TODO reset the level objects
    level.style = '';
    var objects = document.querySelectorAll('.objs');
    objects.forEach(obj => {
      obj.style.display = 'block';
      if (obj.dataset.coords) {
        obj.style = obj.dataset.coords;
      }
    });


  } else if (newState == GAME_OVER) {
    document.querySelector('#gameover-screen').style.display = 'flex';
  } else if (newState == GAME_WIN) {
    document.querySelector('#win-screen').style.display = 'block';
  }

  state = newState;

}

document.addEventListener("DOMContentLoaded", function() {
  level = document.querySelector('#background');
  playerElement = document.querySelector('#player');

  var move = function(direction) {
    var levelBoundingBox = level.getBoundingClientRect();
    var playerBoundingBox = playerElement.getBoundingClientRect();
    var increment = direction == "bottom" || direction == "right" ? -1 : 1;
    var axis = direction == "top" || direction == "bottom" ? "y" : "x";
    var styleDirection =
      direction == "left" || direction == "right" ? "left" : "top";
    level.style[styleDirection] =
      levelBoundingBox[axis] + 16 * increment + "px";

    var objs = document.querySelectorAll(".objs");
    objs.forEach(obj => {
      objPos = obj.getBoundingClientRect();
      var collisionCallback = obj.getAttribute('oncollision');
      if (
        collisionCallback &&
        Math.abs(playerBoundingBox.x - objPos.x) <= 64 &&
        Math.abs(playerBoundingBox.y - objPos.y) <= 64
      ) {

        window[collisionCallback](obj);
      }
    });
  };

  function step(timestamp) {
    if (timestamp - lastTimestamp > 50) {
      lastTimestamp = timestamp;
      if (movement) {
        move(movement);
      }
    }
    window.requestAnimationFrame(step);
  }

  window.requestAnimationFrame(step);


  // EVENTS HANDLING
  document.querySelector("#down").addEventListener("mousedown", () => {
    //move('bottom');
    movement = "bottom";
  });

  window.addEventListener("mouseup", () => {
    //move('bottom');
    movement = null;
  });

  document.querySelector("#up").addEventListener("mousedown", () => {
    movement = "top";
  });

  document.querySelector("#left").addEventListener("mousedown", () => {
    movement = "left";
  });

  document.querySelector("#right").addEventListener("mousedown", () => {
    movement = "right";
  });

  window.addEventListener("keyup", function(event) {
    movement = null;
  });

  window.addEventListener("keydown", function(event) {
    if (event.keyCode == 38) {
      movement = "top";
    } else if (event.keyCode == 40) {
      movement = "bottom";
    } else if (event.keyCode == 39) {
      movement = "right";
    } else if (event.keyCode == 37) {
      movement = "left";
    }
  });
});