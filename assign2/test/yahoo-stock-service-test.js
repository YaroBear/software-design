const chai = require('chai');
const expect = chai.expect;
const YahooStockService = require('../src/yahoo-stock-service');
const StockCalculator = require('../src/stock-calculator');

describe('yahoo stock service tests:', function(){

	let yahooStockService;

	beforeEach(function(){
		yahooStockService = new YahooStockService();
	});

	it('should connect to the Yahoo stock service and get a response', function(){
		let response = false;
		return yahooStockService.getStockInfo('TSLA')
			.then(function(res){
				if (res) response = true;
				expect(response).to.be.true;
		});
	});

	it('should convert the csv from YahooStockService into an array', function(){
		return yahooStockService.getStockInfo('TSLA')
			.then(function(res){
				let resArray = yahooStockService.convertCSVtoArray(res);
				expect(resArray).to.be.an('array');
		});
	});

	it('should retrieve the correct stock info for TSLA', function(){
		return yahooStockService.getStockInfo('TSLA')
			.then(function(res){
				let resArray = yahooStockService.convertCSVtoArray(res);
				expect(resArray[1]).to.eql('Tesla, Inc.');
			});
	});

	it('should get the stock price for TSLA', function(){
		return yahooStockService.getStockPrice('TSLA')
			.then(function(price){
				expect(typeof price).to.be.eql("number");
			});
	});
});