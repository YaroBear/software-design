const fs = require('fs');

class FileReader {
	readFile(){
		throw new Error("Not implemented");
	}

	parseFileIntoArray(file){
		let stocks = [];
		let splitUp = file.split('\n').map(x => x.split(" "));
		for(let i = 0; i < splitUp.length; i++){
			stocks.push({symbol: splitUp[i][0], count: parseInt(splitUp[i][1])});
		}
		return stocks;
	}
}

module.exports = FileReader;