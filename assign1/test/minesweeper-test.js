// var expect = require('chai').expect;
// var Cell = require('../src/Cell.js');
// var Grid = require('../src/Grid.js');

describe('MineSweeper Tests', function() {
	it('canary test', function() {
		expect(true).to.be.true;
	});

	it('should seal a cell', function(){
		var newCell = new Cell();
		newCell.seal();
		expect(newCell.sealed).to.eql(true);
	});


	it('should unseal a cell', function(){
		var newCell = new Cell();
		newCell.unseal();
		expect(newCell.sealed).to.eql(false);
	});

	it('should create an array of cells', function(){
		var newGrid = new Grid(10, 10, 5);
		expect(newGrid.grid.length).to.eql(100);
	});

	it('should make a new MinedCell', function(){
		var newCell = new MinedCell();
		expect(newCell.mined).to.eql(true);
	});
	
	it('should distribute 5 mines', function(){
		var newGrid = new Grid(10, 10, 5);
		var count = 0;

		newGrid.distributeMines();
		for(var i = 0; i < 10*10; i++){
			if (newGrid.grid[i] instanceof MinedCell) {
				count++;
			}
		}
		expect(count).to.eql(5);
	});

});
