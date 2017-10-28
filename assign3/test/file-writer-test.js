const chai = require('chai');
const expect = chai.expect;

const createTests = require('./writer-test');
const FileWriter = require('../src/file-writer');

const fs = require('fs-extra');

const TEST_OUTPUT_FILE = './test.txt';

const creator = function(TEST_OUTPUT_FILE) {
	return fileWriter = new FileWriter(TEST_OUTPUT_FILE);
}

const cleanup = function() {
  fs.unlinkSync(TEST_OUTPUT_FILE);
}

createTests(() => new FileWriter(TEST_OUTPUT_FILE), () => cleanup());
