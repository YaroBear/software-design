const request = require('request-promise-native');
const StockService = require('../src/stock-service');

class YahooStockService extends StockService {

	getStockPrice(symbol) {
	return request(`http://download.finance.yahoo.com/d/quotes.csv?s=${symbol}&f=snbaopl1`)
		.then(function(res){
			return res;
		});
	}

	convertCSVtoArray(csv) {
		return csv.split(',');
	}
}

module.exports = YahooStockService;