class Transformations{
	constructor(rules){
		this.rules = rules;
	}

	findIndexOf(avatar){
		let matchingAvatar = this.rules.find(each => each.toLowerCase() === avatar.constructor.name.toLowerCase())
		return this.rules.indexOf(matchingAvatar)
	}

	upFrom(currentAvatar){
		let index = this.findIndexOf(currentAvatar);
		return this.rules[ (index + 1) % this.rules.length];
    }
    

	downFrom(currentAvatar){
		let index = this.findIndexOf(currentAvatar);
		return this.rules[( index + this.rules.length - 1) % this.rules.length];
	}

	getAvatarAt(index){
		return this.rules[index];
	}
}

module.exports = Transformations;