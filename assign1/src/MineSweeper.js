
var MineSweeper = function(){
	this.Cell = {EXPOSED : false};
};

MineSweeper.prototype.exposeCell = function(row, column){
	this.Cell.EXPOSED = true;
};

MineSweeper.prototype.isCellExposed = function(row, column){
	return this.Cell.EXPOSED;
};