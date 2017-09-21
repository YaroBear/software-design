var MineSweeper = function(w,h){ //Venkat: no need for w, h to be passed in. Use MAX = 10
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
	if (row>=this.height || row<0)
		throw new Error('Out of row range');
	if(column>=this.width || column<0)
		throw new Error('Out of column range');


	if (this.Grid[row][column].exposed){
		return false;
	}else{
		this.Grid[row][column].exposed = true;

		return this.exposeNeighborsOf(row, column);
	}
	
};

MineSweeper.prototype.isCellExposed = function(row, column){
	return this.Grid[row][column].exposed;
};

MineSweeper.prototype.exposeNeighborsOf = function(row, column){
	var adjCells = [[-1, -1],[-1, 0], [-1, 1],[0, -1],[0, 1],[1, -1],[1, 0],[1, 1]];
	var neighbors = [];
	for (var i=0;i<8;i++){
		var x = adjCells[i][0] + row;
		var y = adjCells[i][1] + column;
		if (x >= 0 && y >= 0 && x <= this.height-1 && y <= this.width-1)
			neighbors.push([x, y]);
	}
	return neighbors;
};

