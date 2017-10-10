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

	this.timeout(10000); //yahoo is extremely slow sometimes

	beforeEach(function(){
		sandbox = sinon.sandbox.create();
		yahooStockService = new YahooStockService();
	});

	afterEach(function() {
		sandbox.restore();
	});

	it('should connect to the Yahoo stock service and get a response', function(){
		return expect(yahooStockService.getStockInfo('TSLA')).to.be.fulfilled;
	});

	it('should extract the price from a csv string', function(){
		let csvString = '"TSLA","Tesla, Inc.",352.50,354.39,353.10,355.33,356.88';

		expectedPrice = '352.50';

		expect(yahooStockService.extractPrice(csvString)).to.be.equal(expectedPrice);
	});

	it('should get the stock price for TSLA', function(){ 
  		return expect(yahooStockService.getStockPrice('TSLA')).to.eventually.be.above(0);
	});

	it('should throw an error for an invalid symbol', function(){
		return expect(yahooStockService.getStockPrice('ABC123'))
			.to.be.rejectedWith('Invalid stock symbol');
	});

	it('should throw an error for network/timeout failure', function(){
		sandbox.stub(yahooStockService, 'getStockInfo')
			.withArgs('GOOG')
			.throws(new Error('Connection error/timeout'));

		let call = function() {yahooStockService.getStockPrice('GOOG')};

		expect(call).to.throw('Connection error/timeout'); 
	});	
});