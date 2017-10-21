const chai = require('chai');
const expect = chai.expect;
const StringWriter = require('../src/string-writer');

describe('string writer tests:', function(){

	let stringWriter;

	beforeEach(function(){
		stringWriter = new StringWriter();
	});

	it('should write to the buffer', function(){
		expect(stringWriter.write("Some string")).to.be.eql("Some string");
	});
});