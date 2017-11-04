class Avatar {
	constructor(type){
		this.type = type;
		return this.type;
	}

	transform(type){
		this.type = type;
	}
}

module.exports = Avatar;