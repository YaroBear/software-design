const chai = require('chai');
const expect = chai.expect;

const writerUtil = require('../src/writer-utility');

describe('writer utility tests:', function(){

	it('should make the string lower case', function(){
		expect(writerUtil.toLowerCase("UPPERCASE")).to.eql("uppercase");
	});

	it('should make the string upper case', function(){
		expect(writerUtil.toUpperCase("lowercase")).to.eql("LOWERCASE");
	});

	it('should remove duplicates from the string', function(){
		expect(writerUtil.removeDuplicates("this this is is awesome")).to.eql("this is awesome");
	});

	it('should remove stupid from the string', function(){
		expect(writerUtil.removeStupid("this is stupid awesome")).to.eql("this is awesome");
	});
});