const chai = require('chai');
const expect = chai.expect;

const Bike = require('../src/avatars/bike');
const Car = require('../src/avatars/car');
const Plane = require('../src/avatars/plane');
const Rocket = require('../src/avatars/rocket');

const Player = require('../src/player');

const Transformations = require('../src/transformations');

describe('player tests:', function() {

	it('canary test', function() {
		expect(true).to.be.true;
	});

	let transformations;

	beforeEach(function(){
		transformations = new Transformations(["bike", "car", "plane", "rocket"]);
	});

	it('a player with the bike avatar should call the internal action of bike', function(){
		let player = new Player(new Bike(), transformations);

		let called = false;
                                 
		player.currentAvatar.action = function(){
			called = true;
		}

		player.performAction();

		expect(called).to.be.true;
	});

	it('a player with bike avatar should transform into a car avatar when transforming up', function(){
		let player = new Player(new Bike(), transformations);

		player.transformUp();

		expect(player.currentAvatar.constructor).to.be.eql(new Car().constructor);
	});

	it('a player with car avatar should transform into a bike avatar when transforming down', function(){
		let player = new Player(new Car(), transformations);

		player.transformDown();

		expect(player.currentAvatar.constructor).to.be.eql(new Bike().constructor);
	});
});