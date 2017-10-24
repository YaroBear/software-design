const chai = require('chai');
const expect = chai.expect;
const StringWriter = require('../src/string-writer');

describe('string writer tests:', function(){
	let stringWriter; 

	beforeEach(function(){
		stringWriter = new StringWriter();
	});

	it('canary test', function(){
		expect(true).to.be.true;
	});

	it('should write to contents', function(){
		return stringWriter.write("this string")
			.then(() => {
				expect(stringWriter.contents).to.be.eql("this string");
			});
	});

	it('should write to contents multiple times', function(){
		return stringWriter.write("One string")
			.then(() => {
				stringWriter.write(", another string");
			})
			.then(() => {
				stringWriter.write(", and a third string");
			})
			.then(() => {
				expect(stringWriter.contents).to.be.eql("One string, another string, and a third string");
			});
	});

	it('should close contents after writing once', function(){
		return stringWriter.write("a string")
			.then(() => {
				stringWriter.close();
			})
			.then(() => {
				stringWriter.write(" another string");
			})
			.then(() => {
				expect(stringWriter.contents).to.be.eql("a string");
			});
	});
});