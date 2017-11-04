const Avatar = require('./avatar');

class Car extends Avatar {
	constructor(){
		super();
	}

	driveFast(){
		return true;
	}
	
}

module.exports = Car;