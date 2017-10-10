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
    let stockPromises = stocks.map(stock => this.getAssetValueForASymbol(stock));
    return Promise.all(stockPromises).then(result => result);
  }
               
  getAssetValueForASymbol(stock) {
    let stockPrice;
    return this.stockService.getStockPrice(stock.symbol)
      .then(stockPrice =>{
        const value = this.calculateNetAssetValue({price: stockPrice, count: stock.count});
        return {...stock, value };
      }).catch(error =>{
        return {...stock, error: error.message };
      });
  }
}

module.exports = StockCalculator;