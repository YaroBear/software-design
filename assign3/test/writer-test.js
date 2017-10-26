const chai = require('chai');
const expect = chai.expect;

const Writer = require('../src/writer');
const StringWriter = require('../src/string-writer');
const FileWriter = require('../src/file-writer');

const fs = require('fs-extra');

// confused, how do we eliminate duplicae tests if each test requires either the string-writer or file-writer class?

describe('writer(fileWriter) tests:', function(){

	it('canary test', function(){
		expect(true).to.be.true;
	});

	let writer;
	let fileWriter;
	const TEST_OUTPUT_FILE = './test.txt';

	beforeEach(function(){
		fileWriter = new FileWriter(TEST_OUTPUT_FILE);

		writer = new Writer(fileWriter);
	});

	after(() => fs.unlinkSync(TEST_OUTPUT_FILE));

	it('should open and write to the file', function(){
		return writer.write("some string")
			.then(() => {
				return fs.readFile(TEST_OUTPUT_FILE, 'utf-8')
			})
			.then((data) =>{
				expect(data).to.be.eql("some string");
			});
	});

	it('should be able to write to the file multiple times', function(){
		return writer.write(" and another string")
			.then(() => {
				return fs.readFile(TEST_OUTPUT_FILE, 'utf-8')
			})
			.then((data) =>{
				expect(data).to.be.eql("some string and another string");
			});
	});

	it('should write and close the file and reject writing again', function(){
		return writer.write(" first")
			.then(() =>{
				return writer.close()
			})
			.then(() =>{
				return writer.write(" second")
			})
			.then(() =>{
				return fs.readFile(TEST_OUTPUT_FILE, 'utf-8')
			})
			.then((data) =>{
				expect(data).to.be.eql("some string and another string first");
			});
	});
});

describe('writer(stringWriter) tests:', function(){

	let writer;
	let stringWriter;

	beforeEach(function(){
		stringWriter = new StringWriter();

		writer = new Writer(stringWriter);
	});

	it('should write to contents', function(){
		return writer.write("this string")
			.then(() => {
				expect(stringWriter.contents).to.be.eql("this string");
			});
	});

	it('should write to contents multiple times', function(){
		return writer.write("One string")
			.then(() => {
				writer.write(", another string");
			})
			.then(() => {
				writer.write(", and a third string");
			})
			.then(() => {
				expect(stringWriter.contents).to.be.eql("One string, another string, and a third string");
			});
	});

	it('should close contents after writing once', function(){
		return writer.write("a string")
			.then(() => {
				writer.close();
			})
			.then(() => {
				writer.write(" another string");
			})
			.then(() => {
				expect(stringWriter.contents).to.be.eql("a string");
			});
	});

	
});