class Converter{
	constructor(converter){
		this.converters = [ converter ];
	}
	
	and(converter){
		this.converters.push(converter);
		return this;
	}

	convert(string){
		return this.converters.reduce((content, converter) => converter(content), string);
	}
}

module.exports = Converter;