const chai = require('chai');
const expect = chai.expect;

const Bike = require('../src/bike');
const Car = require('../src/car');
const Plane = require('../src/plane');
const Rocket = require('../src/rocket');

const TransformAvatar = require('../src/transform-avatar');
const TransformationRules= require('../src/transformation-rules');

describe('transform avatar tests:', function(){

	let rules;

	let transformAvatar;

	beforeEach(function(){
		rules = new TransformationRules();
		rules.addRule(new Bike());
		rules.addRule(new Car());
		rules.addRule(new Plane());
		rules.addRule(new Rocket());

		transformAvatar = new TransformAvatar(rules);
	});

	it('transforming a car up should return a Bike avatar', function(){
		expect(transformAvatar.transformUp(new Car()).constructor).to.be.eql(new Bike().constructor);
	});

	it('transforming a car down should return a plane avatar', function(){
		expect(transformAvatar.transformDown(new Car()).constructor).to.be.eql(new Plane().constructor);
	});

});