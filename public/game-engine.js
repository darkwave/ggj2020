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
  var dailyCounter = 50;
  var lastDayTime = 0;
  var isDay = true;

  var movement = null;
  var island = document.querySelector('#background');
  var playerElement = document.querySelector('#player');

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
    objs.forEach(obj => {
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
        } else if (obj.dataset.type == 'enemy') {
          alert('You lost one live ...');
          obj.style.display = 'none';
        }
      } else {
        //obj.style.backgroundColor = '';
      }
    });
  };

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
        dailyCounter = 50;
        isDay = !isDay;
        changeDaylight(isDay);
      }
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
  });

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

  var countDown = document.getElementById('count');

  var countDownLife = setInterval(function count() {
    countDown.innerHTML -= 1;
    reduceLife();
    if (countDown.innerHTML == 0) {
      clearInterval(countDownLife);
      window.stop();
    }
  }, 5000);

  var addToInvetory = function(element) {
    var newInventoryElement = element.children[0].cloneNode(true);
    newInventoryElement.style.width = '30px';
    newInventoryElement.style.border = '.5px solid gray';

    document.querySelector('#inventory').appendChild(newInventoryElement);
  };
  var life = document.getElementById('life');
  var message = document.querySelector('#message');
  var numLife = life.childNodes;

  function addLife() {
    var newLife = document.createElement('span');
    console.log(numLife);
    if (numLife.length <= 6) {
      newLife.setAttribute('class', 'lifeBar R ');
      newLife.style.marginLeft = '2px';
      var countDown = document.getElementById('count');
      countDown.innerHTML = +countDown.innerHTML + 1;
    } else {
      newLife.setAttribute('class', 'lifeBar LG ');
      newLife.style.marginLeft = '2px';
      message.style.display = 'none';
      var countDown = document.getElementById('count');
      countDown.innerHTML = +countDown.innerHTML + 1;
    }

    console.log(life.children);
    if (life.children.length < 15) life.appendChild(newLife);
  }
  function reduceLife() {
    var bars = document.getElementsByClassName('lifeBar');
    var masi = bars[bars.length - 1];
    console.log(bars[bars.length - 1]);
    masi.remove();
  }
});
