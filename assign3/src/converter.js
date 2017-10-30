class Converter{
	constructor(converter){
		this.converters = [converter];
	}
	
	and(converter){
		this.converters.push(converter);
		return this;
	}

	convert(string){
		this.converters.forEach(converter => {string = converter(string)});
		return string;
	}
}

module.exports = Converter;