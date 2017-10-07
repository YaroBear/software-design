var StockService = function(){
};

StockService.prototype.getStockPrice = function(symbol){ 
 throw new Error('Not implemented');
};

//Venkat: How about
//class StockService {
//  getStockPrice() {
//    throw new Error("Not implemented");
//  }
//}                           

module.exports = StockService;