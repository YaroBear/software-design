StockCalculator = require('../src/stock-calculator');
YahooStockService = require('../src/yahoo-stock-service');
FileReader = require('../src/file-reader');

const yahooStockService = new YahooStockService();
const stockCalculator = new StockCalculator(yahooStockService);
const fileReader = new FileReader();

var formatOutput = function(summary){
	let header = "Symbol  Shares  Net Asset Value\n";
	let line = "--------------------------------\n";

	console.log(header + line);

	summary.map(stock => {console.log(stock.symbol + '\t' + stock.count + '\t' + stock.value.toFixed(2))});

	let total = summary.map(stock => stock.value).reduce((total, value) => {return total + value});

	console.log(line + "Total: " + total.toFixed(2));
}


let stocks;

fileReader.readFile('../test/stock_ledger.txt')
	.then(file =>{
		return stocks = fileReader.parseFileIntoArrayOfStocks(file);
	}).then(stocks =>{
		return stockCalculator.getAssetValues(stocks);
	}).then(summary =>{
		formatOutput(summary);
	}).catch(err =>{
		console.log(err);
	});