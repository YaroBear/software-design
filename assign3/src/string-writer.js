const Writer = require('./writer');

class StringWriter extends Writer{
	constructor(converter){
		super(converter);
		this.contents = ""; 
	}

	writeContents(string){
		return new Promise((resolve, reject) => {
			if(this.opened){
				this.contents += super.write(string);
			}
			resolve();
		});
	}

	read(){
		return new Promise((resolve, reject)=>{
			resolve(this.contents);
		});
	}
	
	close(){
		this.opened = false;
	}
}

module.exports = StringWriter;