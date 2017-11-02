class Writer{
	constructor(converter){
		this.converter = converter;
		this.opened = true;
	}

	write(string){
		if (this.converter) return this.converter.convert(string);
		else return string;
	}
}

module.exports = Writer;