const chai = require('chai');
const expect = chai.expect;
const Writer = require('../src/writer');

describe('writer tests:', function(){
	it('canary test', function(){
		expect(true).to.be.true;
	});

	let writer;

	beforeEach(function(){
		writer = new Writer();
	});

	it('write should throw not implemented error', function(){
		expect(function(){writer.write();}).to.be.throw("Not implemented");
	});
});