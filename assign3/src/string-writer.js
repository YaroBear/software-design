class StringWriter{
	constructor(){
		this.contents = "";
		this.open = true;
	}

	write(string){
		if(this.open){
			this.contents += string;
		}
	}
	
	close(){
		this.open = false;
	}
}

module.exports = StringWriter;