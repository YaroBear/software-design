describe('MineSweeper Tests', function() {
	it('canary test', function() {
		expect(true).to.be.true;
	});

	var minesweeper;
	beforeEach(function(){
		minesweeper = new MineSweeper();
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

		var toCall = function() { minesweeper.exposeCell(11, 2); }

		expect(toCall).to.throw("Out of row range");
	});

	it('should throw an exception when trying to expose a cell greater than column range', function(){

		var toCall = function() { minesweeper.exposeCell(1, 11); }

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
         
	it('exposeCell should expose its neighbors.', function(){
		var actualNeighborCells = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1], [2, 2]];

		var returnedNeighborCells = minesweeper.exposeCell(1, 1);

		expect(actualNeighborCells).to.eql(returnedNeighborCells);
	});

	it('exposeCell should not expose neighbor cells if called on an already exposed cell', function(){
		var calledExposeNeighborsOf = true;

		minesweeper.exposeCell(1, 2);

		calledExposeNeighborsOf = minesweeper.exposeCell(1, 2);
		
		expect(calledExposeNeighborsOf).to.eql(false);
	});

	it('should expose neighbors around top left corner cell, skipping over neighbor cells that are out of bounds', function(){
		var actualNeighborCells = [[0, 1],[1, 0],[1, 1]];

		var returnedNeighborCells = minesweeper.exposeNeighborsOf(0, 0);

		expect(actualNeighborCells).to.eql(returnedNeighborCells);
	});

	it('should expose neighbors around a cell on the top edge, skipping over neighbor cells that are out of bounds', function(){
		var actualNeighborCells = [[0, 0], [0, 2], [1, 0], [1, 1], [1, 2]];

		var returnedNeighborCells = minesweeper.exposeNeighborsOf(0, 1);

		expect(actualNeighborCells).to.eql(returnedNeighborCells);
	});

	it('should expose neighbors around a cell on the right edge, skipping over neighbor cells that are out of bounds', function(){
		var actualNeighborCells = [[0, minesweeper.width-2], [0, minesweeper.width-1], [1, minesweeper.width-2], [2, minesweeper.width-2], [2, minesweeper.width-1]];

		var returnedNeighborCells = minesweeper.exposeNeighborsOf(1, minesweeper.width-1);

		expect(actualNeighborCells).to.eql(returnedNeighborCells);
	});

	it('should expose neighbors around a cell on the bottom edge, skipping over neighbor cells that are out of bounds', function(){
		var actualNeighborCells = [[minesweeper.height-2, 0], [minesweeper.height-2, 1], [minesweeper.height-2, 2], [minesweeper.height-1, 0], [minesweeper.height-1, 2]];

		var returnedNeighborCells = minesweeper.exposeNeighborsOf(minesweeper.height-1, 1);

		expect(actualNeighborCells).to.eql(returnedNeighborCells);
	});

	it('should expose neighbors around a cell on the left edge, skipping over neighbor cells that are out of bounds', function(){
		var actualNeighborCells = [[0, 0], [0, 1], [1, 1], [2, 0], [2, 1]];

		var returnedNeighborCells = minesweeper.exposeNeighborsOf(1, 0);

		expect(actualNeighborCells).to.eql(returnedNeighborCells);
	});

	it('should seal a cell', function(){
		var sealed = minesweeper.sealCell(0,0);
		expect(sealed).to.be.true;
	});

	it('should throw an expection when sealing a cell greater than row range', function(){
		var toCall = function(){minesweeper.sealCell(11,0);};

		expect(toCall).to.throw("Out of row range");
	});

	it('should throw an expection when sealing a cell less than row range', function(){
		var toCall = function(){minesweeper.sealCell(-1,0);};

		expect(toCall).to.throw("Out of row range");
	});

	it('should throw an expection when sealing a cell greater than column range', function(){
		var toCall = function(){minesweeper.sealCell(0,11);};

		expect(toCall).to.throw("Out of column range");
	});

	it('should throw an expection when sealing a cell less than column range', function(){
		var toCall = function(){minesweeper.sealCell(0,-1);};

		expect(toCall).to.throw("Out of column range");
	});

	it('should not allow sealing an exposed cell', function(){
		minesweeper.exposeCell(0,0);

		var isItSealed = minesweeper.sealCell(0,0);

		expect(isItSealed).to.be.false;
	});

	/* need exposed attribute now to make this test pass

	it('should now allow exposing a sealed cell', function(){
		minesweeper.sealCell(0,0);

		var isItExposed = minesweeper.exposeCell(0,0);

		expect(isItExposed).to.be.false;
	});

	*/

	it('should unseal a cell', function(){
		var sealed = minesweeper.unsealCell(0,0);

		expect(sealed).to.be.true;
	});


	it('should do nothing when unsealing an unsealed cell', function(){
		var isItUnsealed = minesweeper.unsealCell(0,0);

		expect(isItUnsealed).to.be.true;
	});

	it('should throw an expection when unsealing a cell greater than row range', function(){
		var toCall = function(){minesweeper.unsealCell(11,0);};

		expect(toCall).to.throw("Out of row range");
	});

	it('should throw an expection when unsealing a cell less than row range', function(){
		var toCall = function(){minesweeper.unsealCell(-1,0);};

		expect(toCall).to.throw("Out of row range");
	});

	it('should throw an expection when unsealing a cell greater than column range', function(){
		var toCall = function(){minesweeper.unsealCell(0,11);};

		expect(toCall).to.throw("Out of column range");
	});

	it('should throw an expection when unsealing a cell less than column range', function(){
		var toCall = function(){minesweeper.unsealCell(0,-1);};

		expect(toCall).to.throw("Out of column range");
	});


});