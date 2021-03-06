const chai = require('chai');
const expect = chai.expect;

const StupidRemover = require('../../src/converters/stupid-remover');
const Converter = require('../../src/converter');

describe('stupid remover tests:', function(){

	it('should remove the word stupid from a string', function(){
		expect(StupidRemover.removeStupid("Some stupid text")).to.eql("Some s***** text");
	});
});

const stupidRemoverTest = function(creator, cleanup){

	describe('stupid remover integration tests:', function(){

		let writer;

		before(() => {
			writer = creator();
			writer.converter = new Converter(StupidRemover.removeStupid);
		});

		after(() => cleanup());

		it('should remove the word stupid from a string and write', function(){

			return writer.writeContents("some stupid TEXT")
				.then(() => {
					return writer.read();
				})
				.then((data) =>{
					expect(data).to.be.eql("some s***** TEXT");
				});
		});
	});

}

module.exports = stupidRemoverTest;