var StockCalculator = require("../src/StockCalculator");
var Chai = require('chai');
var expect = Chai.expect;

var StockService = require('../src/StockService');
var YahooStockService = require('../src/YahooService');

describe('Stock calculator and Stock Service unit tests:', function() {
	it('canary test', function() {
		expect(true).to.be.true;
	});

	var stockCalculator;
  var stockService;

  beforeEach(function(){
    stockService = new StockService();
    stockCalculator = new StockCalculator(stockService);
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

	it("should convert 12.34 to 1234", function(){
		expect(stockService.convertDecimalToWholeIntegerRepresentation(12.34)).to.eql(1234);
	});

	it("should convert 12.3 to 1230", function(){
		expect(stockService.convertDecimalToWholeIntegerRepresentation(12.3)).to.eql(1230);
	});

	it("should convert 12.345 to 1235", function(){
		expect(stockService.convertDecimalToWholeIntegerRepresentation(12.345)).to.eql(1235);
	});

  it("should call getStockPrice in stockservice when calculateNetAssetValue is called", function(){
    var stock = [{price: 100, count: 5}];

    var apiCalled = false;

    stockService.getStockPrice = function(stock){
      apiCalled = true;
      return stock;
    };

    stockCalculator.calculateNetAssetValue(stock);

    expect(apiCalled).to.be.true;
  });

  it("should get the asset value for one stock from getStockInformationService", function(){
    var ourStock = [{symbol : "XYZ1", count: 5}];

    stockService.getStockPrice = function(stock){
      var apiStockInfo = {symbol : "XYZ1", price: 100};
      stock.price = apiStockInfo.price;
      return stock;
    };

    expect(stockCalculator.calculateNetAssetValue(ourStock)).to.be.eql(500);
  });

  it("should calculate the asset value if the stock is valid in the stock information service", function(){
    var ourStock = [{symbol : "XYZ1", count: 5}];

    stockService.getStockPrice = function(stock){
      var apiStockInfo = {symbol : "XYZ1", price: 100};

      if (stock.symbol == apiStockInfo.symbol)
        stock.price = apiStockInfo.price;
      return stock;
    };
    expect(stockCalculator.calculateNetAssetValue(ourStock)).to.be.eql(500);
  });

  it("should throw an error if a stock does not exist in the stock information service", function(){
    var ourStock = [{symbol : "XYZI", count: 5}];

    stockService.getStockPrice = function(stock){
      var apiStockInfo = {symbol : "XYZ1", price: 100};

      if (stock.symbol != apiStockInfo.symbol)
        throw new Error("Stock does not exist");
    };

    var call = function(){stockCalculator.calculateNetAssetValue(ourStock);};

    expect(call).to.throw("Stock does not exist");
  });
});

describe('YahooStockService unit tests:', function(){
  var stockCalculator;

  beforeEach(function(){
    stockCalculator = new StockCalculator(YahooStockService);
  });

  it('should return a 200 status when trying to get data for TSLA', function(done){

    YahooStockService.getStockPrice({symbol: "TSLA"}, function(res){
      expect(res.status).to.eql(200);
      done();
    });
  });

  it('should return a 404 status when trying to get data for an invalid symbol', function(done){

    YahooStockService.getStockPrice({symbol: ""}, function(res){
      expect(res.status).to.eql(404);
      done();
    });
  });

});