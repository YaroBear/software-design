const Writer = require('./writer');

class StringWriter extends Writer{
	constructor(converter){
		super(converter);
		this.contents = "";
		this.open = true;
	}

	writeContents(string){
		return new Promise((resolve, reject) => {
			if(this.open){
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
		this.open = false;
	}
}

module.exports = StringWriter;