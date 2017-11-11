class TransformationRules{
	constructor(rules){
		this.rulesArray = rules;
	}

	upFrom(currentAvatar){
		for (let i=0;i<this.rulesArray.length;i++){
			if(this.rulesArray[i].constructor.name == currentAvatar.constructor.name)
				return this.rulesArray[(i+1)%this.rulesArray.length];
		}
	}

	downFrom(currentAvatar){
		for (let i=0;i<this.rulesArray.length;i++){
			if(this.rulesArray[i].constructor.name == currentAvatar.constructor.name)
				return this.rulesArray[(i+4-1)%this.rulesArray.length];
		}
	}

	getRule(index){
		return this.rulesArray[index];
	}

	changeRules(newRules){
		this.rulesArray = newRules;
	}
}

module.exports = TransformationRules;