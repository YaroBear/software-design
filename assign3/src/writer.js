class Writer{ //Venkat: Let's remove this, we can think of this when we need it.
	constructor(){
		this.buffer;
	}

	write(){
		throw new Error("Not implemented");
	}

}

module.exports = Writer;