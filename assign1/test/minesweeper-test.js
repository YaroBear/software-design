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
		
		expect(minesweeper.cellState(1, 2).EXPOSED).to.eql(true); 
		//Venkat: Will be nice to check to.eql(EXPOSED) where EXPOSED is a constant (may be EXPOSED = "exposed")
	});

	it('expose another cell', function(){
		minesweeper.exposeCell(1, 2);

		minesweeper.exposeCell(2, 3);
	
		expect(minesweeper.cellState(2, 3).EXPOSED).to.eql(true);
	});

	it('expose an exposed cell', function(){
		minesweeper.exposeCell(1, 2);
		
		minesweeper.exposeCell(1, 2);
		
		expect(minesweeper.cellState(1, 2).EXPOSED).to.eql(true);
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
		minesweeper.toggleCell(0,0); 
                             
        expect(minesweeper.cellState(0, 0).SEALED).to.eql(true);         
	});

	it('Sealing or unsealing a cell by calling toggleCell calls checkBounds', function(){
		var called = false;
		minesweeper.checkBounds = function(row, column){
			called = true;
		}

		minesweeper.toggleCell(0, 0);

		expect(called).to.eql(true);
	});

	it('should not allow sealing an exposed cell', function(){
		minesweeper.exposeCell(0, 0);

		minesweeper.toggleCell(0, 0);

	  	expect(minesweeper.cellState(0, 0).EXPOSED).to.eql(true);
	});

	it('should unseal a cell', function(){  //Venkat: please rephrase this test description, not sure what this means. Do we mean unsealing a sealed cell leaves it unexposed?
		minesweeper.toggleCell(0,0); 

		minesweeper.toggleCell(0,0);     
		
		//Venkat: 

		expect(minesweeper.cellState(0, 0).EXPOSED).to.eql(false);
		//Venkat: to.eql(UNEXPOSED) will be nice here.
	});

	it('should not seal an exposed cell', function(){
		minesweeper.exposeCell(0,0); 

		minesweeper.toggleCell(0,0);

		expect(minesweeper.cellState(0, 0).SEALED).to.eql(false);
		//Venkat: what we want to see here is to.eql(EXPOSED)
	});

	it('should not expose a sealed cell', function(){
		minesweeper.toggleCell(0,0);

		minesweeper.exposeCell(0,0); 

		expect(minesweeper.cellState(0, 0).EXPOSED).to.eql(false);
		//Venkat: please avoid false checks, Instead check equal to what it should be
	});

	it('exposing a sealed cell should not expose any neighbors', function(){
		var called = false;
		minesweeper.exposeNeighborsOf = function(row, column) {
			called = true;
		}

		minesweeper.toggleCell(0,0);

		minesweeper.exposeCell(0,0); 

		expect(called).to.eql(false); //Venkat: here false is the right check
	});
});