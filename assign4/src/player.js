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
	}

	transformDown(){
		this.currentAvatar = this.rules.getAvatarRules(this.currentAvatar).down;
	}
}

module.exports = Player;