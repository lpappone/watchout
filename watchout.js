// start slingin' some d3 here.

var mode = {
  easy: {speed: 2000, numCreatures: 5},
  normal: {speed: 1500, numCreatures: 15},
  hard: {speed: 2000, numCreatures: 25}
};

var enemies;
var level;
var interval;
var hits = 0;

function createCreatures(num) {
  var creatures = [];
  for (var i = 0; i <= num; i++) {
    creatures[i] = {'cx': Math.random()*700, 'cy': Math.random()*450, 'radius': 10, 'color': 'green'};
  }
  return creatures;
};

var gameBoard = d3.select('body').append('svg').attr('width', 700)
    .attr('height', 450).style('background-color', 'blue')
    .classed('gameboard', true);

var player = d3.select('.gameboard')
  .append('circle')
  .classed('player', true)
  .attr('cx', 350)
  .attr('cy', 225)
  .attr('r', 10)

var dragger = d3.behavior.drag()
  .on('drag', function() {
    var x = parseInt(player.attr('cx'), 10);
    var y = parseInt(player.attr('cy'), 10);
    player.attr('cx', x + d3.event.dx);
    player.attr('cy', y + d3.event.dy);
  });

player.call(dragger);

var start = function() {
  $('.start').attr('disabled', true);
  if (interval) {
    clearInterval(interval);
  }
  var creatures = createCreatures(mode[level]['numCreatures']);
  enemies = gameBoard.selectAll('circle') 
    .data(creatures)
    .enter()
    .append('circle')
    .attr('class', 'enemies')
    .attr("cx", function (d) { return d.cx; })
    .attr("cy", function (d) { return d.cy; })
    .attr("r", function (d) { return d.radius; })
    .style("fill", function (d) { return d.color; });
  interval = setInterval(gameTurn, mode[level]['speed'])
};

var gameTurn = function() {
  enemies.transition()
    .attr("cx", function() {return Math.random()*700})
    .attr("cy", function() {return Math.random()*450})
    .duration(mode[level]['speed'])
    .tween('custom', function() { 
      var isHit = false;
      return function(t) {
        if (t === 1) {
          isHit = false;
        }
        var enemy = d3.select(this);
        var xDiff = enemy.attr('cx') - player.attr('cx');
        var yDiff = enemy.attr('cy') - player.attr('cy');
        var radiusSum = parseFloat(enemy.attr('r')) + parseFloat(player.attr('r'));
        var distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
        if (distance < radiusSum && !isHit) {
          hits++;
          isHit = true;
          $('.collisions span').text(hits);
        }

      }
    })
};

// var scoreCount = function() {
//   // console.log('called scorecount')
//   // debugger
//   hits = $('.player').collision('.enemies');
//   console.log(hits)
//   if (hits.length) debugger;
//   console.log('hits', hits.length)
//   var hitsnumber = parseInt($('.collisions span').text()) + hits.length;
//   $('.collisions span').text(hitsnumber);
// }

$('.start').on('click', function () {
  level = $('input[name=level]:checked').val();
  start();
});

$('.stop').on('click', function() {
  console.log('stop');
  gameBoard.selectAll('.enemies').transition().attr('opacity', 0).duration(500).remove();
  $('.start').attr('disabled', false);
  if (interval) {
    clearInterval(interval);
  }
});



