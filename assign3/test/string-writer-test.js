const chai = require('chai');
const expect = chai.expect;

const createTests = require('./writer-test');
const StringWriter = require('../src/string-writer');
const createConverterTests = require('./lowercase-converter-test');

createTests(() => new StringWriter(), () => {});         

createConverterTests(() => new StringWriter(), () => {});