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

	it('should throw an exception when trying to expose a cell out of row range', function(){

		var toCall = function() { minesweeper.exposeCell(7, 2); }

		expect(toCall).to.throw("Out of row range");
	});

	it('should throw an exception when trying to expose a cell out of column range', function(){

		var toCall = function() { minesweeper.exposeCell(1, 8); }

		expect(toCall).to.throw("Out of column range");
	});
});
