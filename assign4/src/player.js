const avatars = require('require.all')('./avatars');

class Player { 
	constructor(avatar, transformations){
		this.currentAvatar = new avatars[avatar];
		this.transformations = transformations;
	}

	performAction(){
		this.currentAvatar.action();
	}

	transformUp(){
		this.currentAvatar = this.transformations.upFrom(this.currentAvatar);
	}

	transformDown(){
		this.currentAvatar = this.transformations.downFrom(this.currentAvatar);
	}
}

module.exports = Player;