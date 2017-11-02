const chai = require('chai');
const expect = chai.expect;

const UpperCaseConverter = require('../../src/converters/uppercase-converter');
const Converter = require('../../src/converter');

describe('uppercase converter tests:', function(){

	it('should make the string upper case', function(){
		expect(UpperCaseConverter.toUpperCase("some text")).to.eql("SOME TEXT");
	});
});

const upperCaseConverterTest = function(creator, cleanup){

	describe('uppercase converter integration tests:', function(){

		let writer;

		before(() => {
			writer = creator();
			writer.converter = new Converter(UpperCaseConverter.toUpperCase);
		});

		after(() => cleanup());

		it('should convert a string to lowercase and write', function(){

			return writer.writeContents("some text")
				.then(() => {
					return writer.read();
				})
				.then((data) =>{
					expect(data).to.be.eql("SOME TEXT");
				});
		});
	});

}

module.exports = upperCaseConverterTest;