const Writer = require('./writer');
const fs = require('fs-extra');

class FileWriter extends Writer{
	constructor(path, converter){
		super(converter);
		this.path = path;
		this.fileDescriptor;
	}

	open(){
		return fs.open(this.path, 'a')
			.then((fd) => {this.fileDescriptor = fd;});
	}

	writeContents(string){
		if(this.opened){
			return this.open()
				.then(() =>{
					fs.write(this.fileDescriptor, super.write(string));
				});
		}
	}

	read(){
		return fs.readFile(this.path, 'utf-8')
			.then((data) => data);
	}
	
	close(){
		return fs.close(this.fileDescriptor)
			.then(() => {this.opened = false;});
	}
}

module.exports = FileWriter;