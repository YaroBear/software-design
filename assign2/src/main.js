StockCalculator = require('../src/stock-calculator');
YahooStockService = require('../src/yahoo-stock-service');
FileReader = require('../src/file-reader');

const yahooStockService = new YahooStockService();
const stockCalculator = new StockCalculator(yahooStockService);
const fileReader = new FileReader();

let stocks;

fileReader.readFile('../test/stock_ledger.txt')
	.then(file =>{
		return stocks = fileReader.parseFileIntoArrayOfStocks(file);
	}).then(stocks =>{
		return stockCalculator.getAssetValues(stocks);
	}).then(res =>{
		console.log(res);
	}).catch(err =>{
		console.log(err);
	});