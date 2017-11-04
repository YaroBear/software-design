const chai = require('chai');
const expect = chai.expect;

const Bike = require('../src/bike');
const Car = require('../src/car');


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
});