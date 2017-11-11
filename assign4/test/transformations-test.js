const chai = require('chai');
const expect = chai.expect;

const Bike = require('../src/avatars/bike');
const Car = require('../src/avatars/car');
const Plane = require('../src/avatars/plane');
const Rocket = require('../src/avatars/rocket');

const Transformations = require('../src/transformations');

describe('transformation transformations test:', function() {

	let transformations;

	beforeEach(function(){
		transformations = new Transformations(["Bike", "Car", "Plane", "Rocket"]);
	});


	it('bike rule should be the first rule', function(){
		let transformation = transformations.getAvatarAt(0);

		expect(transformation).to.be.eql(new Bike().constructor.name);
	});

	it('bike rule should point up to car rule', function(){
		let avatar = new Bike();

		let transformation = transformations.upFrom(avatar);

		expect(transformation).to.be.eql(new Car().constructor.name);
	});

	it('car rule should point down to bike rule', function(){
		let avatar = new Car();

		let transformation = transformations.downFrom(avatar);

		expect(transformation).to.be.eql(new Bike().constructor.name);
	});

	it('bike rule should point down to rocket rule because the list is circular', function(){
		let avatar = new Bike();

		let transformation = transformations.downFrom(avatar);

		expect(transformation).to.be.eql(new Rocket().constructor.name);
	});

	it('rocket rule should point up to bike rule because the list is circular', function(){
		let avatar = new Rocket();

		let transformation = transformations.upFrom(avatar);

		expect(transformation).to.be.eql(new Bike().constructor.name);
	});

});