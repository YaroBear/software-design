const fs = require('fs-extra');

class FileWriter{
	constructor(path){
		this.path = __dirname + '/' + path;
		this.fileDescriptor;
	}

	open(){
		return fs.open(this.path, 'a')
			.then((fd) => {this.fileDescriptor = fd; return true;});
	}

	write(string){
		return fs.write(this.fileDescriptor, string)
			.then(() => true)
			.catch(() => {throw new Error("File is not open")});
	}
	
	close(){
		return fs.close(this.fileDescriptor)
			.then(() => true)
			.catch(() => {throw new Error("File is not open")});
	}
}

module.exports = FileWriter;