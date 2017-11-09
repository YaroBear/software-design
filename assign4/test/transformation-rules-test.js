const chai = require('chai');
const expect = chai.expect;

const Bike = require('../src/bike');
const Car = require('../src/car');
const Plane = require('../src/plane');
const Rocket = require('../src/rocket');

const TransformationRules = require('../src/transformation-rules');

describe('transformation rules test:', function() {

	let rules;

	beforeEach(function(){
		rules = new TransformationRules();
		rules.addRule(new Bike());
		rules.addRule(new Car());
		rules.addRule(new Plane());
		rules.addRule(new Rocket());
	});


	it('bike rule should be at the head of the rules', function(){

		expect(rules.head.avatar.constructor).to.be.eql(new Bike().constructor);
	});

	it('bike rule should point down to car rule', function(){

		expect(rules.head.down.avatar.constructor).to.be.eql(new Car().constructor);
	});

	it('car rule should point up to bike rule', function(){

		expect(rules.head.down.up.avatar.constructor).to.be.eql(new Bike().constructor);

	});

	it('adding any number of rules always sets the last rule to loop back up to head', function(){

		expect(rules.head.down.down.down.down.avatar.constructor).to.eql(rules.head.avatar.constructor);
	});

	it('findLastRule should return the last rule', function(){

		let lastRule = rules.findLastRule();

		expect(rules.head.down.down.down.avatar.constructor).to.be.eql(lastRule.avatar.constructor);
	});

	it('the head rule should point up to the last rule', function(){

		let lastRule = rules.findLastRule();

		expect(rules.head.up.avatar.constructor).to.be.eql(lastRule.avatar.constructor);
	});

	it('should find an avatar in the rules list and return its transformation rules', function(){

		let expectedRules = rules.getAvatarRules(new Car());

		expect(expectedRules.up.constructor).to.be.eql(new Bike().constructor);
		expect(expectedRules.down.constructor).to.be.eql(new Plane().constructor);
	});
});