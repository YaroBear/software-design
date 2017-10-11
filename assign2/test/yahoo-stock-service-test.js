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
		let csvString = '"TSLA","Tesla, Inc.",35250,35439,35310,35533,35688';

		expectedPrice = '35250'; //Venkat: should this be 3525000 ? keeping the price in cents as int than as double (until the last minutes before display) is generally a very safe bet. This will come to surface earlier in languages that are statically and stongly typed. JavaScript being a dynamic and weak typed langauge, it's easy to miss this early on.

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