const chai = require('chai');
const expect = chai.expect;

const createTests = require('./writer-test');
const FileWriter = require('../src/file-writer');

createTests(FileWriter); 