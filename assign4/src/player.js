class Player { 
	constructor(avatar){
		this.currentAvatar = avatar;
		this.transformRules = { //Venkat: Fails SRP and OCP.
			Bike : {Car: {}},
			Car: {Bike: {}, Plane: {}},
			Plane: {Car : {}}
		};
	}

	performAction(){
		this.currentAvatar.action();
	}

	isValidTransformation(transformInto){
		if(Object.keys(this.transformRules[this.currentAvatar.constructor.name]).includes(transformInto.constructor.name)){
			return true;
		}
		else return false;
	}

	transform(differentAvatar){
		if(this.isValidTransformation(differentAvatar)){
			this.currentAvatar = differentAvatar;
		}
	}
}

module.exports = Player;