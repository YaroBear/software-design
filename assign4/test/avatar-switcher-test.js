const chai = require('chai');
const expect = chai.expect;

const Bike = require('../src/bike');
const Car = require('../src/car');
const Player = require('../src/player');


describe('Game avatar switcher unit tests:', function() {
	it('canary test', function() {
		expect(true).to.be.true;
	});

	it('a player with the bike avatar calls the interal action of bike', function(){
		let player = new Player(new Bike());

		let called = false;

		player.currentAvatar.action = function(){
			called = true;
		}

		player.performAction();

		expect(called).to.be.true;
	});
});