const chai = require('chai');
const expect = chai.expect;

const Bike = require('../src/bike');
const Car = require('../src/car');
const Plane = require('../src/plane');
const Rocket = require('../src/rocket');
const Player = require('../src/player');
const TransformAvatar = require('../src/transform-avatar');

describe('transform avatar tests:', function(){

	const defaultRules = {
		Bike : {Rocket: {}, Car: {}},
		Car: {Bike: {}, Plane: {}},
		Plane: {Car : {}, Rocket: {}},
		Rocket: {Plane: {}, Bike: {}}
	};

	let transformAvatar;

	beforeEach(function(){
		transformAvatar = new TransformAvatar(defaultRules);
	})

	it('a bike to car transformation should be valid', function(){
		expect(transformAvatar.isValidTransformation(new Bike(), new Car())).to.be.true;
	});

	it('a bike to plane transformation should not be valid', function(){
		expect(transformAvatar.isValidTransformation(new Bike(), new Plane())).to.be.false;
	});

	it('should return the original avatar if the transformation is not valid', function(){
		let returnedAvatar = transformAvatar.transform(new Bike(), new Plane());

		expect(returnedAvatar).to.be.eql(new Bike());
	});

	it('should be able to change the transform rules', function(){
		const newRules = {
			Bike : {Plane: {}},
			Car: {},
			Plane: {},
			Rocket: {}
		};

		transformAvatar.setRules(newRules);

		expect(transformAvatar.isValidTransformation(new Bike(), new Plane())).to.be.true;
	});

	it('a player with bike avatar should transform into a car avatar and call its internal action', function(){
		let player = new Player(new Bike(), transformAvatar);

		player.transform(new Car());

		let called = false;

		player.currentAvatar.action = function(){
			called = true;
		}

		player.performAction();

		expect(called).to.be.true;
	});


});