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
                                                                    
StockCalculator.prototype.getAssetValues = function(stocks){
  for (var i = 0; i < stocks.length; i++){
    try{
      var stockPrice = this.stockService.getStockPrice(stocks[i].symbol);
      stocks[i].value = this.calculateNetAssetValue([{price: stockPrice, count: stocks[i].count}]);
    } catch(error) {
      if (error.message == 'Invalid stock symbol')
        stocks[i].value = error.message;
      if (error.message == 'Failed to retrieve data')
        stocks[i].value = error.message;
    }
  }  
  return stocks
}

module.exports = StockCalculator;
