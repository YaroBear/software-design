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
		expect(stockCalculator.convertDecimalToWholeIntegerRepresentation(12.34)).to.eql(1234);
	});

	it("should convert 12.3 to 1230", function(){
		expect(stockCalculator.convertDecimalToWholeIntegerRepresentation(12.3)).to.eql(1230);
	});

	it("should convert 12.345 to 1235", function(){
		expect(stockCalculator.convertDecimalToWholeIntegerRepresentation(12.345)).to.eql(1235);
	});

});

describe('mock api service tests:', function(){

  var stockCalculator;

  beforeEach(function(){
    stockCalculator = new StockCalculator();
  });

  it("should call getStockInfromationService when calculateNetAssetValue is called", function(){
    var stocks = [
      {price: 100, count: 5},
      {price: 200, count: 3},
      {price: 300, count: 2}
    ];

    var apiCalled = false;

    stockCalculator.getStockInformationFromService = function(stock){
      apiCalled = true;
      return stock;
    };

    stockCalculator.calculateNetAssetValue(stocks);

    expect(apiCalled).to.be.true;
  });

  it("should get the asset value for one stock from getStockInformationService", function(){
    var ourStock = [{symbol : "XYZ1", count: 5}];

    stockCalculator.getStockInformationFromService = function(stock){
      var apiStockInfo = {symbol : "XYZ1", price: 100};
      stock.price = apiStockInfo.price;
      return stock;
    };

    expect(stockCalculator.calculateNetAssetValue(ourStock)).to.be.eql(500);
  });

  it("should calculate the asset value if the stock is valid in the stock information service", function(){
    var ourStock = [{symbol : "XYZ1", count: 5}];

    stockCalculator.getStockInformationFromService = function(stock){
      var apiStockInfo = {symbol : "XYZ1", price: 100};

      if (stock.symbol == apiStockInfo.symbol)
        stock.price = stock.price = apiStockInfo.price;
      return stock;
    };
  });

  it("should throw an error if a stock does not exist in the stock information service", function(){
    var ourStock = [{symbol : "XYZI", count: 5}];

    stockCalculator.getStockInformationFromService = function(stock){
      var apiStockInfo = {symbol : "XYZ1", price: 100};

      if (stock.symbol != apiStockInfo.symbol)
        throw new Error("Stock does not exist");
    };

    var call = function(){stockCalculator.calculateNetAssetValue(ourStock);};

    expect(call).to.throw("Stock does not exist");
  });

});