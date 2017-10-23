const fs = require('fs-extra');

class FileWriter{
	constructor(path){
		this.path = path;
		this.fileDescriptor;
		this.opened = true;
	}

	open(){
		return fs.open(this.path, 'a')
			.then((fd) => {this.fileDescriptor = fd;});
	}

	write(string){
		if(this.opened){
			return this.open()
				.then(() =>{
					return fs.write(this.fileDescriptor, string);
				});
		}
	}
	
	close(){
		return fs.close(this.fileDescriptor)
			.then(() => {this.opened = false;});
	}
}

module.exports = FileWriter;