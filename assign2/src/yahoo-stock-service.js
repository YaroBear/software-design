const request = require('request-promise-native');
const StockService = require('../src/stock-service');

class YahooStockService extends StockService {
 
	getStockInfo(symbol) {
	return request(`http://download.finance.yahoo.com/d/quotes.csv?s=${symbol}&f=snbaopl1`)
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
    if(stockInfo[2] == 'N/A') return stockInfo[4]; //market closed, used open price instead of bid
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