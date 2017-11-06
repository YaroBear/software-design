class Player { 
	constructor(avatar){
		this.currentAvatar = avatar;
		this.transformRules;
	}

	performAction(){
		this.currentAvatar.action();
	}

	isValidTransformation(transformInto){
		if(Object.keys(this.transformRules[this.currentAvatar.constructor.name]).includes(transformInto.constructor.name)){
			return true;
		}
		else return false;
	}

	transform(differentAvatar){
		if(this.isValidTransformation(differentAvatar)){
			this.currentAvatar = differentAvatar;
		}
	}

	setRules(rules){
		this.transformRules = rules;
		return this;
	}
}

module.exports = Player;