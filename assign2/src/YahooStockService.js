var request = require('request-promise-native');
var StockService = require('../src/StockService');

//Venkat: How about class YahooStockService extends StockService {...}

var YahooStockService = function(){
	StockService.call(this);
};

YahooStockService.prototype.getStockPrice = function(symbol){
	return request(`http://download.finance.yahoo.com/d/quotes.csv?s=${symbol}&f=snbaopl1`)
		.then(function(res){
			return res;
		});
};

YahooStockService.prototype.convertCSVtoArray = function(csv){
	return csv.split(',');
};

module.exports = YahooStockService;