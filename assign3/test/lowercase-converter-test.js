const chai = require('chai');
const expect = chai.expect;

const lowerCaseConverter = require('../src/lowercase-converter');

describe('lowercase converter tests:', function(){

	it('should make the string lower case', function(){
		expect(lowerCaseConverter.toLowerCase("UPPERCASE")).to.eql("uppercase");
	});

});

const lowerCaseConversionTests = function(creator, cleanup){
	describe('lowercase conversion writer tests:', function(){

		before(() => writer = creator());

		after(() => cleanup());

		it('should convert a string to lowercase and write', function(){

			let string = "UppERcase STRING";

			return writer.write(lowerCaseConverter.toLowerCase(string))
				.then(() => {
					return writer.read();
				})
				.then((data) =>{
					expect(data).to.be.eql("uppercase string");
				});
		});
	});
}

module.exports = lowerCaseConversionTests;