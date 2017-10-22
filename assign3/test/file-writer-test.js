const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const FileWriter = require('../src/file-writer');
describe('file writer tests:', function(){

	let fileWriter;

	beforeEach(function(){
		fileWriter = new FileWriter('../files/file.txt');
	});

	it('should open a file for writing', function(){
		return expect(fileWriter.open()).to.eventually.be.true;
	});

	it('should open and write to the file', function(){
		return fileWriter.open()
			.then(() =>{
				return expect(fileWriter.write("some string")).to.eventually.be.true;
			});
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

	it('should throw an error when closing a file that is not open', function(){
		return expect(fileWriter.close()).to.eventually.be.rejectedWith("File is not open");
	});

	it('should throw an error when writing to a file that is not open', function(){
		return expect(fileWriter.write("Some string")).to.eventually.be.rejectedWith("File is not open");
	});

	it('should throw an error when opening a directory that does not exist', function(){
		fileWriter = new FileWriter('../doesnt_exist/file.txt');
		return expect(fileWriter.open()).to.eventually.be.rejectedWith("Directory does not exist");
	});

});