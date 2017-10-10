const chai = require('chai');
const expect = chai.expect;

const FileReader = require('../src/file-reader.js');

describe('file reader tests:', function(){

	let fileReader;

	beforeEach(function(){
		fileReader = new FileReader();
	});

	//it('should read a file', function(done){
	//	fileReader.readTheFile('stock_ledger.txt', function(err, data){
	//		console.log(data);
	//		expect(data).to.be.eql("GOOG 200\nTSLA 200");
	//		done();
	//	});
	//});
});