const request = require('request-promise-native');
const StockService = require('../src/stock-service');

class YahooStockService extends StockService {

	getStockInfo(symbol) {
	return request(`http://download.finance.yahoo.com/d/quotes.csv?s=${symbol}&f=snbaopl1`)
		.then(function(res){
			return res;
		});
	}

	convertCSVtoArray(csv) {
    let commasOutsideQuotes = /,(?=(?:[^"]*"[^"]*")*[^"]*$)/;
    let quotes = /['"]+/g;
		return csv.split(commasOutsideQuotes)
      .map(index => index.replace(quotes, ''));
	}

  getStockPrice(symbol) {
    let that = this;
    return this.getStockInfo(symbol)
      .then(function(res){
        let resArray = that.convertCSVtoArray(res);
        return parseFloat(resArray[2]);
      });
  }

  
}

module.exports = YahooStockService;