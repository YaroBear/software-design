class TransformAvatar{
	constructor(rules){
		this.rules = rules;
	}

	transformUp(avatar){
		return this.rules.getAvatarRules(avatar).up;
	}

	transformDown(avatar){
		return this.rules.getAvatarRules(avatar).down;
	}
}

module.exports = TransformAvatar;