class Player { 
	constructor(avatar){
		this.currentAvatar = avatar;
	}

	performAction(){
		this.currentAvatar.action();
	}
}

module.exports = Player;