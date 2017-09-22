const MAX_SIZE = 10;

var MineSweeper = function(){
	this.height = MAX_SIZE;
	this.width = MAX_SIZE;

	this.Grid = new Array();
	for (var i = 0; i < this.width; i++) {
			var column = new Array();
			this.Grid.push(column)
		for (var j = 0; j < this.width; j++)
			column.push({exposed : false});
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

	if (!this.Grid[row][column].exposed){
		this.Grid[row][column].exposed = true;
		this.exposeNeighborsOf(row, column);
	}
	
};

MineSweeper.prototype.isCellExposed = function(row, column){
	return this.Grid[row][column].exposed;
};

MineSweeper.prototype.exposeNeighborsOf = function(row, column){
	var adjCells = [[-1, -1],[-1, 0], [-1, 1],[0, -1],[0, 1],[1, -1],[1, 0],[1, 1]];
	var neighbors = [];
	for (var i=0;i<adjCells.length;i++){
		var x = adjCells[i][0] + row;
		var y = adjCells[i][1] + column;
		if (x >= 0 && y >= 0 && x <= this.height-1 && y <= this.width-1){
			neighbors.push([x, y]);
			this.exposeCell(x, y);
		}
	}
	//return neighbors;
};

MineSweeper.prototype.sealCell = function(row, column) {
	this.checkBounds(row,column);

	if(!this.Grid[row][column].exposed)
		return true;

	else return false;
};

MineSweeper.prototype.unsealCell = function(row, column) {
	this.checkBounds(row,column);

	return true;
};