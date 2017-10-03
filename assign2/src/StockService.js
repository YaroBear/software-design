var StockService = function(){
};

StockService.prototype.getStockPrice = function(stock){
	return stock; //Venkat: Let's change this to 
	//throw new Error('Not implemented');
};

//Venkat: Let's remove this function, we may not need it or at least not clear how we may actually use it. Let's worry about this when we really need it. Right now the values sent to calculateNetAssetValue are all integers, to we will take a look at this concern later.
StockService.prototype.convertDecimalToWholeIntegerRepresentation = function(decimalValue){
	return decimalValue.toFixed(2) * 100;
};

module.exports = StockService;