const chai = require('chai');
const expect = chai.expect;

const fs = require('fs');
const mockfs = require('mock-fs');

const FileReader = require('../src/file-reader.js');

describe('mock file reader tests', function(){

	let fileReader;

	beforeEach(function(){
		fileReader = new FileReader;

		mockfs({
			'path/to/file.txt': "GOOG 200\nTSLA 200"
		});
	});

	afterEach(function() {
		mockfs.restore();
	});

	// can't pass mock file system into file-reader.js
	it('should read a file', function(done){
		fs.readFile('path/to/file.txt',"utf8", function(err, data){
			expect(data).to.be.eql("GOOG 200\nTSLA 200");
			done();
		});
	});

	it('should read a file into an array of stocks and their counts', function(done){
		let expected = [{symbol: 'GOOG', count: 200}, {symbol: 'TSLA', count: 200}];

		fs.readFile('path/to/file.txt',"utf8", function(err, data){
			expect(fileReader.parseFileIntoArray(data)).to.be.eql(expected);
			done();
		});
	});

	it('should throw an error for readFile not being implemented', function(){
		expect(function(){fileReader.readFile()}).to.throw("Not implemented");
	});
});