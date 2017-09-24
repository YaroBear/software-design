const MAX_SIZE = 10;
                         
const UNEXPOSED = "UNEXPOSED";
const EXPOSED = "EXPOSED";
const SEALED = "SEALED";

var MineSweeper = function(){
	this.height = MAX_SIZE;
	this.width = MAX_SIZE;

	this.cellStatus = new Array(MAX_SIZE);
	this.mines = new Array(MAX_SIZE);
	this.cellNumber = new Array(MAX_SIZE);

	for(var i = 0; i < MAX_SIZE; i++) { 
		this.cellStatus[i] = new Array(MAX_SIZE);
		this.mines[i] = new Array(MAX_SIZE);
		this.cellNumber[i] = new Array(MAX_SIZE);

		for(var j = 0; j < MAX_SIZE; j++) {
			this.cellStatus[i][j] = UNEXPOSED;
			this.mines[i][j] = false;
			this.cellNumber[i][j] = 0;
		}
	}
};

MineSweeper.prototype.checkBounds = function(row, column){
	if (row < 0 || row >= this.height || column < 0 || column  >= this.width)
		throw new Error('Out of row/column range');
};

MineSweeper.prototype.exposeCell = function(row, column){
	this.checkBounds(row,column);

	if(this.mines[row][column] == true) return;

	if(this.isAdjacentCell(row, column)) {
		this.cellStatus[row][column] = EXPOSED;
		return;
	}

	if (this.cellStatus[row][column] == UNEXPOSED){
		this.cellStatus[row][column] = EXPOSED;
		this.exposeNeighborsOf(row, column);
	}
};

MineSweeper.prototype.cellState = function(row, column){
	return this.cellStatus[row][column];
};

MineSweeper.prototype.findNeighborsOf = function(row, column){

	var neighbors = [];
	var adjCells = [[-1, -1],[-1, 0], [-1, 1],[0, -1], [0, 1],[1, -1],[1, 0], [1, 1]];
	for (var i=0;i<adjCells.length;i++){
		var x = adjCells[i][0] + row;
		var y = adjCells[i][1] + column;
		if (x >= 0 && y >= 0 && x < this.height && y < this.width){
			neighbors.push({x:x,y:y});
		}
	} 
	return neighbors;

	/* need to figure out how to exclude original calling cell (0,0)
	for(var i = row-1; i <= row + 1; i++) {
		for(var j = column-1; j <= column+1; j++) {
			if (i >= 0 && j >= 0 && i < this.height && j < this.width)
				this.exposeCell(i, j);
		}
	}
	*/
};

MineSweeper.prototype.exposeNeighborsOf = function(row, column){
	var neighbors = this.findNeighborsOf(row,column);

	for(var i = 0; i < neighbors.length; i++)
		this.exposeCell(neighbors[i].x, neighbors[i].y);
};

MineSweeper.prototype.toggleCell = function(row, column){
	this.checkBounds(row,column);

	if(this.cellStatus[row][column] == UNEXPOSED)
		this.cellStatus[row][column] = SEALED;
	else if(this.cellStatus[row][column] == SEALED)
		this.cellStatus[row][column] = UNEXPOSED;
};

MineSweeper.prototype.isAdjacentCell = function(row, column){
	this.checkBounds(row,column);

	var neighbors = this.findNeighborsOf(row, column);

	for (var i=0;i<neighbors.length;i++){
		var x = neighbors[i].x;
		var y = neighbors[i].y;
		if(this.mines[x][y] == true && this.mines[row][column] == false) {
			this.cellNumber[row][column] += 1;
		}
	}
	if(this.cellNumber[row][column] > 0) return true;
	else return false; 
};

MineSweeper.prototype.setMine = function(row, column){
	this.checkBounds(row,column);

	this.mines[row][column] = true;
};