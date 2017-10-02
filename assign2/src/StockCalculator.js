var StockCalculator = function(){
};

StockCalculator.prototype.validate = function(stock){
  if (stock.price < 0 || stock.count < 0)
    throw new Error("Price/Count cannot be less than 0");
  return stock;
};

StockCalculator.prototype.calculateNetAssetValue = function(stocks){
  return stocks
    .map(this.getStockInformationFromService)
    .map(this.validate)
    .map(stock => stock.price * stock.count)
    .reduce((total, amount) => total + amount);
};

StockCalculator.prototype.convertDecimalToWholeIntegerRepresentation = function(decimalValue){
	return decimalValue.toFixed(2) * 100;
};

StockCalculator.prototype.getStockInformationFromService = function(stock){
  return stock;
};

module.exports = StockCalculator;