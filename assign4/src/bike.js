const Avatar = require('./avatar');

class Bike extends Avatar{
	constructor(){
		super();
	}

	driveThroughNarrowLanes(){
		return true;
	}
	
}

module.exports = Bike;