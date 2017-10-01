var StockCalculator = function(){
	this.logs = []; //Venkat: Please remove, YAGNI
};

StockCalculator.prototype.calculateValue = function(price, count){
	if (price < 0 || count < 0)
		throw new Error("Price/Count cannot be less than 0");
	return price*count;
};

StockCalculator.prototype.calculateTotalForStocks = function(stocks){
	var total = 0;
	for(var stock in stocks){
		try {
			total += this.calculateValue(stocks[stock].price, stocks[stock].count);
		} catch(exception) {
			this.makeLog(stocks[stock].symbol, exception);
			continue;
		}
	}
	return total;
};

StockCalculator.prototype.makeLog = function(symbol, exception){ //Venkat: YAGNI
	var log = "Stock " + symbol + " " + exception;
	this.logs.push(log);
};

StockCalculator.prototype.getLogs = function(){  //Venkat: YAGNI
	return this.logs;
};

StockCalculator.prototype.convertDecimalToInteger = function(decimalValue){
	return decimalValue*100;  //Venkat: space around *, please
};

module.exports = StockCalculator;