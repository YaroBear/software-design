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

	removeDuplicates(){
		this.contents = this.contents.split(" ")
			.filter((word, index, array) => {if (word != array[index + 1]) return word})
			.join(" ");
	}
}

module.exports = StringWriter;