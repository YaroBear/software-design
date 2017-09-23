const MAX_SIZE = 10;

var MineSweeper = function(){
	this.height = MAX_SIZE;
	this.width = MAX_SIZE;

	var CellState = { EXPOSED : false , SEALED : false}; //Venkat: we don't need both. A cell is either exposed or sealed. We can come up with constants like UNEXPOSED, EXPOSED, SEALED, and use an array to store those values for each cell position

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

	if (!this.Grid[row][column].EXPOSED && !this.Grid[row][column].SEALED){
		this.Grid[row][column].EXPOSED = true;
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
	if(!this.Grid[row][column].SEALED && !this.Grid[row][column].EXPOSED)
		this.Grid[row][column].SEALED = true;
	else if(this.Grid[row][column].SEALED)
		this.Grid[row][column].SEALED = false;
};
