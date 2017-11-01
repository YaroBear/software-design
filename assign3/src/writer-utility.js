class WriterUtility{   //Venkat: let's merge this with a Writer base class that both StringWriter and FileWriter inherit from. Then we don't need WriterUtility. The Writer will not know any specific converter, but will work with converter which is generic
	constructor(writer, converter){
		this.writer = writer;
		this.converter = converter;
	}
                 
//Venkat: we can move this intot he writer. It can call this.writeContents
//where writeContents is an abstract method implemented by StringWriter and
//FileWriter. That way the conversion happens in Writer(base) and the writing 
//happens in the derived.
	write(string){
		return this.writer.write(this.converter.convert(string));
	}

	read(){  //Venkat: This will not be needed as it is already (will be) in Writer
		return this.writer.read();
	}
}

module.exports = WriterUtility;