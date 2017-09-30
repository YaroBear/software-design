var StockCalculator = require("../src/StockCalculator");
var Chai = require('chai');
var expect = Chai.expect;

var mock = require('mock-fs');

describe('Stock calculator unit tests', function() {
	it('canary test', function() {
		expect(true).to.be.true;
	});

	var stockCalculator;

	beforeEach(function(){
		stockCalculator = new StockCalculator();
	});

	it('should get the value for one stock @ $1', function(){
		expect(stockCalculator.calculateValue(100, 1)).to.eql(100);
	});

	it('should get the value for two stocks @ $1', function(){
		expect(stockCalculator.calculateValue(100, 2)).to.eql(200);
	});

	it('should get the value of two different stocks', function(){
		var stocks = [
			{symbol : "XYZ1", price: 250, count: 5},
			{symbol : "XYZ2", price: 300, count: 3}
		];
		expect(stockCalculator.calculateTotalForStocks(stocks)).to.eql(2150);
	});

	/*
	it('should return the first stock symbol in a file', function(done){
		var exampleContents = 'XYZ1 1000 \n XYZ2 1500 \n XYZ3 2312 \n ... \n XYZI 1000 \n XYZJ 1000';
		mock({
			'path/to/ledgerfile/stock_ledger.txt': exampleContents
		});

		expect(stockCalculator.readFile("path/to/ledgerFile/stock_ledger.txt")).to.eql(exampleContents);
		done();
	});
*/


});