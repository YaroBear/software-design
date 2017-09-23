const MAX_SIZE = 10;

const EXPOSED = "EXPOSED";
const SEALED = "SEALED";
const MINED = "MINED";
const ADJACENT_CELL = "ADJACENT_CELL";

Object.defineProperty(Array.prototype, "contains", {
	configurable: true,
	writable: true,
	value: function contains(x) {
		return this.indexOf(x) !== -1;
	}
});


// Array.includes() works in a regular javascript environment but not in node
// Had to define a contains function that accomplished the same task

var MineSweeper = function(){
	this.height = MAX_SIZE;
	this.width = MAX_SIZE;

	var CellState = [];

	this.Grid = new Array();
	for (var i = 0; i < this.width; i++) {
			var column = new Array();
			this.Grid.push(column)
		for (var j = 0; j < this.width; j++){
			column.push(CellState);
		}
	}
};

MineSweeper.prototype.checkBounds = function(row, column){
	if (row>=this.height || row<0)
		throw new Error('Out of row range');
	if(column>=this.width || column<0)
		throw new Error('Out of column range');
};

MineSweeper.prototype.exposeCell = function(row, column){
	this.checkBounds(row,column);

	if (this.Grid[row][column].length == 0){
		this.Grid[row][column] = [EXPOSED];
		this.exposeNeighborsOf(row, column);
	}
	
};

MineSweeper.prototype.cellState = function(row, column){
	return this.Grid[row][column];
};

MineSweeper.prototype.exposeNeighborsOf = function(row, column){
	var adjCells = [[-1, -1],[-1, 0], [-1, 1],[0, -1],[0, 1],[1, -1],[1, 0],[1, 1]];
	for (var i=0;i<adjCells.length;i++){
		var x = adjCells[i][0] + row;
		var y = adjCells[i][1] + column;
		if (x >= 0 && y >= 0 && x <= this.height-1 && y <= this.width-1){
			this.exposeCell(x, y);
		}
	}
};

MineSweeper.prototype.toggleCell = function(row, column){
	this.checkBounds(row,column);
	if(this.Grid[row][column].length == 0)
		this.Grid[row][column] = [SEALED];
	else if(this.Grid[row][column].contains(SEALED))
		this.Grid[row][column] = [];
};

MineSweeper.prototype.setAdjacentCell = function(row, column){
	this.checkBounds(row,column);

	if(!this.Grid[row][column].contains(MINED))
		this.Grid[row][column] = [ADJACENT_CELL];
};

MineSweeper.prototype.setMine = function(row, column){
	this.checkBounds(row,column);

	this.Grid[row][column] = [MINED];

	var adjCells = [[-1, -1],[-1, 0], [-1, 1],[0, -1],[0, 1],[1, -1],[1, 0],[1, 1]];

	for(var i=0; i < adjCells.length; i++) {

		var x = adjCells[i][0] + row;
		var y = adjCells[i][1] + column;
		if (x >= 0 && y >= 0 && x <= this.height-1 && y <= this.width-1){
			this.setAdjacentCell(x, y);
		}
	}
};