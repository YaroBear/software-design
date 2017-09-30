var fs = require('fs');

var StockCalculator = function(){

};

StockCalculator.prototype.calculateValue = function(price, count){
	return price*count;
};

StockCalculator.prototype.calculateTotalForStocks = function(stocks){
	var total = 0;
	for(var stock in stocks){
		total += this.calculateValue(stocks[stock].price, stocks[stock].count);
	}
	return total;
};

StockCalculator.prototype.readFile = function(filename) {
	fs.readFile(filename, function(error, data) {
		if(error)
			throw new Error("Cannot read file: %s", filename);
		return data;
	});
};

module.exports = StockCalculator;