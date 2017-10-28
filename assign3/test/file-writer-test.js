const chai = require('chai');
const expect = chai.expect;

const createTests = require('./writer-test');
const FileWriter = require('../src/file-writer');

createTests(FileWriter); 

//Venkat: createTests(() => new FileWriter(TEST_FILE), () => cleanup());

/*
const cleanup = function() {
  ...delete TEST_FILE...
}
*/