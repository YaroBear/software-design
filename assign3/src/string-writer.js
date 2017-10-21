const Writer = require('../src/writer'); //Venkat: Please remove

class StringWriter extends Writer { //Venkat: YAGNI, remove Writer. Bring later only if and when needed
	constructor(){
		super(); //Venkat: remove
		this.buffer = ""; //Venkat: contents instead of buffer
	}

	write(string){
		return this.buffer += string; //Venkat: no return from here.
	}                           
	
	//Venkat: let's write a method to return the content
}

module.exports = StringWriter;