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

	it('should read the content', function(){ //Venkat: Please remove
		stringWriter.write("Some string");
		expect(stringWriter.read()).to.be.eql("Some string");
	});

	it('should write multiple times', function(){
		stringWriter.write("Some string");
		stringWriter.write(" yet another one");
		stringWriter.write(" and one more for good measure");
		expect(stringWriter.read()).to.be.eql("Some string yet another one and one more for good measure"); //Venkat: stringWriter.contents instead of stringWriter.read()
	});

	it('should close contents for writing', function(){ //Venkat: please remove
		stringWriter.close();
		let call =  function(){stringWriter.write("Some string");};

		expect(call).to.throw("Closed for writing");
	});

//Venkat: let's call write, close, and then write. Check the contents contains only stuff from the first write and not the second.
//Then another test, close, write, check the contents is empty string

//Venkat: Please remove all tests below this. Violates OCP. If we decide to add another such function, we have to keep changing this class. We want to make this extensible, instead.
	it('should remove multiple consecutive duplicate words within a string', function(){
		stringWriter.write("string with with with duplicates");

		stringWriter.removeDuplicates();

		expect(stringWriter.read()).to.be.eql("string with duplicates");
	});

	it('should remove consecutive duplicate words from the end of a string', function(){
		stringWriter.write("string with duplicates duplicates");

		stringWriter.removeDuplicates();

		expect(stringWriter.read()).to.be.eql("string with duplicates");
	});

	it('should only allow one instance of a word that is repeated many times', function(){
		stringWriter.write("duplicates duplicates duplicates duplicates duplicates");

		stringWriter.removeDuplicates();

		expect(stringWriter.read()).to.be.eql("duplicates");
	});
});