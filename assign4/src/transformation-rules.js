class TransformationRules{ //Venkat: Transformations instead of TransformationRules
	constructor(rules){
		this.rulesArray = rules; //Venkat: rulesArray to rules
	}

	upFrom(currentAvatar){
    for (let i=0;i<this.rulesArray.length;i++){
     if(this.rulesArray[i].constructor.name == currentAvatar.constructor.name)
       return this.rulesArray[(i+1)%this.rulesArray.length];
    }
    
    //Venkat: How about?
    // const matchingAvatar = this.rulesArray.find(avatar => avatar.constructor.name === currentAvatar.constructor.name)
    // 
    //     const index = this.rulesArray.indexOf(matchingAvatar)
    //     return this.rulesArray[ (index + 1) % this.rulesArray.length];
	}

	downFrom(currentAvatar){
		for (let i=0;i<this.rulesArray.length;i++){
			if(this.rulesArray[i].constructor.name == currentAvatar.constructor.name)
				return this.rulesArray[(i+this.rulesArray.length-1)%this.rulesArray.length];
		}
	}

	getRule(index){ //getAvatarAt
		return this.rulesArray[index];
	}

	changeRules(newRules){ //Venkat: Remove
		this.rulesArray = newRules;
	}
}

module.exports = TransformationRules;