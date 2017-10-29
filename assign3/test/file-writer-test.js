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

/* To Venkat:
Error: EPERM: operation not permitted
https://github.com/nodejs/node-v0.x-archive/issues/6599

unlinkSync() has issues with windows when trying to open, close, and reopen a file with the same name,
which is why we are using different files for the different tests for cleanup.
*/