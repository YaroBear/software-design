const chai = require('chai');
const expect = chai.expect;

const createTests = require('./writer-test');
const StringWriter = require('../src/string-writer');

createTests(StringWriter); 
//Venkat: createTests(() => return new StringWriter(), () => {});