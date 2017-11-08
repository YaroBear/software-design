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
	});

	it('adding a single rules puts the rule at the head', function(){
		rules.addRule(new Bike());

		expect(rules.head.avatar.constructor).to.be.eql(new Bike().constructor);
	});

	it('adding another rule assigns head.down to the new rule', function(){
		rules.addRule(new Bike());
		rules.addRule(new Car());

		expect(rules.head.down.avatar.constructor).to.be.eql(new Car().constructor);
	});

	it('adding another rules assigns its up pointer to the previous rule', function(){
		rules.addRule(new Bike());
		rules.addRule(new Car());

		expect(rules.head.down.up.avatar.constructor).to.be.eql(new Bike().constructor);

	});

	it('adding any number of rules always sets the last rule to loop back up to head', function(){
		rules.addRule(new Bike());
		rules.addRule(new Car());
		rules.addRule(new Plane());
		rules.addRule(new Rocket());

		expect(rules.head.down.down.down.down.avatar.constructor).to.eql(rules.head.avatar.constructor);
	});
});