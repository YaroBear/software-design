const chai = require('chai');
const expect = chai.expect;

const Bike = require('../src/bike');
const Player = require('../src/player');

describe('player tests:', function() {

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
});