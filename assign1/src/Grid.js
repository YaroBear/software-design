// var Cell = require('../src/Cell.js');

var Grid = function(w, h, numberMines){
	this.width = w;
	this.height = h;
	this.numberMines = numberMines;
	this.grid = [];

	for(var i=0; i < this.width*this.height; i++) {
		this.grid.push(new Cell());
	}
};

Grid.prototype.distributeMines = function(){
	for(var i = 0; i < this.numberMines; i++) {
		var randPos = Math.floor(Math.random() * this.width*this.height) + 1;
		this.grid[randPos] = new MinedCell();
	}
};

//module.exports = Grid;