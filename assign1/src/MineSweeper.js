const MAX_SIZE = 10;
                         
//Venkat: const UNEXPOSED = "UNEXPOSED";
const EXPOSED = "EXPOSED";
const SEALED = "SEALED";
const MINED = "MINED"; //Venkat: Please remove
const ADJACENT_CELL = "ADJACENT_CELL"; //Venkat: Please remove

Object.defineProperty(Array.prototype, "contains", { //Venkat: Please remove
	configurable: true,
	writable: true,
	value: function contains(x) {
		return this.indexOf(x) !== -1;
	}
});

var MineSweeper = function(){
	this.height = MAX_SIZE;
	this.width = MAX_SIZE;

	var CellState = []; //Venkat: Please remove
	
	//Venkat: keep a separate boolean array to tell if a cell is mined or not.
	//We do not have to store adjacent or not since it can be computed based on mined or not for neighbors

	this.Grid = new Array();   //Venkat: grid instead of Grid
	for (var i = 0; i < this.width; i++) {
			var column = new Array();
			this.Grid.push(column)

  		for (var j = 0; j < this.width; j++){
	  		column.push(CellState); //Venkat: pushing an array complicates things. Create a 2-D array and store the string in each cell instead of an array of strings. Then we do not need include or contains. A simple == will be enough
		  }
	}
	
	//Venkat: How about?
  // this.cellStatus = new Array(MAX_SIZE);
  // this.mines = new Array(MAX_SIZE);
  // for(var i = 0; i < MAX_SIZE; i++) { 
  //   this.cellStatus[i] = new Array(MAX_SIZE);
  //   this.mines = new Array(MAX_SIZE);
  //   for(var j = 0; j < MAX_SIZE; j++) {
  //     this.cellStatus[i][j] = UNEXPOSED;
  //     this.mines[i][j] = false;
  //   }
  // }
};

MineSweeper.prototype.checkBounds = function(row, column){
  if (row>=this.height || row<0)
   throw new Error('Out of row range');
  if(column>=this.width || column<0)
   throw new Error('Out of column range');

  // if (row < 0 || row >= this.height || column < 0 || column  >= this.width)
  //  throw new Error('Out of row/column range');
};

MineSweeper.prototype.exposeCell = function(row, column){
	this.checkBounds(row,column);

	if (this.Grid[row][column].length == 0){ //Venkat: if UNEXPOSED
		this.Grid[row][column] = [EXPOSED];
		this.exposeNeighborsOf(row, column);
	}
	
};

MineSweeper.prototype.cellState = function(row, column){
	return this.Grid[row][column];
};

MineSweeper.prototype.exposeNeighborsOf = function(row, column){

	if(this.Grid[row][column].contains(MINED)) return;  //Venkat: this has to go into exposeCell
	if(this.Grid[row][column].contains(ADJACENT_CELL)) return; //Venkat: this has to go into exposeCell

	var adjCells = [[-1, -1],[-1, 0], [-1, 1],[0, -1], [0, 1],[1, -1],[1, 0], [1, 1]];
	for (var i=0;i<adjCells.length;i++){
		var x = adjCells[i][0] + row;
		var y = adjCells[i][1] + column;
		if (x >= 0 && y >= 0 && x <= this.height-1 && y <= this.width-1){
			this.exposeCell(x, y);
		}
	} 
	
	//Venkat: how about?
	//for(var i = row - 1; i <= row + 1; i++) {
	//  for(var j = column - 1; j <= column + 1; j++) {
	//  if(j >= 0...)
	//}
	//}
};

MineSweeper.prototype.toggleCell = function(row, column){
	this.checkBounds(row,column);
	if(this.Grid[row][column].length == 0) //Venkat: if UNEXPOSED
		this.Grid[row][column] = [SEALED]; //Venkat: SEALED instead of [SEALED]
	else if(this.Grid[row][column].contains(SEALED)) //Venkat: == SEALED
		this.Grid[row][column] = [];
};

MineSweeper.prototype.setAdjacentCell = function(row, column){ //Venkat: Please remove
	this.checkBounds(row,column);

	if(!this.Grid[row][column].contains(MINED))
		this.Grid[row][column] = [ADJACENT_CELL];
};

MineSweeper.prototype.setMine = function(row, column){
	this.checkBounds(row,column);

	this.Grid[row][column] = [MINED]; //Venkat: this.mines[row][column] = true;
                                                                             
//Venkat: Please remove rest of this function body
	var adjCells = [[-1, -1],[-1, 0], [-1, 1],[0, -1],[0, 1],[1, -1],[1, 0],[1, 1]];

	for(var i=0; i < adjCells.length; i++) {

		var x = adjCells[i][0] + row;
		var y = adjCells[i][1] + column;
		if (x >= 0 && y >= 0 && x <= this.height-1 && y <= this.width-1){
			this.setAdjacentCell(x, y);
		}
	}
};