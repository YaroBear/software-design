var StockCalculator = require("../src/StockCalculator");
var Chai = require('chai');
var expect = Chai.expect;
var sinon = require('sinon');
var StockService = require('../src/StockService');
var YahooStockService = require('../src/YahooStockService');

describe('Stock calculator and Stock Service unit tests:', function() {
	it('canary test', function() {
		expect(true).to.be.true;
	});

	var stockCalculator;

	beforeEach(function(){
		stockCalculator = new StockCalculator();
	});

	it('should get the value for one stock @ $1', function(){
		var stock = {price: 100, count: 1};

		expect(stockCalculator.calculateNetAssetValue(stock)).to.eql(100);
	});

	it('should get the value for two stocks @ $1', function(){
		var stock = {price: 100, count: 2};

		expect(stockCalculator.calculateNetAssetValue(stock)).to.eql(200);
	});

	it('should throw an error if stock price is less than $0', function(){
		var stock = {price: -100, count: 2};

		var call = function() {stockCalculator.calculateNetAssetValue(stock);};

		expect(call).to.throw("Price/Count cannot be less than 0");
	});

	it('should throw an error if count of stocks is less than 0', function(){
		var stock = {price: 100, count: -2};

		var call = function() {stockCalculator.calculateNetAssetValue(stock);};

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

		var expectedResults = [{symbol: "TSLA", count: 6, value: 66000}, {symbol: 'GOOG', count: 5, value: 50000}, {symbol: 'WASD', count: 3, error: 'Invalid stock symbol'}];

		sandbox.stub(stockService, 'getStockPrice')
				.withArgs('TSLA').returns(11000)
				.withArgs('GOOG').returns(10000)
				.withArgs('WASD').throws(new Error('Invalid stock symbol'));

		expect(stockCalculator.getAssetValues(stocks)).to.be.eql(expectedResults);
	});

	it('should handle a failure to retrieve a price for valid stock by setting the value of that stock to Not Retrieved', function(){
		var stocks = [{symbol: "TSLA", count: 6}, {symbol: 'AAPL', count: 3}, {symbol: 'GOOG', count: 5}];

		var expectedResults = [{symbol: "TSLA", count: 6, value: 66000}, {symbol: 'AAPL', count: 3, error: 'Failed to retrieve data'}, {symbol: 'GOOG', count: 5, value: 50000}];

		sandbox.stub(stockService, 'getStockPrice')
				.withArgs('TSLA').returns(11000)
				.withArgs('GOOG').returns(10000)
				.withArgs('AAPL').throws(new Error('Failed to retrieve data'));

		expect(stockCalculator.getAssetValues(stocks)).to.be.eql(expectedResults);
	});

});

describe('yahoo stock service tests:', function(){

	var yahooStockService;

	beforeEach(function(){
		yahooStockService = new YahooStockService();
	});

	it('should connect to the Yahoo stock service and get a response', function(){
		var response = false;
		return yahooStockService.getStockPrice('TSLA')
			.then(function(res){
				if (res) response = true;
				expect(response).to.be.true;
		});
	});

	it('should convert the csv from YahooStockService into an array', function(){
		return yahooStockService.getStockPrice('TSLA')
			.then(function(res){
				var resArray = yahooStockService.convertCSVtoArray(res);
				expect(resArray).to.be.an('array');
		});
	});

	it('should have retrieved the name of the TSLA stock to be Tesla', function(){
		return yahooStockService.getStockPrice('TSLA')
			.then(function(res){
				var resArray = yahooStockService.convertCSVtoArray(res);
				expect(resArray[1]).to.eql('"Tesla');
			});
	});
});
