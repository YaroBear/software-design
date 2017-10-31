const chai = require('chai');
const expect = chai.expect;

const Converter = require('../src/converter');
const LowerCaseConverter = require('../src/converters/lowercase-converter.js');

describe('converter tests:', function(){

	const lowerCaseConverter = LowerCaseConverter.toLowerCase;

	it('should take a single instance of a converter in its constructor', function(){
		let converter = new Converter(lowerCaseConverter);

		expect(converter.converters[0]).to.be.eql(lowerCaseConverter);
	});

	it('should be able to chain any number of converter instances using and', function(){
		let converter = new Converter(lowerCaseConverter).and(lowerCaseConverter).and(lowerCaseConverter);

		expect(converter.converters.length).to.be.eql(3);
	});

	it('should apply all converter instances on a string', function(){
		let converter = new Converter(lowerCaseConverter).and(lowerCaseConverter);

		expect(converter.convert("Some TeXt")).to.be.eql("some text");
	});
});