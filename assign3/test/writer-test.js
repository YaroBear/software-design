const chai = require('chai');
const expect = chai.expect;

const StringWriter = require('../src/string-writer'); //Venkat: Please remove
const FileWriter = require('../src/file-writer'); //Venkat: Please remove

const fs = require('fs-extra'); //Venkat: Please remove

const createTests = function(WriterClass) {
	describe('writer tests:', function(){

		const TEST_OUTPUT_FILE = './test.txt'; //Venkat: Please remove

		before(() => writer = new WriterClass(TEST_OUTPUT_FILE)); //Venkat: This does not make sense for a general case. So, let's rethink. 
		/*         
		Instead of passing in WriterClass, we may pass in a creator
		  writer = creator();
		*/

		if (WriterClass == FileWriter){ //Venkat: failure of OCP please remove. Instead, change createTests like so const createTests = function(creator, cleanup)
			after(() => fs.unlinkSync(TEST_OUTPUT_FILE)); //Venkat: after(() => cleanup());
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
