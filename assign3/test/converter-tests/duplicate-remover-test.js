const chai = require('chai');
const expect = chai.expect;

const DuplicateRemover = require('../../src/converters/duplicate-remover');
const Converter = require('../../src/converter');

const StringWriter = require('../../src/string-writer');

describe('stupid remover tests:', function(){

	it('should remove the word stupid from a string', function(){
		expect(DuplicateRemover.removeDuplicates("some repetitive repetitive text")).to.eql("some repetitive text");
	});
});

const duplicateRemoverTest = function(creator, cleanup){

	describe('duplicate remover integration tests:', function(){

		let writer;

		before(() => {
			writer = creator();
			writer.converter = new Converter(DuplicateRemover.removeDuplicates);
		});

		after(() => cleanup());

		it('should remove duplicates from a string and write', function(){

			return writer.writeContents("some repetitive repetitive text")
				.then(() => {
					return writer.read();
				})
				.then((data) => {
					expect(data).to.be.eql("some repetitive text");
				});

		});
	});
}

module.exports = duplicateRemoverTest;