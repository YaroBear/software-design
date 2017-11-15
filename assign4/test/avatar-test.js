const chai = require('chai');
const expect = chai.expect;

const avatars = require('require.all')('../src/avatars');

describe('avatar tests', function(){ //Venkat: Please remove, not necessary. (but make sure coverage is not low at the same time)

	Object.values(avatars).forEach((avatar) => {
		it('should call the avatar action', function(){
			let currentAvatar = new avatar;
			currentAvatar.action();
		});
	});

});