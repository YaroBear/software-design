class Rule{
	constructor(avatar){
		this.avatar = avatar;
		this.up;
		this.down;
	}
}

class TransformationRules{
	constructor(){
		this.head;
	}

	findLastRule(){
		let current = this.head;
			while(current.down != this.head){
				current = current.down;
		}
		return current;
	}

	setHeadTo(avatar){
		this.head = new Rule(avatar);
		this.head.down = this.head;
	}

	connectRulesAndSetLastToHead(lastRule, newRule){
		newRule.up = lastRule;
		newRule.down = this.head;
		this.head.up = newRule;
		lastRule.down = newRule;
	}

	addRule(avatar){
		if(!this.head){
			this.setHeadTo(avatar);
		}
		
		else{
			let lastRule = this.findLastRule();
			let newRule = new Rule(avatar);

			this.connectRulesAndSetLastToHead(lastRule, newRule);
		}
	}

	getAvatarRules(avatar){
		let current = this.head;
		let rules = {};
			while(current.down != this.head){
				if (current.avatar.constructor == avatar.constructor){
					rules["up"] = current.up.avatar;
					rules["down"] = current.down.avatar;
				}
				current = current.down;
			}
		return rules
	}
}

module.exports = TransformationRules;