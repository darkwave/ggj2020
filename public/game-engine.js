const Game = {
  entities: [],
  addEntity: function(e) {},
  run: function() {},
  render: function() {
    entities.forEach(e => {});
  }
};

document.addEventListener("DOMContentLoaded", function() {
  var island = document.querySelector("#background");
  var playerElement = document.querySelector("#player");

  var playerLayer = document.querySelector("#player_layer");

  var screenCenterX = playerLayer.getBoundingClientRect().width / 2;
  var screenCenterY = playerLayer.getBoundingClientRect().height / 2;
  var move = function(direction) {
    var islandBoundingBox = island.getBoundingClientRect();
    var playerBoundingBox = playerElement.getBoundingClientRect();
    var increment = direction == "bottom" || direction == "right" ? -1 : 1;
    var axis = direction == "top" || direction == "bottom" ? "y" : "x";
    var styleDirection =
      direction == "left" || direction == "right" ? "left" : "top";
    island.style[styleDirection] =
      islandBoundingBox[axis] + 16 * increment + "px";

    var objs = document.querySelectorAll(".objs");
    objs.forEach((obj, index) => {
      objPos = obj.getBoundingClientRect();
      console.log(
        `object ${index}: ${objPos.x} ${objPos.y}
         playerX: ${
          playerBoundingBox.x
        } playerY : ${playerBoundingBox.y}`
      );
      if (
        Math.abs(playerBoundingBox.x - objPos.x) <= 32 &&
        Math.abs(playerBoundingBox.y - objPos.y) <= 32
      ) {
        obj.style.backgroundColor = "red";
      } else {
        obj.style.backgroundColor = "";
      }
    });

    //console.log(document.querySelector('#obj').getBoundingClientRect());
  };
  document.querySelector("#down").addEventListener("click", () => {
    move("bottom");
  });

  document.querySelector("#up").addEventListener("click", () => {
    move("top");
  });

  document.querySelector("#left").addEventListener("click", () => {
    move("left");
  });

  document.querySelector("#right").addEventListener("click", () => {
    move("right");
  });

  document.addEventListener("keyup", function(event) {
    if (event.keyCode == 38) {
      move("top");
    } else if (event.keyCode == 40) {
      move("bottom");
    } else if (event.keyCode == 39) {
      move("right");
    } else if (event.keyCode == 37) {
      move("left");
    }
  });
});