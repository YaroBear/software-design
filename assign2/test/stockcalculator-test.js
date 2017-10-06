var StockCalculator = require("../src/StockCalculator");
var Chai = require('chai');
var expect = Chai.expect;
var sinon = require('sinon');
var StockService = require('../src/StockService');

describe('Stock calculator and Stock Service unit tests:', function() {
	it('canary test', function() {
		expect(true).to.be.true;
	});

	var stockCalculator;

	beforeEach(function(){
		stockCalculator = new StockCalculator();
	});

	it('should get the value for one stock @ $1', function(){
		var stock = [{price: 100, count: 1}];

		expect(stockCalculator.calculateNetAssetValue(stock)).to.eql(100);
	});

	it('should get the value for two stocks @ $1', function(){
		var stock = [{price: 100, count: 2}];

		expect(stockCalculator.calculateNetAssetValue(stock)).to.eql(200);
	});

	it('should throw an error if stock price is less than $0', function(){
		var stock = [{price: -100, count: 2}];

		var call = function() {stockCalculator.calculateNetAssetValue(stock);};

		expect(call).to.throw("Price/Count cannot be less than 0");
	});

	it('should throw an error if count of stocks is less than 0', function(){
		var stock = [{price: 100, count: -2}];

		var call = function() {stockCalculator.calculateNetAssetValue(stock);};

		expect(call).to.throw("Price/Count cannot be less than 0");
	});

	it('should get the total value of two different stocks', function(){
		var stocks = [
		  {price: 250, count: 5},
		  {price: 300, count: 3},
		];
		expect(stockCalculator.calculateNetAssetValue(stocks)).to.eql(2150);
	});

	it('throw in error if one stock in a list of stocks is invalid', function(){
		var stocks = [
			{price: 250, count: 5},
			{price: 300, count: 3},
			{price: -1000, count: 2}
		];

		var call = function() {stockCalculator.calculateNetAssetValue(stocks);};

		expect(call).to.throw("Price/Count cannot be less than 0");
	});
});

describe('stock service tests:', function(){

	var sandbox;
	var stockService;
	var stockCalculator;

	beforeEach(function(){
		sandbox = sinon.sandbox.create();
		stockService = new StockService();
		stockCalculator = new StockCalculator(stockService);
	});

	afterEach(function() {
		sandbox.restore();
	});

	it('should get the bid price of GOOG', function(){
		sandbox.stub(stockService, 'getStockPrice')
			.withArgs('GOOG')
			.returns(17000);

		expect(stockCalculator.stockService.getStockPrice('GOOG')).to.eql(17000);
	});

//Venkat: Pelase remove this test, it is testing the stub we created. We should never test a stub. Stub is used to help testing real methods.
	it('should throw an error for an invalid stock symbol', function(){
		sandbox.stub(stockService, 'getStockPrice')
			.withArgs('WASD')
			.throws(new Error("Invalid stock symbol"));

		var call = function() {stockCalculator.stockService.getStockPrice('WASD');};

		expect(call).to.throw("Invalid stock symbol");
	});

//Venkat: There is no value for this test, please remove                        
	it('should call calculateNetAssetValue when getAssetValues is called', function(){
 		var stocks = [{symbol: "TSLA", count: 6}];
 		
		sandbox.stub(stockService, 'getStockPrice')
			.withArgs('TSLA')
			.returns(10000);


		var spy = sandbox.spy(stockCalculator, 'calculateNetAssetValue');

		stockCalculator.getAssetValues(stocks);

		expect(spy.calledWith([{price: 10000, count: 6}])).to.be.true;
	});

	it('should return the symbol, number of shares, and total value of 1 stock when getAssetValues is called', function(){
		var stocks = [{symbol: "TSLA", count: 6}];

		sandbox.stub(stockService, 'getStockPrice')
			.withArgs('TSLA')
			.returns(11000);

		expect(stockCalculator.getAssetValues(stocks)).to.be.eql([{symbol: "TSLA", count: 6, value: 66000}]);
	});

	it('should return the symbols, number of shares and total values of 2 stocks when getAssetValues is called', function(){
		var stocks = [{symbol: "TSLA", count: 6}, {symbol: 'GOOG', count: 5}];

		var expectedResults = [{symbol: "TSLA", count: 6, value: 66000}, {symbol: 'GOOG', count: 5, value: 50000}];

		sandbox.stub(stockService, 'getStockPrice')
				.withArgs('TSLA').returns(11000)
				.withArgs('GOOG').returns(10000);

		expect(stockCalculator.getAssetValues(stocks)).to.be.eql(expectedResults);
	});

	it('should return the symbols, number of shares and total values of 3 stocks when getAssetValues is called', function(){
		var stocks = [{symbol: "TSLA", count: 6}, {symbol: 'GOOG', count: 5}, {symbol: 'AAPL', count: 3}];

		var expectedResults = [{symbol: "TSLA", count: 6, value: 66000}, {symbol: 'GOOG', count: 5, value: 50000}, {symbol: 'AAPL', count: 3, value: 27000}];

		sandbox.stub(stockService, 'getStockPrice')
				.withArgs('TSLA').returns(11000)
				.withArgs('GOOG').returns(10000)
				.withArgs('AAPL').returns(9000);

		expect(stockCalculator.getAssetValues(stocks)).to.be.eql(expectedResults);
	});

	it('should handle an invalid stock symbol in a list of stocks by setting the value of the invalid stock to N/A', function(){
		var stocks = [{symbol: "TSLA", count: 6}, {symbol: 'GOOG', count: 5}, {symbol: 'WASD', count: 3}];

//Venkat: Question. The value here is a number or a string. Will this make our life harder when we need to know the difference. Will it be easier if we keep the asset value in value: and error message in error: Then the result may either have a value or a error. That will be easier to tell if the result is there or we ran into an issue getting the price?
		var expectedResults = [{symbol: "TSLA", count: 6, value: 66000}, {symbol: 'GOOG', count: 5, value: 50000}, {symbol: 'WASD', count: 3, value: 'Invalid stock symbol'}];

		sandbox.stub(stockService, 'getStockPrice')
				.withArgs('TSLA').returns(11000)
				.withArgs('GOOG').returns(10000)
				.withArgs('WASD').throws(new Error('Invalid stock symbol'));

		expect(stockCalculator.getAssetValues(stocks)).to.be.eql(expectedResults);
	});

	it('should handle a failure to retrieve a price for valid stock by setting the value of that stock to Not Retrieved', function(){
		var stocks = [{symbol: "TSLA", count: 6}, {symbol: 'AAPL', count: 3}, {symbol: 'GOOG', count: 5}];

		var expectedResults = [{symbol: "TSLA", count: 6, value: 66000}, {symbol: 'AAPL', count: 3, value: 'Failed to retrieve data'}, {symbol: 'GOOG', count: 5, value: 50000}];

		sandbox.stub(stockService, 'getStockPrice')
				.withArgs('TSLA').returns(11000)
				.withArgs('GOOG').returns(10000)
				.withArgs('AAPL').throws(new Error('Failed to retrieve data'));

		expect(stockCalculator.getAssetValues(stocks)).to.be.eql(expectedResults);
	});

});
