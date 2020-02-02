var lastTimestamp = 0;
var movement = null;
var level = null;
var playerElement = null;
var lastDayNightTransitionDelay = 60000;
var movementDelay = 50;
var lifeBarDelay = 10000;
const MAIN_MENU = -1;
const GAME_START = 0;
const GAME_RUNNING = 1;
const GAME_OVER = 2;
const GAME_WIN = 3;

var state = MAIN_MENU;

var pickFood = function(obj) {
  obj.style.display = 'none';

  var lifebarElement = document.querySelector('#life');
  var newLife = document.createElement("span");
  if (lifebarElement.children.length < 15) lifebarElement.appendChild(newLife);
}

var pickTool = function(obj) {
  obj.style.display = 'none';

  var inventoryElement = document.querySelector('#inventory');
  var newInventoryElement = obj.children[0].cloneNode(true);
  inventoryElement.appendChild(newInventoryElement);

  if (document.querySelectorAll(".tool").length == inventoryElement.children.length)
    changeState(GAME_WIN);
}

var die = function() {
  changeState(GAME_OVER);
}

var removeLife = function() {

  var lifebarElement = document.querySelector('#life');
  if (lifebarElement.children.length > 0) {
    lifebarElement.children[lifebarElement.children.length - 1].remove();
  } else {
    die();
  }
}

var changeState = function(newState) {
  if (newState == MAIN_MENU) {
    document.querySelector('#main-menu').style.display = 'block';
  } else
  if (newState == GAME_START) {
    document.querySelector('#main-menu').style.display = 'none';
    document.querySelector('#gameover-screen').style.display = 'none';
    document.querySelector('#win-screen').style.display = 'none';

    level.style = '';
    var objects = document.querySelectorAll('.objs');
    objects.forEach(obj => {
      obj.style.display = 'block';
      if (obj.dataset.coords) {
        obj.style = obj.dataset.coords;
      }
    });
    // Reset inventory
    var inventoryElement = document.querySelector('#inventory');
    inventoryElement.innerHTML = '';

    var lifebarElement = document.querySelector('#life');
    lifebarElement.innerHTML = '';
    for (let i = 0; i < 3; i++)
      lifebarElement.appendChild(document.createElement("span"));

    newState = GAME_RUNNING;

  } else if (newState == GAME_OVER) {
    document.querySelector('#gameover-screen').style.display = 'flex';
  } else if (newState == GAME_WIN) {
    document.querySelector('#win-screen').style.display = 'flex';
  }

  state = newState;
  console.log(state);
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
  var lastLifeTimestamp = 0;
  var lastDayNightTransitionTimestamp = 0;

  function step(timestamp) {

    if (state != GAME_RUNNING) {
      window.requestAnimationFrame(step);
      return;
    }

    if (timestamp - lastDayNightTransitionTimestamp > lastDayNightTransitionDelay) {
      lastDayNightTransitionTimestamp = timestamp;
      level.classList.toggle('night');
      player.classList.toggle('night');
    }

    if (timestamp - lastLifeTimestamp > lifeBarDelay) {
      lastLifeTimestamp = timestamp;
      removeLife();
    }

    if (timestamp - lastTimestamp > movementDelay) {
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