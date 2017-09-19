// var expect = require('chai').expect;  //Venkat: please remove this line
// var Cell = require('../src/Cell.js'); //Venkat: please remove this line
// var Grid = require('../src/Grid.js'); //Venkat: please remove this line

describe('MineSweeper Tests', function() {
	it('canary test', function() {
		expect(true).to.be.true;
	});

//Venkat: Let's delete these tests and start over with something much simpler.
//here are a few tests to write at first.

// expose a cell
// expose another cell
// expose an exposed cell

//For the expose a cell, call exposeCell(1, 2) and verify that 
//isCellExposed(1, 2) is true.

//For expose  an exposed cell test, call exposeCell twice on the same location 
//and let the reult still be true for isCellExposed. That is calling expose on 
//an exposed cell is OK.

//Let's do all this test on a MineSweeper class (not Grid, not Cell). At this 
//time we do not need a Cell class, so let's remove Grid and Cell. For now, we 
//need MineSweeper class and three tests in our MineSweeper Tests.

//Keep the code very minium (literally). Do not create any fields in your 
//class until that field is absolutely needed at this time (and it is not 
//right now).


	it('expose a cell', function(){
		var minesweeper = new MineSweeper();
		minesweeper.exposeCell(1, 2);
		expect(minesweeper.isCellExposed(1, 2)).to.eql(true);

	});

	it('expose another cell', function(){

		var minesweeper = new MineSweeper();
		//expose first cell
		minesweeper.exposeCell(1, 2);
		//expose second cell
		minesweeper.exposeCell(2, 3);
		expect(minesweeper.isCellExposed(2, 3)).to.eql(true);

	});

	it('expose an exposed cell', function(){
		var minesweeper = new MineSweeper();
		//expose same cell twice
		minesweeper.exposeCell(1, 2);
		minesweeper.exposeCell(1, 2);
		expect(minesweeper.isCellExposed(1, 2)).to.eql(true);

	});

	// it('should seal a cell', function(){
	// 	var newCell = new Cell();
	// 	newCell.seal();
	// 	expect(newCell.sealed).to.eql(true);
	// });


	// it('should unseal a cell', function(){
	// 	var newCell = new Cell();
	// 	newCell.unseal();
	// 	expect(newCell.sealed).to.eql(false);
	// });

	// it('should create an array of cells', function(){
	// 	var newGrid = new Grid(10, 10, 5);
	// 	expect(newGrid.grid.length).to.eql(100);
	// });

	// it('should make a new MinedCell', function(){
	// 	var newCell = new MinedCell();
	// 	expect(newCell.mined).to.eql(true);
	// });
	
	// it('should distribute 5 mines', function(){
	// 	var newGrid = new Grid(10, 10, 5);
	// 	var count = 0;

	// 	newGrid.distributeMines();
	// 	for(var i = 0; i < 10*10; i++){
	// 		if (newGrid.grid[i] instanceof MinedCell) {
	// 			count++;
	// 		}
	// 	}
	// 	expect(count).to.eql(5);
	// });

});
