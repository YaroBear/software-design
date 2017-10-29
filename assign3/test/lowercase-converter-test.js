const chai = require('chai');
const expect = chai.expect;

const lowerCaseConverter = require('../src/lowercase-converter');

describe('lowercase converter tests:', function(){

	it('should make the string lower case', function(){
		expect(lowerCaseConverter.toLowerCase("UPPERCASE")).to.eql("uppercase");
	});
});

const lowerCaseConverterTest = function(creator, cleanup){

	describe('lowercase converter integration tests:', function(){

		before(() => writer = creator());

		after(() => cleanup());

		it('should convert a string to lowercase and write', function(){

			return writer.write(lowerCaseConverter.toLowerCase("UPPerCase STRING"))
				.then(() => {
					return writer.read();
				})
				.then((data) =>{
					expect(data).to.be.eql("uppercase string");
				});
		});
	});

}

module.exports = lowerCaseConverterTest;