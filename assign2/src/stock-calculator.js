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
    let stockPrice = this.stockService.getStockPrice(stock.symbol);
    const value = this.calculateNetAssetValue({price: stockPrice, count: stock.count});
    return {...stock, value };
    } catch(error) {
      return {...stock, error: error.message };
    }
  }
}

module.exports = StockCalculator;
