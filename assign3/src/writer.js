class Writer{
	constructor(writer){
		this.writer = writer;
	}

	write(string){
		return this.writer.write(string);
	}

	close(){
		return this.writer.close();
	}
}

module.exports = Writer;