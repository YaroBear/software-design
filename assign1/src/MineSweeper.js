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
	if (row>=this.height || row<0)
		throw new Error('Out of row range');
	if(column>=this.width || column<0)
		throw new Error('Out of column range');
	this.Grid[row][column].exposed = true;
};

MineSweeper.prototype.isCellExposed = function(row, column){
	return this.Grid[row][column].exposed;
};

MineSweeper.prototype.exposeNeighborCells = function(row, column){
	var adjCells = [[-1, -1],[-1, 0], [-1, 1],[0, -1],[0, 1],[1, -1],[1, 0],[1, 1]];

	var skipped = 0;

	for(var i = 0; i < adjCells.length; i++) {
		try {
			this.exposeCell(row + adjCells[i][0], column + adjCells[i][1]);
		} catch(error) {
			console.log("Skipping to next neighbor");
			skipped += 1;
		}
	}
	return skipped;
};