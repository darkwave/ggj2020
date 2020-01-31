const Game = {
  entities: [],
  addEntity: function(e) {

  },
  run: function() {

  },
  render: function() {
    entities.forEach(e => {

    })
  }

}


document.addEventListener("DOMContentLoaded", function() {
  var playerElement = document.querySelector('#background');

  var playerLayer = document.querySelector('#player_layer');

  var playerX = playerLayer.getBoundingClientRect().width / 2;
  var playerY = playerLayer.getBoundingClientRect().height / 2;
  var move = function(direction) {
    var boundingBox = playerElement.getBoundingClientRect();
    var increment = (direction == 'bottom' || direction == 'right') ? -1 : 1;
    var axis = (direction == 'top' || direction == 'bottom') ? 'y' : 'x';
    var styleDirection = direction == 'left' || direction == 'right' ? 'left' : 'top';
    playerElement.style[styleDirection] = (boundingBox[axis] + (64 * increment)) + 'px';

    var objs = document.querySelectorAll('.objs');
    objs.forEach(obj => {
      objPos = obj.getBoundingClientRect()
      if (Math.abs(playerX - objPos.x) < 32 && Math.abs(playerY - objPos.y) < 32) {
        obj.style.backgroundColor = 'red'
      } else {
        obj.style.backgroundColor = ''

      }
    })

    //console.log(document.querySelector('#obj').getBoundingClientRect());

  }
  document.querySelector('#down').addEventListener('click', () => {
    move('bottom')
  })

  document.querySelector('#up').addEventListener('click', () => {
    move('top')
  })

  document.querySelector('#left').addEventListener('click', () => {
    move('left')
  })

  document.querySelector('#right').addEventListener('click', () => {
    move('right')
  })

  document.addEventListener('keyup', function(event) {
    if (event.keyCode == 38) {
      move('top');
    } else if (event.keyCode == 40) {
      move('bottom');
    } else if (event.keyCode == 39) {
      move('right');
    } else if (event.keyCode == 37) {
      move('left');
    }
  })

})