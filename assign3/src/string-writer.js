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
		let words = this.contents.split(" ");
		this.contents = "";

		for (let i = 1; i < words.length; i++){
			if (words[i-1] != words[i]){
				this.contents += words[i-1];
				this.contents += " ";
				if (i == words.length - 1)
					this.contents += words[i];
			}
			if (words[i-1] == words[i] && i == words.length-1)
				this.contents += words[i];
		}
	}
}

module.exports = StringWriter;