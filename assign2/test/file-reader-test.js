const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const FileReader = require('../src/file-reader.js');

describe('file reader tests:', function(){

	let fileReader;

	beforeEach(function(){
		fileReader = new FileReader();
	});


	it('should read a file', function(){
		return expect(fileReader.readFile('../test/stock_ledger.txt')).to.eventually.eql("GOOG 200\r\nTSLA 200");
	});

	it('should throw an error for a file that doesnt exist', function(){
		return expect(fileReader.readFile('nonexistfile.txt')).to.eventually.be.rejectedWith("File does not exist");
	});

	it('should parse the file into an array of stocks', function(){
		return fileReader.readFile('../test/stock_ledger.txt')
			.then(function(file){
				expect(fileReader.parseFileIntoArrayOfStocks(file)).to.be.eql([{symbol: "GOOG", count: 200}, {symbol: "TSLA", count: 200}]);
			});
	});
});