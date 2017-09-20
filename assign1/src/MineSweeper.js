var MineSweeper = function(w,h){
	this.height = w;
	this.width = h;

	this.Grid = new Array();
	for (var i = 0; i < this.width; i++) {
			var column = new Array();
			this.Grid.push(column)
		for (var j = 0; j < this.width; j++)
			column.push({exposed : false});
	}
};

MineSweeper.prototype.exposeCell = function(row, column){
	if (row>=this.height)
		throw new Error('Out of row range');
	if(column>=this.width)
		throw new Error('Out of column range');
	this.Grid[row][column].exposed = true;
};

MineSweeper.prototype.isCellExposed = function(row, column){
	return this.Grid[row][column].exposed;
};

MineSweeper.prototype.exposeNeighborCells = function(row, column){
	this.exposeCell(row - 1, column -1);
	this.exposeCell(row - 1, column);
	this.exposeCell(row - 1, column + 1);
	this.exposeCell(row, column - 1);
	this.exposeCell(row, column + 1);
	this.exposeCell(row + 1, column - 1);
	this.exposeCell(row + 1, column);
	this.exposeCell(row + 1, column + 1);
};