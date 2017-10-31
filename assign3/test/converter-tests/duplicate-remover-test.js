const chai = require('chai');
const expect = chai.expect;

const DuplicateRemover = require('../../src/converters/duplicate-remover');
const Converter = require('../../src/converter');
const WriterUtility = require('../../src/writer-utility');

describe('stupid remover tests:', function(){

	it('should remove the word stupid from a string', function(){
		expect(DuplicateRemover.removeDuplicates("some repetitive repetitive text")).to.eql("some repetitive text");
	});
});

const duplicateRemoverTest = function(creator, cleanup){

	describe('duplicate remover integration tests:', function(){

		before(() => writer = creator());

		after(() => cleanup());

		it('should remove duplicates from a string and write', function(){

			let converter = new Converter(DuplicateRemover.removeDuplicates);

			let writerUtility = new WriterUtility(writer, converter);

			return writerUtility.write("some repetitive repetitive text")
				.then(() => {
					return writerUtility.read();
				})
				.then((data) => {
					expect(data).to.be.eql("some repetitive text");
				});

		});
	});
}

module.exports = duplicateRemoverTest;