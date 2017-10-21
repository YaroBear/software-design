class StringWriter{
	constructor(){
		this.contents = "";
	}

	write(string){
		this.contents += string;
	}

	read(){
		return this.contents;
	}
	
	//Venkat: let's write a method to return the content
}

module.exports = StringWriter;