class WriterUtility{
	constructor(writer, converter){
		this.writer = writer;
		this.converter = converter;
	}

	write(string){
		return this.writer.write(this.converter.convert(string));
	}

	read(){
		return this.writer.read();
	}
}

module.exports = WriterUtility;