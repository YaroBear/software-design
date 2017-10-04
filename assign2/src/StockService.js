var StockService = function(){
};

//Venkat: symbol instead of stock
StockService.prototype.getStockPrice = function(symbol){ 
	throw new Error('Not implemented');
};

module.exports = StockService;