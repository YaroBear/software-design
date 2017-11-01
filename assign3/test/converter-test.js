const chai = require('chai');
const expect = chai.expect;

const Converter = require('../src/converter');
const LowerCaseConverter = require('../src/converters/lowercase-converter.js');
const StupidRemover = require('../src/converters/stupid-remover');
const DuplicateRemover = require('../src/converters/duplicate-remover');

describe('converter tests:', function(){

	const lowerCaseConverter = LowerCaseConverter.toLowerCase;
	const stupidRemover = StupidRemover.removeStupid;
	const duplicateRemover = DuplicateRemover.removeDuplicates;

	it('should take a single instance of a converter in its constructor', function(){
		let converter = new Converter(lowerCaseConverter);

		expect(converter.converters[0]).to.be.eql(lowerCaseConverter);
	});

	it('should be able to chain any number of converter instances using and', function(){
		let converter = new Converter(lowerCaseConverter).and(stupidRemover).and(duplicateRemover);

		expect(converter.converters.length).to.be.eql(3);
	});

	it('should apply all converter instances on a string', function(){
		let converter = new Converter(lowerCaseConverter).and(stupidRemover).and(duplicateRemover);

		expect(converter.convert("SOME stupid awesome REPETITIVE repetitive text")).to.be.eql("some s***** awesome repetitive text");
	});
});