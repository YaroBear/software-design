const chai = require('chai');
const expect = chai.expect;
const StringWriter = require('../src/string-writer');

describe('string writer tests:', function(){
	it('canary test', function(){
		expect(true).to.be.true;
	});

	let stringWriter;

	beforeEach(function(){
		stringWriter = new StringWriter();
	});

	it('should write to contents', function(){
		stringWriter.write("Some string");
		expect(stringWriter.contents).to.be.eql("Some string");
	});

	it('should read the content', function(){
		stringWriter.write("Some string");
		expect(stringWriter.read()).to.be.eql("Some string");
	});

	it('should write multiple times', function(){
		stringWriter.write("Some string");
		stringWriter.write(" yet another one");
		stringWriter.write(" and one more for good measure");
		expect(stringWriter.read()).to.be.eql("Some string yet another one and one more for good measure");
	});

	it('should close contents for writing', function(){
		stringWriter.close();
		let call =  function(){stringWriter.write("Some string");};

		expect(call).to.throw("Closed for writing");
	});

	it('should remove consecutive duplicate words from within a string', function(){
		stringWriter.write("string with with duplicates");

		stringWriter.removeDuplicates();

		expect(stringWriter.read()).to.be.eql("string with duplicates");
	});

	it('should remove consecutive duplicate words from the end of a string', function(){
		stringWriter.write("string with duplicates duplicates");

		stringWriter.removeDuplicates();

		expect(stringWriter.read()).to.be.eql("string with duplicates");
	});

	it('should remove multiple consecutive duplicate words within a string', function(){
		stringWriter.write("string with with with duplicates");

		stringWriter.removeDuplicates();

		expect(stringWriter.read()).to.be.eql("string with duplicates");
	});

	it('should only allow one instance of a word that is repeated many times', function(){
		stringWriter.write("duplicates duplicates duplicates duplicates duplicates");

		stringWriter.removeDuplicates();

		expect(stringWriter.read()).to.be.eql("duplicates");
	});
});