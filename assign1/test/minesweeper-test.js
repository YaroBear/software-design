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

    var exposeNeighborsOfCalledWith = '';
    minesweeper.exposeNeighborsOf = function(row, column) {
      exposeNeighborsOfCalledWith = row + ', ' + column;
    }
    
    minesweeper.exposeCell(1, 2);
    expect(exposeNeighborsOfCalledWith).to.be.equal('1, 2');
	});

	it('exposeCell should not expose neighbor cells if called on an already exposed cell', function(){

    var exposeNeighborsOfCalledWith = '';
    minesweeper.exposeNeighborsOf = function(row, column) {
      exposeNeighborsOfCalledWith = row + ', ' + column;
    }
    
    minesweeper.exposeCell(1, 2);
    exposeNeighborsOfCalledWith = '...not called...';
    
    minesweeper.exposeCell(1, 2);
    
    expect(exposeNeighborsOfCalledWith).to.be.equal('...not called...');
	});
                                            
	it('exposeNeighborsOf should expose all its neighbors', function() {
		var exposeCellCalledWith = [];
		minesweeper.exposeCell = function(row, column) {
			exposeCellCalledWith.push(row);
			exposeCellCalledWith.push(column);
		}

		minesweeper.exposeNeighborsOf(1, 2);
		                                  
		expect(exposeCellCalledWith).to.be.eql([0, 1, 0, 2, 0, 3, 1, 1, 1, 3, 2, 1, 2, 2, 2, 3]);
	});

	it('should expose neighbors around top left corner cell, skipping over neighbor cells that are out of bounds', function(){
		var exposeCellCalledWith = [];
		minesweeper.exposeCell = function(row, column) {
			exposeCellCalledWith.push(row);
			exposeCellCalledWith.push(column);
		}

		minesweeper.exposeNeighborsOf(0, 0);
		                                
		expect(exposeCellCalledWith).to.be.eql([0, 1, 1, 0, 1, 1]);
	});

	it('should expose neighbors around a cell on the top edge, skipping over neighbor cells that are out of bounds', function(){
		var exposeCellCalledWith = [];
		minesweeper.exposeCell = function(row, column) {
			exposeCellCalledWith.push(row);
			exposeCellCalledWith.push(column);
		}

		minesweeper.exposeNeighborsOf(0, 1);
		                                
		expect(exposeCellCalledWith).to.be.eql([0, 0, 0, 2, 1, 0, 1, 1, 1, 2]);
	});

	it('should expose neighbors around a cell on the right edge, skipping over neighbor cells that are out of bounds', function(){
		var exposeCellCalledWith = [];
		var width = minesweeper.width-1;
		minesweeper.exposeCell = function(row, column) {
			exposeCellCalledWith.push(row);
			exposeCellCalledWith.push(column);
		}

		minesweeper.exposeNeighborsOf(1, width);
		                                
		expect(exposeCellCalledWith).to.be.eql([0, width-1, 0, width, 1, width-1, 2, width-1, 2, width]);
	});

	it('should expose neighbors around a cell on the bottom edge, skipping over neighbor cells that are out of bounds', function(){
		var exposeCellCalledWith = [];
		var height = minesweeper.height-1;
		minesweeper.exposeCell = function(row, column) {
			exposeCellCalledWith.push(row);
			exposeCellCalledWith.push(column);
		}

		minesweeper.exposeNeighborsOf(height, 1);
		                                
		expect(exposeCellCalledWith).to.be.eql([height-1, 0, height-1, 1, height-1, 2, height, 0, height, 2]);
	});

	it('should expose neighbors around a cell on the left edge, skipping over neighbor cells that are out of bounds', function(){
		var exposeCellCalledWith = [];
		minesweeper.exposeCell = function(row, column) {
			exposeCellCalledWith.push(row);
			exposeCellCalledWith.push(column);
		}

		minesweeper.exposeNeighborsOf(1, 0);
		                                
		expect(exposeCellCalledWith).to.be.eql([0, 0, 0, 1, 1, 1, 2, 0, 2, 1]);
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