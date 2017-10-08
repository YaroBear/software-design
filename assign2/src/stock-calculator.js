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
               
//Venkat: Instead of mutating the given stock let's create a new one
  getAssetValueForASymbol(stock) {
    try{
    let stockPrice = this.stockService.getStockPrice(stock.symbol);
    stock.value = this.calculateNetAssetValue({price: stockPrice, count: stock.count});
    //Venkat: 
    //const value = this.calculateNetAssetValue({price: stockPrice, count: stock.count});
    //return {...stock, value };
    } catch(error) {
      if (error.message == 'Invalid stock symbol')
        stock.error = error.message;
      if (error.message == 'Failed to retrieve data')
        stock.error = error.message;
        
      //Venkat: entire body of the catch can be replaced with this one line
      //return {...stock, error; error.message };
    }
    return stock; //Venkat: we can remove this line now
  }
}

module.exports = StockCalculator;