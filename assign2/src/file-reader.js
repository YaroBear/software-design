const fs = require('fs-extra');

class FileReader {
	readFile(file){
		return fs.readFile(__dirname+ "/"+ file, "utf-8")
			.then(data => data)
			.catch(err => {throw new Error("File does not exist")}); 
			//Venkat: nitpick
			//.catch(err => { throw new Error("File does not exist"); }); 
			
	}

	parseFileIntoArrayOfStocks(file){
     return file.replace('\r', '')
          .split('\n')
          .map(each => each.split(" "))
          .map(each => ({symbol: each[0], count: parseInt(each[1])}));
	}
}

module.exports = FileReader;