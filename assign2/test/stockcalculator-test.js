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

//Venkat: we can reduce a few tests here. Let getBidPriceFromService take one symbol and return one price. Then let's design for what will happen if the given ticket is invalid. Then what will happen if there was a failure to get the data for a valid symbol.                  

	it('should get the bid price of GOOG', function(){
		sandbox.stub(stockService, 'getStockPrice')
			.withArgs('GOOG')
			.returns(10000);

		expect(stockCalculator.getBidPriceFromService('GOOG')).to.eql(10000);
	});

	it('should throw an error for an invalid ticker symbol', function(){
		var call = function() {stockCalculator.getBidPriceFromService('0000');};
		
		expect(call).to.throw("Invalid ticker symbol");
	});

	it('should throw an error if it fails to retrieve data for a valid stock symbol', function(){
		sandbox.stub(stockService, 'getStockPrice')
			.withArgs('GOOG')
			.returns();

		var call = function() {stockCalculator.getBidPriceFromService('GOOG');};

		expect(call).to.throw("Error retrieving data for valid symbol");
	});



	// it('should get the bid price of GOOG and TSLA', function(){
	// 	sandbox.stub(stockService, 'getStockPrice')
	// 		.withArgs('GOOG').returns(10000)
	// 		.withArgs('TSLA').returns(20000);

	// 	expect(stockCalculator.getBidPriceFromService(['GOOG', 'TSLA'])).to.eql([10000, 20000]);
	// });

	// it('should get the net asset value of GOOG', function(){
	// 	sandbox.stub(stockService, 'getStockPrice')
	// 		.withArgs('GOOG').returns(10000);

	// 	var price = stockCalculator.getBidPriceFromService(['GOOG']);
	// 	var stock = [{price : price[0], count: 5}];

	// 	expect(stockCalculator.calculateNetAssetValue(stock)).to.eql(50000);
	// });

	// it('should get the net asset value of GOOG and TSLA', function(){
	// 	sandbox.stub(stockService, 'getStockPrice')
	// 		.withArgs('GOOG').returns(10000)
	// 		.withArgs('TSLA').returns(20000);

	// 	var price = stockCalculator.getBidPriceFromService(['GOOG', 'TSLA']);
	// 	var stocks = [{price : price[0], count: 5}, {price : price[1], count: 2}];

	// 	expect(stockCalculator.calculateNetAssetValue(stocks)).to.eql(90000);
	// });
                  
//Venkat: Please remove
	it('should throw an error when getStockPrice is called', function(){
		expect(stockCalculator.stockService.getStockPrice).to.throw('Not implemented');
	});
});
