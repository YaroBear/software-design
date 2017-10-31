const chai = require('chai');
const expect = chai.expect;

const createTests = require('./writer-test');
const FileWriter = require('../src/file-writer');
const converters = require('require.all')('./converter-tests');

const fs = require('fs-extra');

const cleanup = function(file) {
	fs.unlinkSync(file);
}

createTests(() => new FileWriter('./test1.txt'), () => cleanup('./test1.txt'));

 for (let converter in converters){
 	const testFile = 'test-' + converter;
 	converters[converter](() => new FileWriter(testFile), () => cleanup(testFile));
 }