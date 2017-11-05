const chai = require('chai');
const expect = chai.expect;

const Bike = require('../src/bike');
const Car = require('../src/car');
const Plane = require('../src/plane');
const Player = require('../src/player');


describe('Game avatar switcher unit tests:', function() {
	it('canary test', function() {
		expect(true).to.be.true;
	});

	it('a player with the bike avatar should call the internal action of bike', function(){
		let player = new Player(new Bike());

		let called = false;

		player.currentAvatar.action = function(){
			called = true;
		}

		player.performAction();

		expect(called).to.be.true;
	});

	it('a player with bike avatar should transform into a car avatar and call its internal action', function(){
		let player = new Player(new Bike());

		player.transform(new Car());

		let called = false;

		player.currentAvatar.action = function(){
			called = true;
		}

		player.performAction();

		expect(called).to.be.true;
	});

	it('a player with car avatar should transform into a bike avatar and call its interal action', function(){
		let player = new Player(new Car());

		player.transform(new Bike());

		let called = false;

		player.currentAvatar.action = function(){
			called = true;
		}

		player.performAction();

		expect(called).to.be.true;
	});

	it('a bike to plane transformation should not be valid', function(){
		let player = new Player(new Bike());

		expect(player.isValidTransformation(new Plane())).to.be.false;
	});

	it('transform should call isValidTransformation', function(){
		let player = new Player(new Car());

		let called = false;

		player.isValidTransformation = function(){
			called = true;
		}

		player.transform(new Bike());

		expect(called).to.be.true;
	});
});