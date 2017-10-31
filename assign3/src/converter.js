class Converter{
	constructor(converter){
		this.converters = [ converter ];
	}
	
	and(converter){
		this.converters.push(converter);
		return this;
	}

	convert(string){
    this.converters.forEach(converter => {string = converter(string)}); //Venkat: never modify what is given to a function, poor programming practice we should learn quickly to avoid
    return string;           
		                                
		//Venkat: 
		//return this.converters.reduce((content, converter) => converter(content), string);
	}
}

module.exports = Converter;