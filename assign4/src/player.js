class Player { 
	constructor(avatar, rules){
		this.currentAvatar = avatar;
		this.rules = rules;
	}

	performAction(){
		this.currentAvatar.action();
	}

	transformUp(){
		this.currentAvatar = this.rules.upFrom(this.currentAvatar);
	}

	transformDown(){
		this.currentAvatar = this.rules.downFrom(this.currentAvatar);
	}
}

module.exports = Player;