var StockCalculator = require("../src/StockCalculator");
var Chai = require('chai');
var expect = Chai.expect;

describe('Stock calculator unit tests:', function() {
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

	it('should throw an error if stock price is less than $0', function(){
		var call = function() {stockCalculator.calculateValue(-100, 5);};

		expect(call).to.throw("Price/Count cannot be less than 0");
	});

	it('should throw an error if count of stocks is less than 0', function(){
		var call = function() {stockCalculator.calculateValue(1000, -1);};

		expect(call).to.throw("Price/Count cannot be less than 0");
	});

	it("should convert decimal values to whole integer", function(){
		expect(stockCalculator.convertDecimalToInteger(12.34)).to.eql(1234);
	});


	const testStocks = [
		{symbol : "XYZ1", price: 250, count: 5},
		{symbol : "XYZ2", price: 300, count: 3},
		{symbol : "XYZ3", price: -1000, count: 2}
	];

	it('should get the value of two different stocks', function(){
		expect(stockCalculator.calculateTotalForStocks(testStocks)).to.eql(2150);
	});

	it('should return the price of all valid stocks when one or more stocks contains an error', function(){
		expect(stockCalculator.calculateTotalForStocks(testStocks)).to.eql(2150);
	});

	it('should log the thrown error when calculating the total for stocks and one of the stocks is invalid', function(){
		var makeLogCalled = false;

		stockCalculator.makeLog = function() {
			makeLogCalled = true;
		};

		stockCalculator.calculateTotalForStocks(testStocks);

		expect(makeLogCalled).to.be.true;
	});

	it('should log the invalid stock name when calculating the total for stocks', function(){
		stockCalculator.calculateTotalForStocks(testStocks);

		expect(stockCalculator.getLogs()[0]).to.include("XYZ3");
	});
});