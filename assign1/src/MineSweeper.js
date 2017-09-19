
var MineSweeper = function(){

	var Cell = {EXPOSED : false};

};

MineSweeper.prototype.exposeCell = function(row, column){
	Cell.EXPOSED = true;
};

MineSweeper.prototype.isCellExposed = function(row, column){
	return Cell.EXPOSED;
};