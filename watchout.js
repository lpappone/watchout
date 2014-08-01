// start slingin' some d3 here.

var creatures = [];
for (var i = 0; i < 50; i++) {
  creatures[i] = {'cx': Math.random()*700, 'cy': Math.random()*450, 'radius': 10, 'color': 'green'};
}

var gameBoard = d3.select('body').append('svg').attr('width', 700)
    .attr('height', 450).style('background-color', 'blue')
    .classed('gameboard', true);

var enemies = gameBoard.selectAll('circle') // circle
  .data(creatures)
  .enter()
  .append('circle')
  .attr('class', 'enemies')
  .attr("cx", function (d) { return d.cx; })
  .attr("cy", function (d) { return d.cy; })
  .attr("r", function (d) { return d.radius; })
  .style("fill", function (d) { return d.color; });

var gameTurn = function() {
  enemies.transition()
  .attr("cx", function() {return Math.random()*700})
  .attr("cy", function() {return Math.random()*450})
  .duration(1000)
};

setInterval(gameTurn, 2000);




