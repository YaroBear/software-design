class Player { 
	constructor(avatar, transformRules){
		this.currentAvatar = avatar;
		this.transformRules = transformRules;
	}

	performAction(){
		this.currentAvatar.action();
	}

	transform(differentAvatar){
		this.currentAvatar = this.transformRules.transform(this.currentAvatar, differentAvatar);
	}
}

module.exports = Player;