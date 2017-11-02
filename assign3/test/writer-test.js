const chai = require('chai');
const expect = chai.expect;

describe('Canary Test:', function(){

	it('canary test', function(){
		expect(true).to.be.true;
	});
});

const createTests = function(creator, cleanup) {

	describe('writer tests:', function(){

		before(() => writer = creator());

		after(() => cleanup());

		it('should open and write', function(){
			return writer.writeContents("some string")
				.then(() => {
					return writer.read();
				})
				.then((data) =>{
					expect(data).to.be.eql("some string");
				});
		});

		it('should be able to write multiple times', function(){
			return writer.writeContents(" and another string")
				.then(() => {
					return writer.read();
				})
				.then((data) =>{
					expect(data).to.be.eql("some string and another string");
				});
		});

		it('should write and close and reject writing again', function(){
			return writer.writeContents(" first")
				.then(() =>{
					return writer.close()
				})
				.then(() =>{
					return writer.writeContents(" second")
				})
				.then(() =>{
					return writer.read();
				})
				.then((data) =>{
					expect(data).to.be.eql("some string and another string first");
				});
		});
	});
}

module.exports = createTests;
