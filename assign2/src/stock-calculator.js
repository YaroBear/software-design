class StockCalculator {
  constructor(stockService){
    this.stockService = stockService;
  }

  validate(stock) {
    if (stock.price < 0 || stock.count < 0)
      throw new Error("Price/Count cannot be less than 0");
    return stock;
  }

  calculateNetAssetValue(stock) {
    this.validate(stock);
    return stock.price * stock.count;
  }

  getAssetValues(stocks) {
    return stocks.map(stock => this.getAssetValueForASymbol(stock));
  }

  getAssetValueForASymbol(stock) {
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
}

module.exports = StockCalculator;
