'use strict';

const fs = require('fs');
const util = require('util');

// dir path
const dirPath = `${__dirname}/../`;

module.exports = {

  readFileSync(filePath) {
    return fs.readFileSync(`${dirPath}/${filePath}`);
  },

  readFilePromise(filePath) {
    return util.promisify(fs.readFile)(`${dirPath}/${filePath}`);
  }

};