const chai = require('chai');
const expect = chai.expect;

const lowerCaseConverter = require('../src/lowercase-converter');

describe('lowercase converter tests:', function(){

	it('should make the string lower case', function(){
		expect(lowerCaseConverter.toLowerCase("UPPERCASE")).to.eql("uppercase");
		//Venkat: Let's change UPPERCASE to "Some TeXt"
	});
});

const lowerCaseConverterTest = function(creator, cleanup){

	describe('lowercase converter integration tests:', function(){

		before(() => writer = creator());

		after(() => cleanup());

		it('should convert a string to lowercase and write', function(){

//Venkat: this is not adequate. This is equivalent to
//const converted = lowerCaseConverter.toLowerCase("stuff");
//writer.write(converted)

//We want to design a way to pass zero, one, or more converters to a writer,
//and it should apply those conversions before writing the stuff given to it.


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