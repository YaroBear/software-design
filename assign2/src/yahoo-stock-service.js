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
        if(resArray[1] == 'N/A') throw new Error("Invalid stock symbol");
        return parseFloat(resArray[2]);
      });
  }

  
}

module.exports = YahooStockService;