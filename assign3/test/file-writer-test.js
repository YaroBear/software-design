const chai = require('chai');
const expect = chai.expect;

const createTests = require('./writer-test');
const FileWriter = require('../src/file-writer');
const createConverterTests = require('./lowercase-converter-test');

const fs = require('fs-extra');

const cleanup = function(file) {
	fs.unlinkSync(file);
}

createTests(() => new FileWriter('./test1.txt'), () => cleanup('./test1.txt'));

createConverterTests(() => new FileWriter('./test2.txt'), () => cleanup('./test2.txt'));