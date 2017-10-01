var StockCalculator = function(){
};

StockCalculator.prototype.calculateNetAssetValue = function(stocks){
	var total = 0;
	for(var stock in stocks){
		if (stocks[stock].price < 0 || stocks[stock].count < 0)
			throw new Error("Price/Count cannot be less than 0");
		total += (stocks[stock].price * stocks[stock].count);
	}
	return total;
};

StockCalculator.prototype.convertDecimalToWholeIntegerRepresentation = function(decimalValue){
	return decimalValue.toFixed(2) * 100;
};

module.exports = StockCalculator;