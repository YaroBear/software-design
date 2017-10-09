const request = require('request-promise-native');
const StockService = require('../src/stock-service');

class YahooStockService extends StockService {
  constructor(timeout = 2000){
    super();
    this.timeout = timeout;
  }

	getStockInfo(symbol) {
	return request(`http://download.finance.yahoo.com/d/quotes.csv?s=${symbol}&f=snbaopl1`, {timeout: this.timeout})
		.then(function(res){
			return res;
		}).catch(function(){
      throw new Error("Connection error/timeout");
    });
	}

  extractPrice(csv) {
    let commasOutsideQuotes = /,(?=(?:[^"]*"[^"]*")*[^"]*$)/;
    let quotes = /['"]+/g;
    let stockInfo = csv.split(commasOutsideQuotes);
    return stockInfo[2];
  }

  getStockPrice(symbol) {
    let that = this;
    return this.getStockInfo(symbol)
      .then(function(res){
        let stockPrice = that.extractPrice(res);
        if(stockPrice == 'N/A') throw new Error("Invalid stock symbol");
        return parseFloat(stockPrice);
      });
  }
}

module.exports = YahooStockService;