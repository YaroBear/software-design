const StockCalculator = require("../src/stock-calculator");
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;
const sinon = require('sinon');
const StockService = require('../src/stock-service');

describe('Stock calculator and Stock Service unit tests:', function() {
	it('canary test', function() {
		expect(true).to.be.true;
	});

	let stockCalculator;

	beforeEach(function(){
		stockCalculator = new StockCalculator();
	});

	it('should get the value for one stock @ $1', function(){
		let stock = {price: 100, count: 1};

		expect(stockCalculator.calculateNetAssetValue(stock)).to.eql(100);
	});

	it('should get the value for two stocks @ $1', function(){
		let stock = {price: 100, count: 2};

		expect(stockCalculator.calculateNetAssetValue(stock)).to.eql(200);
	});

	it('should throw an error if stock price is less than $0', function(){
		let stock = {price: -100, count: 2};

		let call = function() {stockCalculator.calculateNetAssetValue(stock);};

		expect(call).to.throw("Price/Count cannot be less than 0");
	});

	it('should throw an error if count of stocks is less than 0', function(){
		let stock = {price: 100, count: -2};

		let call = function() {stockCalculator.calculateNetAssetValue(stock);};

		expect(call).to.throw("Price/Count cannot be less than 0");
	});
});

describe('stock service tests:', function(){

	let sandbox;
	let stockService;
	let stockCalculator;

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
			.resolves(17000);

		expect(stockCalculator.stockService.getStockPrice('GOOG')).to.eventually.eql(17000);
	});

	it('should return the symbol, number of shares, and total value of 1 stock when getAssetValues is called', function(){
		let stocks = [{symbol: "TSLA", count: 6}];

		sandbox.stub(stockService, 'getStockPrice')
			.withArgs('TSLA')
			.resolves(11000);

		expect(stockCalculator.getAssetValues(stocks)).to.eventually.eql([{symbol: "TSLA", count: 6, value: 66000}]);
	});

	it('should return the symbols, number of shares and total values of 2 stocks when getAssetValues is called', function(){
		let stocks = [{symbol: "TSLA", count: 6}, {symbol: 'GOOG', count: 5}];

		let expectedResults = [{symbol: "TSLA", count: 6, value: 66000}, {symbol: 'GOOG', count: 5, value: 50000}];

		sandbox.stub(stockService, 'getStockPrice')
				.withArgs('TSLA').resolves(11000)
				.withArgs('GOOG').resolves(10000);

		expect(stockCalculator.getAssetValues(stocks)).to.eventually.eql(expectedResults);
	});

	it('should return the symbols, number of shares and total values of 3 stocks when getAssetValues is called', function(){
		let stocks = [{symbol: "TSLA", count: 6}, {symbol: 'GOOG', count: 5}, {symbol: 'AAPL', count: 3}];

		let expectedResults = [{symbol: "TSLA", count: 6, value: 66000}, {symbol: 'GOOG', count: 5, value: 50000}, {symbol: 'AAPL', count: 3, value: 27000}];

		sandbox.stub(stockService, 'getStockPrice')
				.withArgs('TSLA').resolves(11000)
				.withArgs('GOOG').resolves(10000)
				.withArgs('AAPL').resolves(9000);

		expect(stockCalculator.getAssetValues(stocks)).to.eventually.eql(expectedResults);
	});

	it('should handle an invalid stock symbol in a list of stocks by setting the value of the invalid stock to N/A', function(){
		let stocks = [{symbol: "TSLA", count: 6}, {symbol: 'GOOG', count: 5}, {symbol: 'WASD', count: 3}];

		let expectedResults = [{symbol: "TSLA", count: 6, value: 66000}, {symbol: 'GOOG', count: 5, value: 50000}, {symbol: 'WASD', count: 3, error: 'Invalid stock symbol'}];

		sandbox.stub(stockService, 'getStockPrice')
				.withArgs('TSLA').resolves(11000)
				.withArgs('GOOG').resolves(10000)
				.withArgs('WASD').rejects(new Error('Invalid stock symbol'));

		expect(stockCalculator.getAssetValues(stocks)).to.eventually.eql(expectedResults);
	});

	it('should handle a failure to retrieve a price for valid stock by setting the value of that stock to Not Retrieved', function(){
		let stocks = [{symbol: "TSLA", count: 6}, {symbol: 'AAPL', count: 3}, {symbol: 'GOOG', count: 5}];

		let expectedResults = [{symbol: "TSLA", count: 6, value: 66000}, {symbol: 'AAPL', count: 3, error: 'Failed to retrieve data'}, {symbol: 'GOOG', count: 5, value: 50000}];

		sandbox.stub(stockService, 'getStockPrice')
				.withArgs('TSLA').resolves(11000)
				.withArgs('GOOG').resolves(10000)
				.withArgs('AAPL').rejects(new Error('Failed to retrieve data'));

		expect(stockCalculator.getAssetValues(stocks)).to.eventually.eql(expectedResults);
	});
});