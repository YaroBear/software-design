const fs = require('fs-extra');

class FileWriter{
	constructor(path){
		this.path = /* __dirname + '/' + */ path; //Venkat: let the file given be of full path, no need for __dirname
		this.fileDescriptor;
	}

	open(){
		return fs.open(this.path, 'a')
			.then((fd) => {this.fileDescriptor = fd; return true;})
			.catch(() => {throw new Error("Directory does not exist")});
	}

	write(string){
		return fs.write(this.fileDescriptor, string)
			.then(() => true)
			.catch(() => {throw new Error("File is not open")});
	}
	
	close(){ //Venkat: this can set a flag that tells if the write should write or ignore contents.
		return fs.close(this.fileDescriptor)
			.then(() => true)
			.catch(() => {throw new Error("File is not open")});
	}
}

module.exports = FileWriter;