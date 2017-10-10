const fs = require('fs-extra');

class FileReader {
	readFile(file){
		return fs.readFile(__dirname+ "/"+ file, "utf-8")
			.then(function(data){
				return data;
			}).catch(function(err){
				throw new Error('File does not exist');
			});
	}

	parseFileIntoArrayOfStocks(file){
		let stocks = [];
		file.replace('\r', '')
			.split('\n')
			.map(each => each.split(" "))
			.map(each => stocks.push({symbol: each[0], count: parseInt(each[1])}));
		return stocks;
	}
}

module.exports = FileReader;