const fs = require('fs-extra');

class FileReader {
	readFile(file){
		return fs.readFile(__dirname+ "/"+ file, "utf-8")
			.then(data => data) //Venkat: we can use arrow functions instead, like so
			.catch(function(err){          //Venkat: arrow functions here too
				throw new Error('File does not exist');
			});
	}

	parseFileIntoArrayOfStocks(file){
    let stocks = [];
    file.replace('\r', '')
     .split('\n')
     .map(each => each.split(" "))
     .map(each => stocks.push({symbol: each[0], count: parseInt(each[1])}));
    return stocks; //Venkat: avoid mutation from within map, that's a poor practice we should unlearn

    //Venkat: how about?
    // return file.replace('\r', '')
    //      .split('\n')
    //      .map(each => each.split(" "))
    //      .map(each => each[0])
    //      .map(symbol => ({symbol, count: parseInt(each[1])}));
	}
}

module.exports = FileReader;