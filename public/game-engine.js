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

  var move = function(direction) {
    var boundingBox = playerElement.getBoundingClientRect();
    var increment = (direction == 'bottom' || direction == 'right') ? -1 : 1;
    var axis = (direction == 'top' || direction == 'bottom') ? 'y' : 'x';
    var styleDirection = direction == 'left' || direction == 'right' ? 'left' : 'top';
    playerElement.style[styleDirection] = (boundingBox[axis] + (50 * increment)) + 'px';

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

})