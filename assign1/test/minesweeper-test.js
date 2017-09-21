describe('MineSweeper Tests', function() {
	it('canary test', function() {
		expect(true).to.be.true;
	});

	var minesweeper;
	beforeEach(function(){
		minesweeper = new MineSweeper(5,5);
	});

	it('expose a cell', function(){
		minesweeper.exposeCell(1, 2);
		
		expect(minesweeper.isCellExposed(1, 2)).to.eql(true);
	});

	it('expose another cell', function(){
		minesweeper.exposeCell(1, 2);

		minesweeper.exposeCell(2, 3);
	
		expect(minesweeper.isCellExposed(2, 3)).to.eql(true);
	});

	it('expose an exposed cell', function(){
		minesweeper.exposeCell(1, 2);
		
		minesweeper.exposeCell(1, 2);
		
		expect(minesweeper.isCellExposed(1, 2)).to.eql(true);
	});

	it('should throw an exception when trying to expose a cell greater than row range', function(){

		var toCall = function() { minesweeper.exposeCell(7, 2); }

		expect(toCall).to.throw("Out of row range");
	});

	it('should throw an exception when trying to expose a cell greater than column range', function(){

		var toCall = function() { minesweeper.exposeCell(1, 8); }

		expect(toCall).to.throw("Out of column range");
	});

	it('should throw an exception when trying to expose a cell less than row range', function(){

		var toCall = function() { minesweeper.exposeCell(-1, 0); }

		expect(toCall).to.throw("Out of row range");
	});

	it('should throw an exception when trying to expose a cell less than column range', function(){

		var toCall = function() { minesweeper.exposeCell(0, -1); }

		expect(toCall).to.throw("Out of column range");
	});


	it('should expose all neighbors of a current inner cell', function(){
		var row = 1;
		var column = 1;

		minesweeper.exposeCell(row, column);

		minesweeper.exposeNeighborCells(row, column);

		var adjCells = [[-1, -1],[-1, 0], [-1, 1],[0, -1],[0, 1],[1, -1],[1, 0],[1, 1]];

		for(var i = 0; i < adjCells.length; i++)
			expect(minesweeper.isCellExposed(row + adjCells[i][0], column + adjCells[i][1])).to.eql(true);
	});

	it('should expose neighbors around current edge cell, skipping over neighbor cells that are out of bounds', function(){
		var row = 0;
		var column = 0;

		minesweeper.exposeCell(row, column);

		expect(minesweeper.exposeNeighborCells(row, column)).to.eql(5);
	});
});