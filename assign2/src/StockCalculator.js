var StockCalculator = function(stockService){
  this.stockService = stockService;
};

StockCalculator.prototype.validate = function(stock){
  if (stock.price < 0 || stock.count < 0)
    throw new Error("Price/Count cannot be less than 0");
  return stock;
};

StockCalculator.prototype.calculateNetAssetValue = function(stocks){
  return stocks
    .map(this.validate)
    .map(stock => stock.price * stock.count)
    .reduce((total, amount) => total + amount);
};
                                                                    
StockCalculator.prototype.getBidPriceFromService = function(symbol){;
	return this.stockService.getStockPrice(symbol);
};

StockCalculator.prototype.getSummaryOfStocks = function(stocks){
    for (var i = 0; i < stocks.length; i++){
    	var symbol = stocks[i].symbol;
    	var stockPrice = this.getBidPriceFromService(symbol);
    	var assetValue = this.calculateNetAssetValue([{price: stockPrice, count: stocks[i].count}]);
    };  
};

module.exports = StockCalculator;
