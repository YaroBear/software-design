const fs = require('fs');

class FileReader {
	readTheFile(file){
		fs.readFile(__dirname+'/stock_ledger.txt', "utf8", function(err, data){
			if(err) throw err;
			return data;
		});
	}

	parseFileIntoArray(file){  //Venkat: is this file or linesInFile?
		let stocks = [];
		let splitUp = file.split('\n').map(x => x.split(" "));
		for(let i = 0; i < splitUp.length; i++){
			stocks.push({symbol: splitUp[i][0], count: parseInt(splitUp[i][1])});
		}             
		//Venkat: should we use map instead of for here?
		return stocks;
	}
}

module.exports = FileReader;