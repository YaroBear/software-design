const request = require('request-promise-native');
const StockService = require('../src/stock-service');

class YahooStockService extends StockService {
  constructor(timeout){
    super();
    this.timeout = timeout;
  }
 
	getStockInfo(symbol) {
	return request(`http://download.finance.yahoo.com/d/quotes.csv?s=${symbol}&f=snbaopl1`, {timeout: this.timeout})
		.then(res =>{
			return res;
		}).catch(err =>{
      throw new Error("Connection error/timeout");
    });
	}

  extractPrice(csv) {
    let commasOutsideQuotes = /,(?=(?:[^"]*"[^"]*")*[^"]*$)/;
    let quotes = /['"]+/g;
    let stockInfo = csv.split(commasOutsideQuotes);
    if(stockInfo[2] != 'N/A') return stockInfo[2]*100;
    else if(stockInfo[4] != 'N/A') return stockInfo[4]*100;
    else return "N/A";
  }

  getStockPrice(symbol) {
    let that = this;
    return this.getStockInfo(symbol)
      .then(res =>{
        let stockPrice = that.extractPrice(res);
        if(stockPrice == 'N/A') throw new Error("Invalid stock symbol");
        return parseFloat(stockPrice);
      });
  }
}

module.exports = YahooStockService;

/*
if(stockInfo[2] == 'N/A' && stockInfo[4] == 'N/A') return stockInfo[2];
    else if(stockInfo[2] == 'N/A' && stockInfo[4] != 'N/A') return stockInfo[4]*100;
    return stockInfo[2]*100;
    */