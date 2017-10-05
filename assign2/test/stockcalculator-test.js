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
			.returns(10000);

		expect(stockCalculator.getBidPriceFromService('GOOG')).to.eql(10000);
	});

	it('should throw an error if it fails to retrieve data for a valid stock symbol', function(){
		sandbox.stub(stockService, 'getStockPrice')
			.withArgs('WASD')
			.throws(new Error("Invalid stock symbol"));

		var call = function() {stockCalculator.getBidPriceFromService('WASD');};

		expect(call).to.throw("Invalid stock symbol");
	});
                        
//Venkat: Please remove this test
	it('should throw an error when getStockPrice is called', function(){
		expect(stockCalculator.stockService.getStockPrice).to.throw('Not implemented');
	});

	it('should call getBidPriceFromService when getSummaryOfStocks is called', function(){
 		var stocks = [{symbol: 'GOOG', count: 5}];

		sandbox.stub(stockService, 'getStockPrice')
			.withArgs('GOOG')
			.returns(11000);

		var spy = sandbox.spy(stockCalculator, 'getBidPriceFromService');

		stockCalculator.getSummaryOfStocks(stocks);

		expect(spy.calledWith('GOOG')).to.be.true;
	});

	it('should call calculateNetAssetValue when getSummaryOfStocks is called', function(){
 		var stocks = [{symbol: "TSLA", count: 6}];
 		
		sandbox.stub(stockService, 'getStockPrice')
			.withArgs('TSLA')
			.returns(10000);


		var spy = sandbox.spy(stockCalculator, 'calculateNetAssetValue');

		stockCalculator.getSummaryOfStocks(stocks);

		expect(spy.calledWith([{price: 10000, count: 6}])).to.be.true;
	});
});
