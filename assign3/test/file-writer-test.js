const chai = require('chai');
const expect = chai.expect;

const FileWriter = require('../src/file-writer');
const fs = require('fs-extra');

describe('file writer tests:', function(){

	let fileWriter;
  	const TEST_OUTPUT_FILE = './testoutput.txt';
  
	beforeEach(function(){
		fileWriter = new FileWriter(TEST_OUTPUT_FILE);
	});
	
	after(() => fs.unlinkSync(TEST_OUTPUT_FILE));

	it('should open and write to the file', function(){
		return fileWriter.write("some string")
			.then(() => {
				return fs.readFile(TEST_OUTPUT_FILE, 'utf-8')
			})
			.then((data) =>{
				expect(data).to.be.eql("some string");
			});
	});

	it('should be able to write to the file multiple times', function(){
		return fileWriter.write(" and another string")
			.then(() => {
				return fs.readFile(TEST_OUTPUT_FILE, 'utf-8')
			})
			.then((data) =>{
				expect(data).to.be.eql("some string and another string");
			});
	});

	it('should write and close the file', function(){
		return fileWriter.write(" another one")
			.then(() =>{
				return fileWriter.close()
			})
			.then(() =>{
				expect(fileWriter.opened).to.be.false;
			});
	});

	it('should write and close the file and reject writing again', function(){
		return fileWriter.write(" first")
			.then(() =>{
				return fileWriter.close()
			})
			.then(() =>{
				return fileWriter.write(" second")
			})
			.then(() =>{
				return fs.readFile(TEST_OUTPUT_FILE, 'utf-8')
			})
			.then((data) =>{
				expect(data).to.be.eql("some string and another string another one first");
			});
	});
});