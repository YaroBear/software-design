const chai = require('chai');
const expect = chai.expect;

const LowerCaseConverter = require('../src/lowercase-converter');
const Converter = require('../src/converter');
const WriterUtility = require('../src/writer-utility');

describe('lowercase converter tests:', function(){

	it('should make the string lower case', function(){
		expect(LowerCaseConverter.toLowerCase("Some TeXt")).to.eql("some text");
	});
});

const lowerCaseConverterTest = function(creator, cleanup){

	describe('lowercase converter integration tests:', function(){

		before(() => writer = creator());

		after(() => cleanup());

		it('should convert a string to lowercase and write', function(){

			let converter = new Converter(LowerCaseConverter.toLowerCase);

			const writerUtility = new WriterUtility(writer, converter);

			return writerUtility.write("Some TeXt")
				.then(() => {
					return writerUtility.read();
				})
				.then((data) =>{
					expect(data).to.be.eql("some text");
				});
		});
	});

}

module.exports = lowerCaseConverterTest;