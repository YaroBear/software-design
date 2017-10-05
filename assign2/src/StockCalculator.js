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
                                                                    
StockCalculator.prototype.getBidPriceFromService = function(symbol){ //Venkat: we can remove this function. We can do this.stockService.getStockPrice from the function that computes the asset values
	return this.stockService.getStockPrice(symbol);
};
                            
//Venkat: It is not clear what this function is returning
StockCalculator.prototype.getSummaryOfStocks = function(stocks){
  for (var i = 0; i < stocks.length; i++){
  	var symbol = stocks[i].symbol;
  	var stockPrice = this.getBidPriceFromService(symbol);
  	var assetValue = this.calculateNetAssetValue([{price: stockPrice, count: stocks[i].count}]);
  };  
};


//Nick:  new getAssetValues function.  Its very similar to the getSummaryOfStocks function above but it calls getStockPrice directly and returns the modified stocks array
StockCalculator.prototype.getAssetValues = function(stocks){
  for (var i = 0; i < stocks.length; i++){
    var stockPrice = this.stockService.getStockPrice(stocks[i].symbol);
    stocks[i].value = this.calculateNetAssetValue([{price: stockPrice, count: stocks[i].count}]);
  };  
  return stocks
}

module.exports = StockCalculator;
