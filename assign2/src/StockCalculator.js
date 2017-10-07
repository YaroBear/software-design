var StockCalculator = function(stockService){
  this.stockService = stockService;
};

StockCalculator.prototype.validate = function(stock){
  if (stock.price < 0 || stock.count < 0)
    throw new Error("Price/Count cannot be less than 0");
  return stock;
};

StockCalculator.prototype.calculateNetAssetValue = function(stock){
  this.validate(stock);
  return stock.price * stock.count;
};
                                                                    
StockCalculator.prototype.getAssetValues = function(stocks){
    return stocks.map(stock => this.validateSymbolAndGetPrice(stock));
}

StockCalculator.prototype.validateSymbolAndGetPrice = function(stock){
      try{
      var stockPrice = this.stockService.getStockPrice(stock.symbol);
      stock.value = this.calculateNetAssetValue({price: stockPrice, count: stock.count});
    } catch(error) {
      if (error.message == 'Invalid stock symbol')
        stock.error = error.message;
      if (error.message == 'Failed to retrieve data')
        stock.error = error.message;
    }
    return stock;
}

module.exports = StockCalculator;
