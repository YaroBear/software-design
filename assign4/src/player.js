class Player { 
	constructor(avatar, rules){
		this.currentAvatar = avatar;
		this.rules = rules;
	}

	performAction(){
		this.currentAvatar.action();
	}

	transformUp(){
		this.currentAvatar = this.rules.getAvatarRules(this.currentAvatar).up;
		//Venkat: this.rules.upFrom(this.currentAvatar); will be nice?
	}

	transformDown(){
		this.currentAvatar = this.rules.getAvatarRules(this.currentAvatar).down;
		//Venkat: this. rules.downFrom(this.currentAvatar); ?
	}
}

module.exports = Player;