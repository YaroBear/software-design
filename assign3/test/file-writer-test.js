const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const FileWriter = require('../src/file-writer');
describe('file writer tests:', function(){

	let fileWriter;
  const TEST_OUTPUT_FILE = './testoutput.txt';
  
	beforeEach(function(){
		fileWriter = new FileWriter(TEST_OUTPUT_FILE);
	});
	
	after(() => require('fs').unlinkSync(TEST_OUTPUT_FILE));

	// it('should open a file for writing', function(){ //Venkat: Let's remove this test, let open be an operation that is internal to the FileWriter.
	// 	return expect(fileWriter.open()).to.eventually.be.true;
	// });

	it('should open and write to the file', function(){
		return fileWriter.open()
			.then(() =>{
				return expect(fileWriter.write("some string")).to.eventually.be.true;
			});                                            
			
			//Venkat: Let's simplify this test. Avoid open. Make the tests here almost the same as tests in string-writer-test. Only the verification should be different, the rest of the steps should be the same.
			//Once write (a void function) is called, then read the file written to see if the content is present.
	});

	it('should open and close the file', function(){
		return fileWriter.open()
			.then(() =>{
				return expect(fileWriter.close()).to.eventually.be.true;
			});
	});

	it('should open, write, and close the file', function(){
		return fileWriter.open()
			.then(() =>{
				return fileWriter.write("another one");
			}).then(() =>{
				return expect(fileWriter.close()).to.eventually.be.true;
			});
	});

});