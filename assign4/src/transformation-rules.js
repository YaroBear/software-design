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

	addRule(avatar){
		if(!this.head){
			this.head = new Rule(avatar);
			this.head.down = this.head;
		}
		
		else{
			let current = this.head;
			while(current.down != this.head){
				current = current.down;
			}
			let rule = new Rule(avatar);
			rule.up = current;
			rule.down = this.head;
			current.down = rule;
		}
	}
}

module.exports = TransformationRules;