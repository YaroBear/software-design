describe('MineSweeper Tests', function() {
	it('canary test', function() {
		expect(true).to.be.true;
	});

	var minesweeper;
	beforeEach(function(){
		minesweeper = new MineSweeper(5,5); //Venkat: minesweeper = new MineSweeper();
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
         
//Venkat: Nice work upto this point.

	//refactored based on feedback
	it('exposeCell should expose its neighbors.', function(){

		var calledExposeNeighborsOf = minesweeper.exposeCell(1, 1);

		expect(calledExposeNeighborsOf).to.eql(true);
	});

	//refactored based on feedback
	it('exposeCell should not expose neighbor cells if called on an already exposed cell', function(){
		minesweeper.exposeCell(1, 2);

		var calledExposeNeighborsOf = minesweeper.exposeCell(1, 2);
		
		expect(calledExposeNeighborsOf).to.eql(false);
	});


	it('should expose neighbors around top left corner cell, skipping over neighbor cells that are out of bounds', function(){
		var row = 0;
		var column = 0;

		minesweeper.exposeCell(row, column);

		expect(minesweeper.exposeNeighborCells(row, column)).to.eql(5);
	});

	it('should expose neighbors around a cell on the top edge, skipping over neighbor cells that are out of bounds', function(){
		var row = 0;
		var column = 1;

		minesweeper.exposeCell(row, column);

		expect(minesweeper.exposeNeighborCells(row, column)).to.eql(3);
	});

	it('should expose neighbors around a cell on the right edge, skipping over neighbor cells that are out of bounds', function(){
		var row = 1;
		var column = minesweeper.width - 1;

		minesweeper.exposeCell(row, column);

		expect(minesweeper.exposeNeighborCells(row, column)).to.eql(3);
	});

	it('should expose neighbors around a cell on the bottom edge, skipping over neighbor cells that are out of bounds', function(){
		var row = minesweeper.height - 1;
		var column = 1;

		minesweeper.exposeCell(row, column);

		expect(minesweeper.exposeNeighborCells(row, column)).to.eql(3);
	});

	it('should expose neighbors around a cell on the left edge, skipping over neighbor cells that are out of bounds', function(){
		var row = 1;
		var column = 0;

		minesweeper.exposeCell(row, column);

		expect(minesweeper.exposeNeighborCells(row, column)).to.eql(3);
	});

});