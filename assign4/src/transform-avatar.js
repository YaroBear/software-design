class TransformAvatar {
	constructor(rules){
		this.transformRules = rules;
	}

	isValidTransformation(currentAvatar, differentAvatar){
		if(Object.keys(this.transformRules[currentAvatar.constructor.name]).includes(differentAvatar.constructor.name)){
			return true;
		}
		else return false;
	}

	transform(currentAvatar, differentAvatar){
		if(this.isValidTransformation(currentAvatar, differentAvatar)){
			return differentAvatar;
		}
		else return currentAvatar;
	}

	setRules(rules){
		this.transformRules = rules;
	}
}

module.exports = TransformAvatar;