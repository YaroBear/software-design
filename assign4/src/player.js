class Player { 
	constructor(avatar, transformRules){
		this.currentAvatar = avatar;
		this.transformRules = transformRules;
	}

	performAction(){
		this.currentAvatar.action();
	}

	transform(differentAvatar){ //Venkat: what is different avatar?
	  //the rule should know what the different avatar should be based on up or down in the list, right?
		this.currentAvatar = this.transformRules.transform(this.currentAvatar, differentAvatar);
	}
}

module.exports = Player;