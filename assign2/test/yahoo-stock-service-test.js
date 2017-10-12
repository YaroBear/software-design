const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;
const YahooStockService = require('../src/yahoo-stock-service');
const StockCalculator = require('../src/stock-calculator');
const sinon = require('sinon');

describe('yahoo stock service tests:', function(){

	let yahooStockService;
	let sandbox;

	this.timeout(10000);

	beforeEach(function(){
		yahooStockService = new YahooStockService(10000);
	});

	it('should connect to the Yahoo stock service and get a response', function(){
		return expect(yahooStockService.getStockInfo('TSLA')).to.be.fulfilled;
	});

	it('should extract the price from a csv string', function(){
		let csvString = '"TSLA","Tesla, Inc.",352.50,354.39,353.10,355.33,356.88';

		expectedPrice = 35250;

		expect(yahooStockService.extractPrice(csvString)).to.be.equal(expectedPrice);
	});

	it('should get the stock price for TSLA', function(){ 
  		return expect(yahooStockService.getStockPrice('TSLA')).to.eventually.be.above(0);
	});

	it('should throw an error for an invalid symbol', function(){
		return expect(yahooStockService.getStockPrice('ABC123'))
			.to.be.rejectedWith('Invalid stock symbol');
	});

	it('should (mock) throw an error for network/timeout failure', function(){
		sandbox = sinon.sandbox.create();
		sandbox.stub(yahooStockService, 'getStockInfo')
			.withArgs('GOOG')
			.throws(new Error('Connection error/timeout'));

		let call = function() {yahooStockService.getStockPrice('GOOG')};

		expect(call).to.throw('Connection error/timeout');
		sandbox.restore();
	});

	it('should throw an error for network/timeout failure', function(){
		let quickYahoo = new YahooStockService(1);

		return expect(quickYahoo.getStockPrice('GOOG')).to.be.rejectedWith('Connection error/timeout');
	});

	it('should use the open price when bid price is unavailable', function(){
		let csvString = '"TSLA","Tesla, Inc.",N/A,354.39,353.10,355.33,356.88';

		expectedPrice = 35310;

		expect(yahooStockService.extractPrice(csvString)).to.be.equal(expectedPrice);
	});
});