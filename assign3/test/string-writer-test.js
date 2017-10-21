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

	it('should write to content', function(){
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
});