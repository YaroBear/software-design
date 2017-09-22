describe('MineSweeper Tests', function() {
	it('canary test', function() {
		expect(true).to.be.true;
	});

	var minesweeper;
//Venkat: a blank line here please
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

//Venkat: Let's rework this test. Let us not check for the results here. 
//Make exposeCell a void method, don't return anything from it.
//Let us test interaction here.
	it('exposeCell should expose its neighbors.', function(){
    var actualNeighborCells = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1], [2, 2]];
    
    var returnedNeighborCells = minesweeper.exposeCell(1, 1);
    
    expect(actualNeighborCells).to.eql(returnedNeighborCells);

    //Venkat: instead of the above lines, let's do the following:
    // var exposeNeighborsOfCalledWith = '';
    // minesweeper.exposeNeighborsOf = function(row, column) {
    //   exposeNeighborsOfCalledWith = row + ', ' + column;
    // }
    // 
    // minesweeper.exposeCell(1, 2);
    // expect(exposeNeighborsOfCalledWith).to.be.equal('1, 2');
	});

	it('exposeCell should not expose neighbor cells if called on an already exposed cell', function(){
    var calledExposeNeighborsOf = true;
    
    minesweeper.exposeCell(1, 2);
    
    calledExposeNeighborsOf = minesweeper.exposeCell(1, 2);
    
    expect(calledExposeNeighborsOf).to.eql(false);
		
		//Venkat: This test is lacking a key part, replacing the exposeNeighborsOf method. Let's do the following instead of the above:
    // var exposeNeighborsOfCalledWith = '';
    // minesweeper.exposeNeighborsOf = function(row, column) {
    //   exposeNeighborsOfCalledWith = row + ', ' + column;
    // }
    // 
    // minesweeper.exposeCell(1, 2);
    // exposeNeighborsOfCalledWith = '...not called...';
    // 
    // minesweeper.exposeCell(1, 2);
    // 
    // expect(exposeNeighborsOfCalledWith).to.be.equal('...not called...');
	});
                                            
//Venkat: Let's make both exposeCell and exposeNeighborsOf void methods

//Venkat: Let's first test the happy path and then the edge cases. Here we will verify that exposeNeighborsOf calls exposeCell for each of the neighbors
  // it('exposeNeighborsOf should expose all its neighbors', function() {
  //   var exposeCellCalledWith = [];
  //   minesweeper.exposeCell = function(row, column) {
  //     exposeCellCalledWith.push(row);
  //     exposeCellCalledWith.push(column);
  //   }
  //   
  //   minesweeper.exposeNeighborsOf(1, 2);
  //                                     
  //   expect(exposeCellCalledWith).to.be.eql([0, 1, 0, 2, 0, 3, 1, 1, 1, 3, 2, 1, 2, 2, 2, 3]);
  // });

	it('should expose neighbors around top left corner cell, skipping over neighbor cells that are out of bounds', function(){
		var actualNeighborCells = [[0, 1],[1, 0],[1, 1]];

		var returnedNeighborCells = minesweeper.exposeNeighborsOf(0, 0);

		expect(actualNeighborCells).to.eql(returnedNeighborCells);
		
		//Venkat: Let's change this test so it will verify that exposeNeighborsOf is calling exposeCell with proper row, column values, like so:
    //   var exposeCellCalledWith = [];
    //   minesweeper.exposeCell = function(row, column) {
    //     exposeCellCalledWith.push(row);
    //     exposeCellCalledWith.push(column);
    //   }
    //   
    //   minesweeper.exposeNeighborsOf(0, 0);
    //                                     
    //   expect(exposeCellCalledWith).to.be.eql([0, 1, 1, 0, 1, 1]);
	});

	it('should expose neighbors around a cell on the top edge, skipping over neighbor cells that are out of bounds', function(){
		var actualNeighborCells = [[0, 0], [0, 2], [1, 0], [1, 1], [1, 2]];

		var returnedNeighborCells = minesweeper.exposeNeighborsOf(0, 1);

		expect(actualNeighborCells).to.eql(returnedNeighborCells);

		//Venkat: Let's change this test so it will verify that exposeNeighborsOf is calling exposeCell with proper row, column values.
	});

	it('should expose neighbors around a cell on the right edge, skipping over neighbor cells that are out of bounds', function(){
		var actualNeighborCells = [[0, minesweeper.width-2], [0, minesweeper.width-1], [1, minesweeper.width-2], [2, minesweeper.width-2], [2, minesweeper.width-1]];

		var returnedNeighborCells = minesweeper.exposeNeighborsOf(1, minesweeper.width-1);

		expect(actualNeighborCells).to.eql(returnedNeighborCells);
		//Venkat: Let's change this test so it will verify that exposeNeighborsOf is calling exposeCell with proper row, column values.
	});

	it('should expose neighbors around a cell on the bottom edge, skipping over neighbor cells that are out of bounds', function(){
		var actualNeighborCells = [[minesweeper.height-2, 0], [minesweeper.height-2, 1], [minesweeper.height-2, 2], [minesweeper.height-1, 0], [minesweeper.height-1, 2]];

		var returnedNeighborCells = minesweeper.exposeNeighborsOf(minesweeper.height-1, 1);

		expect(actualNeighborCells).to.eql(returnedNeighborCells);
		//Venkat: Let's change this test so it will verify that exposeNeighborsOf is calling exposeCell with proper row, column values.
	});

	it('should expose neighbors around a cell on the left edge, skipping over neighbor cells that are out of bounds', function(){
		var actualNeighborCells = [[0, 0], [0, 1], [1, 1], [2, 0], [2, 1]];

		var returnedNeighborCells = minesweeper.exposeNeighborsOf(1, 0);

		expect(actualNeighborCells).to.eql(returnedNeighborCells);
		//Venkat: Let's change this test so it will verify that exposeNeighborsOf is calling exposeCell with proper row, column values.
	});

	it('should seal a cell', function(){
		var sealed = minesweeper.sealCell(0,0); //Venkat: let's call this toggleCell. This will reduce the number of tests and errors to check as well.
		//Venkat: make toggleCell a void method
		expect(sealed).to.be.true;                                 
                 
    //Venkat: let's rename isCellExposed to cellState and return a CellState
		//Venkat: expect(minesweeper.cellState(0, 0)).to.be.equal(CellState.SEALED);
		//where CellState is a class with SEALED and EXPOSED defined as constant values, something like CellState.SEALED = 'sealed';
	});

	it('should throw an expection when sealing a cell greater than row range', function(){
		var toCall = function(){minesweeper.sealCell(11,0);};

		expect(toCall).to.throw("Out of row range");
		//Venkat: You took a very nice design decision, to call checkBounds from within exposeCell and sealCell. Good job there. Let's make use of that design decision to our favor here. Instead of multiple tests for bounds for sealCell/toggleCell, we need only one test, verify that when toggleCell is called, it calls checkBounds.
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
	  //Venkat: here verify that the cellState returns EXPOSED
	});

	it('should unseal a cell', function(){
		var sealed = minesweeper.unsealCell(0,0); //Venkat: call toggleCell twice, verify that the state of the cell retunred by cellState is UNEXPOSED

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