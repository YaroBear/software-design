class WriterUtility{
	constructor(writer, converter){
		this.writer = writer;
		this.converter = converter;
	}

	write(string){
		let convertedString = this.converter.convert(string);
		return this.writer.write(convertedString);
		
		//Venkat: 
		/*
		return this.writer.write(this.converter.convert(string))
		*/
	}

	read(){
		return this.writer.read();
	}
}

module.exports = WriterUtility;