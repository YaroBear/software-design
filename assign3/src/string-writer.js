const Writer = require('../src/writer');

class StringWriter extends Writer {
	constructor(){
		super();
		this.buffer = "";
	}

	write(string){
		return this.buffer += string;
	}
}

module.exports = StringWriter;