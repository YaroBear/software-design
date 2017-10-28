const chai = require('chai');
const expect = chai.expect;

const createTests = require('./writer-test');
const StringWriter = require('../src/string-writer');

createTests(() => new StringWriter(), () => {});

const creator = function() {
	return stringWriter = new StringWriter;
}

const cleanup = function() {}