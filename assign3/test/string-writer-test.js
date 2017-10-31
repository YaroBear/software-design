const chai = require('chai');
const expect = chai.expect;

const createTests = require('./writer-test');
const StringWriter = require('../src/string-writer');
const converters = require('require.all')('./converter-tests');

createTests(() => new StringWriter(), () => {});         

 for (let converter in converters){
 	converters[converter](() => new StringWriter(), () => {});
 }