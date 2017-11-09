class Player { 
	constructor(avatar, transformRules){
		this.currentAvatar = avatar;
		this.transformRules = transformRules;
	}

	performAction(){
		this.currentAvatar.action();
	}
}

module.exports = Player;