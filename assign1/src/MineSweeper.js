var MineSweeper = function(){
	this.height = 5;
	this.width = 5;
};

MineSweeper.prototype.exposeCell = function(row, column){
	if (row>=this.height)
		throw new Error('Out of row range');
	if(column>=this.width)
		throw new Error('Out of column range');
	return 'exposed';
};

MineSweeper.prototype.isCellExposed = function(row, column){
	return true;
};