var StockCalculator = function(stockService){
  this.stockService = stockService;
};

StockCalculator.prototype.validate = function(stock){
  if (stock.price < 0 || stock.count < 0)
    throw new Error("Price/Count cannot be less than 0");
  return stock;
};
                          
//Venkat: This is unnecessary coupling. The calculateNetAssetValue was focused on computing. Now it has to deal with a dependency. Makes this method more complex than it should be.
StockCalculator.prototype.calculateNetAssetValue = function(stocks){
  return stocks
    .map(this.stockService.getStockPrice)
    .map(this.validate)
    .map(stock => stock.price * stock.count)
    .reduce((total, amount) => total + amount);
};

module.exports = StockCalculator;