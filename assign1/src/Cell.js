var Cell = function(){
	this.sealed = false;
	this.exposed = false;
	this.mined = false;

};

Cell.prototype.expose = function(){
	this.exposed = true;
};

Cell.prototype.seal = function(){
	this.sealed = true;
};

Cell.prototype.unseal = function(){
	this.sealed = false;
};


var MinedCell = function(){
	Cell.call(this);
	this.mined = true;
};


// module.exports.Cell = Cell;
// module.exports.MinedCell = MinedCell;