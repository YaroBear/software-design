const chai = require('chai');
const expect = chai.expect;

const LowerCaseConverter = require('../../src/converters/lowercase-converter');
const Converter = require('../../src/converter');

describe('lowercase converter tests:', function(){

	it('should make the string lower case', function(){
		expect(LowerCaseConverter.toLowerCase("Some TeXt")).to.eql("some text");
	});
});

const lowerCaseConverterTest = function(creator, cleanup){

	describe('lowercase converter integration tests:', function(){

		let writer;

		before(() => {
			writer = creator();
			writer.converter = new Converter(LowerCaseConverter.toLowerCase);
		});

		after(() => cleanup());

		it('should convert a string to lowercase and write', function(){

			return writer.writeContents("Some TeXt")
				.then(() => {
					return writer.read();
				})
				.then((data) =>{
					expect(data).to.be.eql("some text");
				});
		});
	});

}

module.exports = lowerCaseConverterTest;