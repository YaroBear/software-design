var StockCalculator = function(stockService){
  this.stockService = stockService;
};

StockCalculator.prototype.validate = function(stock){
  if (stock.price < 0 || stock.count < 0)
    throw new Error("Price/Count cannot be less than 0");
  return stock;
};

StockCalculator.prototype.validateSymbol = function(symbol) {
	if (symbol == '0000')
		throw new Error("Invalid ticker symbol");
}
                          
StockCalculator.prototype.calculateNetAssetValue = function(stocks){
  return stocks
    .map(this.validate)
    .map(stock => stock.price * stock.count)
    .reduce((total, amount) => total + amount);
};
                                                                    
//Venkat: Let's take one symbol here instead of an array or list and return the price for that one. symbol instead of stocks
StockCalculator.prototype.getBidPriceFromService = function(symbol){
	//return stocks.map(this.stockService.getStockPrice);
	
	this.validateSymbol(symbol);
	var price = this.stockService.getStockPrice(symbol);
	if (price == null)
		throw new Error('Error retrieving data for valid symbol')
	else
		return price
};

module.exports = StockCalculator;
