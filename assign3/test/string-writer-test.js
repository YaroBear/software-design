const chai = require('chai');
const expect = chai.expect;
const StringWriter = require('../src/string-writer');

describe('string writer tests:', function(){
	it('canary test', function(){
		expect(true).to.be.true;
	});

	let stringWriter; //Venkat: let's move this to before the canary test

	beforeEach(function(){ //Venkat: Let's move this to before the canary test
		stringWriter = new StringWriter();
	});

	it('should write to contents', function(){
		stringWriter.write("Some string");
		expect(stringWriter.contents).to.be.eql("Some string");
	});

	it('should write multiple times', function(){
		stringWriter.write("Some string");
		stringWriter.write(" yet another one");
		stringWriter.write(" and one more for good measure");
		expect(stringWriter.contents).to.be.eql("Some string yet another one and one more for good measure");
	});

	it('should close contents after writing once', function(){
		stringWriter.write("Some string");
		stringWriter.close();
		stringWriter.write(" yet another one");

		expect(stringWriter.contents).to.be.eql("Some string");
	});

	it('should close contents before writing and leave contents empty', function(){
		stringWriter.close();
		stringWriter.write("Some string");

		expect(stringWriter.contents).to.be.eql("");
	});
});