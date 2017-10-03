var StockService = function(){
};

StockService.prototype.getStockPrice = function(stock){
	return stock;
};

StockService.prototype.convertDecimalToWholeIntegerRepresentation = function(decimalValue){
	return decimalValue.toFixed(2) * 100;
};

module.exports = StockService;