const chai = require('chai');
const expect = chai.expect;

const StupidRemover = require('../../src/converters/stupid-remover');
const Converter = require('../../src/converter');
const WriterUtility = require('../../src/writer-utility');

describe('stupid remover tests:', function(){

	it('should remove the word stupid from a string', function(){
		expect(StupidRemover.removeStupid("Some stupid text")).to.eql("Some s***** text");
	});
});

const stupidRemoverTest = function(creator, cleanup){

	describe('stupid remover integration tests:', function(){

		before(() => writer = creator());

		after(() => cleanup());

		it('should remove the word stupid from a string and write', function(){

			let converter = new Converter(StupidRemover.removeStupid);

			const writerUtility = new WriterUtility(writer, converter);

			return writerUtility.write("some stupid TEXT")
				.then(() => {
					return writerUtility.read();
				})
				.then((data) =>{
					expect(data).to.be.eql("some s***** TEXT");
				});
		});
	});

}

module.exports = stupidRemoverTest;