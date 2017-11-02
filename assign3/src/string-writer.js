const Writer = require('./writer');

class StringWriter extends Writer{
	constructor(converter){
		super(converter);
		this.contents = ""; 
		this.open = true;   //Venkat: Move to the base, no need to repeat in FileWriter
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