var http = require('http');
var StockService = require('../src/StockService');
                                             
//Venkat: Please delete this file, we can revisit this later when we need it. We are not at that level of design yet.
var YahooStockService = new StockService();

YahooStockService.getStockPrice = function(stock, callback){
  var symbol = stock.symbol;

  http.get("http://download.finance.yahoo.com/d/quotes.csv?s=" + symbol + "&f=sb", (res) =>{
    var data = '';
    var response = {};

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      var stockJSON = this.convertCSVtoJSON(data);
      if(stockJSON.bid){
        response.status = 200;
        response.bid = stockJSON.bid;
        callback(response);
      }
      else{
        response.status = 404;
        callback(response);
      }
    });

    }).on("error", (err) => {
      throw err;
  });
};

YahooStockService.convertCSVtoJSON = function(csvString){
  var contents = csvString.replace('\n', '').split(',');
  var infoJSON = {};

  infoJSON.symbol = contents[0];
  infoJSON.bid = contents[1];
  return infoJSON;
};

module.exports = YahooStockService;