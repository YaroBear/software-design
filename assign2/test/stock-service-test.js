const chai = require('chai');
const expect = chai.expect;
const StockService = require('../src/stock-service');

describe('Get stock price test:', function(){

	let stockService = new StockService();

	it('should throw an error when getStockPrice is not implemented', function(){
		expect(function(){stockService.getStockPrice()}).to.throw("Not implemented");
	});
});