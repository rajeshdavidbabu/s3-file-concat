'use strict';

const AWS = require('aws-sdk-mock');

// file ops
const fileOps = require('./fileOps');

module.exports = {

  mock() {
    AWS.mock('S3', 'getObject', (params, callback) => {
      callback(null, { Body: Buffer.from(fileOps.readFileSync(params.Key)) });
    });
  },

  restore() {
    AWS.restore();
  }

};
