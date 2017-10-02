var StockCalculator = function(){
};

StockCalculator.prototype.calculateNetAssetValue = function(stocks){
  var total = 0;
  for(var stock in stocks){
   if (stocks[stock].price < 0 || stocks[stock].count < 0)
     throw new Error("Price/Count cannot be less than 0");
   total += (stocks[stock].price * stocks[stock].count); //Venkat: we can remove ( and )
  }
  return total;

  //Venkat: How about?
  // var validate = function(stock) {
  //   if (stock.price < 0 || stock.count < 0)
  //     throw new Error("Price/Count cannot be less than 0");
  //   return stock;
  // }
  // 
  // return stocks
  //   .map(validate)
  //   .map(stock => stock.price * stock.count)
  //   .reduce((total, amount) => total + amount);
};

StockCalculator.prototype.convertDecimalToWholeIntegerRepresentation = function(decimalValue){
	return decimalValue.toFixed(2) * 100;
};

module.exports = StockCalculator;