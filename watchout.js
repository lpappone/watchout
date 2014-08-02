// start slingin' some d3 here.

var creatures = [];
for (var i = 0; i < 50; i++) {
  creatures[i] = {'cx': Math.random()*700, 'cy': Math.random()*450, 'radius': 10, 'color': 'green'};
}

var gameBoard = d3.select('body').append('svg').attr('width', 700)
    .attr('height', 450).style('background-color', 'blue')
    .classed('gameboard', true);

var enemies = gameBoard.selectAll('circle') 
  .data(creatures)
  .enter()
  .append('circle')
  .attr('class', 'enemies')
  .attr("cx", function (d) { return d.cx; })
  .attr("cy", function (d) { return d.cy; })
  .attr("r", function (d) { return d.radius; })
  .style("fill", function (d) { return d.color; });



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
    console.log('x is', x)
    player.attr('cx', x + d3.event.dx);
    player.attr('cy', y + d3.event.dy);

    console.log('dragging', d3.event.dx, d3.event.dy);
  });

player.call(dragger);

var gameTurn = function() {
  enemies.transition()
  .attr("cx", function() {return Math.random()*700})
  .attr("cy", function() {return Math.random()*450})
  .duration(500)
};

var movePlayer = function(dx, dy) {

}

setInterval(gameTurn, 1000);




