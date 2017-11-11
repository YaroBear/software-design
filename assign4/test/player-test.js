const chai = require('chai');
const expect = chai.expect;

const Bike = require('../src/bike');
const Car = require('../src/car');
const Plane = require('../src/plane');
const Rocket = require('../src/rocket');

const Player = require('../src/player');

const TransformationRules= require('../src/transformation-rules');

describe('player tests:', function() {

	it('canary test', function() {
		expect(true).to.be.true;
	});

	let rules;

	beforeEach(function(){
		let defaultRules = [new Bike(), new Car(), new Plane(), new Rocket()];
		rules = new TransformationRules(defaultRules);
	});

	it('a player with the bike avatar should call the internal action of bike', function(){
		let player = new Player(new Bike(), rules);

		let called = false;
                                 
		player.currentAvatar.action = function(){
			called = true;
		}

		player.performAction();

		expect(called).to.be.true;
	});

	it('a player with bike avatar should transform into a car avatar when transforming up', function(){
		let player = new Player(new Bike(), rules);

		player.transformUp();

		expect(player.currentAvatar.constructor).to.be.eql(new Car().constructor);
	});

	it('a player with car avatar should transform into a bike avatar when transforming down', function(){
		let player = new Player(new Car(), rules);

		player.transformDown();

		expect(player.currentAvatar.constructor).to.be.eql(new Bike().constructor);
	});
});