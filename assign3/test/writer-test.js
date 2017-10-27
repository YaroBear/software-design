const chai = require('chai');
const expect = chai.expect;

const StringWriter = require('../src/string-writer');
const FileWriter = require('../src/file-writer');

const fs = require('fs-extra');

const createTests = function(WriterClass) {
	describe('writer tests:', function(){

		const TEST_OUTPUT_FILE = './test.txt';

		before(() => writer = new WriterClass(TEST_OUTPUT_FILE));

		if (WriterClass == FileWriter){
			after(() => fs.unlinkSync(TEST_OUTPUT_FILE));
		}

		it('canary test', function(){
			expect(true).to.be.true;
		});

		it('should open and write', function(){
			return writer.write("some string")
				.then(() => {
					return writer.read();
				})
				.then((data) =>{
					expect(data).to.be.eql("some string");
				});
		});

		it('should be able to write multiple times', function(){
			return writer.write(" and another string")
				.then(() => {
					return writer.read();
				})
				.then((data) =>{
					expect(data).to.be.eql("some string and another string");
				});
		});

		it('should write and close and reject writing again', function(){
			return writer.write(" first")
				.then(() =>{
					return writer.close()
				})
				.then(() =>{
					return writer.write(" second")
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
