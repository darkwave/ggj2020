const Game = {
  entities: [],
  addEntity: function(e) {},
  run: function() {},
  render: function() {
    entities.forEach(e => {});
  }
};

document.addEventListener('DOMContentLoaded', function() {

  var lastTimestamp = 0;

  var movement = null;
  var island = document.querySelector('#background');
  var playerElement = document.querySelector('#player');

  var playerLayer = document.querySelector('#player_layer');


  var move = function(direction) {

    var islandBoundingBox = island.getBoundingClientRect();
    var playerBoundingBox = playerElement.getBoundingClientRect();
    var increment = direction == 'bottom' || direction == 'right' ? -1 : 1;
    var axis = direction == 'top' || direction == 'bottom' ? 'y' : 'x';
    var styleDirection =
      direction == 'left' || direction == 'right' ? 'left' : 'top';
    island.style[styleDirection] =
      islandBoundingBox[axis] + 16 * increment + 'px';


    var objs = document.querySelectorAll('.objs');
    objs.forEach((obj) => {
      objPos = obj.getBoundingClientRect();

      if (
        Math.abs(playerBoundingBox.x - objPos.x) <= 64 &&
        Math.abs(playerBoundingBox.y - objPos.y) <= 64
      ) {
        if (obj.style.display == 'none') {

        } else if (obj.dataset.type == 'food') {
          addLife();
          obj.style.display = 'none';
        } else if (obj.dataset.type == 'tool') {
          addToInvetory(obj);
          obj.style.display = 'none';
        }
      } else {
        //obj.style.backgroundColor = '';
      }
    });

  };
  var dailyCounter = 10;
  var lastDayTime = 0;
  var isDay = true;

  function step(timestamp) {
    if (timestamp - lastTimestamp > 50) {
      lastTimestamp = timestamp;
      //console.log('time...')
      if (movement) {
        move(movement);
        //console.log(movement)
      }
    }
    if (timestamp - lastDayTime > 1000) {
      lastDayTime = timestamp;
      if (dailyCounter > 0) dailyCounter--;
      else {
        dailyCounter = 10;
        isDay = !isDay;
        changeDaylight(isDay);
      };
      console.log(dailyCounter);
    }

    window.requestAnimationFrame(step);

  }

  window.requestAnimationFrame(step);
  document.querySelector('#down').addEventListener('mousedown', () => {
    //move('bottom');
    movement = 'bottom';
  });

  window.addEventListener('mouseup', () => {
    //move('bottom');
    movement = null;
  });

  document.querySelector('#up').addEventListener('mousedown', () => {
    movement = 'top';
  });

  document.querySelector('#left').addEventListener('mousedown', () => {
    movement = 'left';
  });

  document.querySelector('#right').addEventListener('mousedown', () => {
    movement = 'right';
  });


  window.addEventListener('keyup', function(event) {
    movement = null;
  })

  window.addEventListener('keydown', function(event) {
    if (event.keyCode == 38) {
      movement = 'top';
    } else if (event.keyCode == 40) {
      movement = 'bottom';
    } else if (event.keyCode == 39) {
      movement = 'right';
    } else if (event.keyCode == 37) {
      movement = 'left';
    }
  });


  var addToInvetory = function(element) {
    var newInventoryElement = element.children[0].cloneNode(true);

    document.querySelector('#inventory').appendChild(newInventoryElement)
  }

  function addLife() {
    var life = document.getElementById('life');
    var selectTool = document.getElementsByClassName('count')[0];
    var numLife = life.childNodes;

    var newLife = document.createElement('span');
    if (numLife.length <= 6) {
      newLife.setAttribute('class', 'lifeBar R ');
    } else if (numLife.length > 6 && numLife.length < 12) {
      newLife.setAttribute('class', 'lifeBar LG ');
    } else {
      newLife.setAttribute('class', 'lifeBar G ');
    }

    if (life.children.length < 15) life.appendChild(newLife);
  }

  const changeDaylight = (dayLight) => {
    if (dayLight) document.querySelector('#controller').style.backdropFilter = "brightness(1)";
    else document.querySelector('#controller').style.backdropFilter = "brightness(.3)";
  }
})