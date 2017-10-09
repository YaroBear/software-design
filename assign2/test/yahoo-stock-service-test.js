const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;
const YahooStockService = require('../src/yahoo-stock-service');
const StockCalculator = require('../src/stock-calculator');

describe('yahoo stock service tests:', function(){

	let yahooStockService;

	beforeEach(function(){
		yahooStockService = new YahooStockService();
	});

	it('should connect to the Yahoo stock service and get a response', function(){
		return expect(yahooStockService.getStockInfo('TSLA')).to.be.fulfilled;
	});

	it('should convert a csv string into an array', function(){
		let csvString = '"TSLA","Tesla, Inc.",352.50,354.39,353.10,355.33,356.88';
		let csvArray = yahooStockService.convertCSVtoArray(csvString);
		expect(csvArray).to.be.an('array');
	});

	it('should retrieve the correct stock info for TSLA', function(){
		return expect(yahooStockService.getStockInfo('TSLA')).to.be.fulfilled
			.then(function(res){
				let resArray = yahooStockService.convertCSVtoArray(res);
				expect(resArray[1]).to.eql('Tesla, Inc.');
			});
	});

	it('should get the stock price for TSLA', function(){
		return expect(yahooStockService.getStockPrice('TSLA')).to.be.fulfilled
			.then(function(price){
				expect(typeof price).to.be.eql("number");
			});
	});

	it('should throw an error for an invalid symbol', function(){
		return expect(yahooStockService.getStockPrice('ABC123'))
			.to.be.rejectedWith('Invalid stock symbol');
	});

	// To Venkat: should we use mock-require to override request.defaults({timeout: 1})
	// instead of setting the timeout as part of the YahooStockService constructor?
	// https://github.com/request/request#convenience-methods
	it('should throw an error for network/timeout failure', function(){
		let quickTimeYahooService = new YahooStockService(1);
		return expect(quickTimeYahooService.getStockInfo('GOOG'))
			.to.be.rejectedWith('Connection error/timeout')
	});
	
});