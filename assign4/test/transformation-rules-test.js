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
		let defaultRules = [new Bike(), new Car(), new Plane(), new Rocket()];
		rules = new TransformationRules(defaultRules);
	});


	it('bike rule should be the first rule', function(){
		let rule = rules.getRule(0);

		expect(rule.constructor.name).to.be.eql(new Bike().constructor.name);
	});

	it('bike rule should point up to car rule', function(){
		let avatar = new Bike();

		let rule = rules.upFrom(avatar);

		expect(rule.constructor.name).to.be.eql(new Car().constructor.name);
	});

	it('car rule should point down to bike rule', function(){
		let avatar = new Car();

		let rule = rules.downFrom(avatar);

		expect(rule.constructor.name).to.be.eql(new Bike().constructor.name);
	});

	it('bike rule should point down to rocket rule because the rules list is circular', function(){
		let avatar = new Bike();

		let rule = rules.downFrom(avatar);

		expect(rule.constructor.name).to.be.eql(new Rocket().constructor.name);
	});

	it('rocket rule should point up to bike rule because the rules list is circular', function(){
		let avatar = new Rocket();

		let rule = rules.upFrom(avatar);

		expect(rule.constructor.name).to.be.eql(new Bike().constructor.name);
	});

	it('should be able to change the rules', function(){
		let newRules = [new Bike(), new Plane(), new Car(), new Rocket()];

		rules.changeRules(newRules);

		let avatar = new Bike();

		let rule = rules.upFrom(avatar);

		expect(rule.constructor.name).to.be.eql(new Plane().constructor.name);
	});

});