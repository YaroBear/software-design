class StringWriter{
	constructor(){
		this.contents = "";
		this.open = true;
	}

	write(string){
		if(this.open){
			this.contents += string;
		}
		else throw new Error('Closed for writing');
	}

	read(){
		return this.contents;
	}
	
	close(){
		this.open = false;
	}
}

module.exports = StringWriter;