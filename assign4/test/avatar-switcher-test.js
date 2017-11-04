const chai = require('chai');
const expect = chai.expect;

const Bike = require('../src/bike');
const Car = require('../src/car');
const Avatar = require('../src/avatar');


describe('Game avatar switcher unit tests:', function() {
	it('canary test', function() {
		expect(true).to.be.true;
	});

	it('bike should be able to drive through narrow lanes', function(){
		let bike = new Bike();
		expect(bike.driveThroughNarrowLanes()).to.be.true;
	});

	it('car should be able to drive fast', function(){
		let car = new Car();
		expect(car.driveFast()).to.be.true;
	});

	it('an avatar can be a bike', function(){
		let avatar = new Avatar(new Bike());

		expect(avatar.driveThroughNarrowLanes()).to.be.true;
	});

	it('a bike should be able to transform into a car', function(){
		let avatar = new Avatar(new Bike());
		avatar = new Avatar(new Car());

		expect(avatar.driveFast()).to.be.true;
	});
});