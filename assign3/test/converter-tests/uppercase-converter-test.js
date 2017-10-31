const chai = require('chai');
const expect = chai.expect;

const UpperCaseConverter = require('../../src/converters/uppercase-converter');
const Converter = require('../../src/converter');
const WriterUtility = require('../../src/writer-utility');

describe('uppercase converter tests:', function(){

	it('should make the string upper case', function(){
		expect(UpperCaseConverter.toUpperCase("some text")).to.eql("SOME TEXT");
	});
});

const upperCaseConverterTest = function(creator, cleanup){

	describe('uppercase converter integration tests:', function(){

		before(() => writer = creator());

		after(() => cleanup());

		it('should convert a string to lowercase and write', function(){

			let converter = new Converter(UpperCaseConverter.toUpperCase);

			const writerUtility = new WriterUtility(writer, converter);

			return writerUtility.write("some text")
				.then(() => {
					return writerUtility.read();
				})
				.then((data) =>{
					expect(data).to.be.eql("SOME TEXT");
				});
		});
	});

}

module.exports = upperCaseConverterTest;