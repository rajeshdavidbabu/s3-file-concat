'use strict';

const AWS = require('aws-sdk');

// default options
const DEFAULT_OPTIONS = {
  deleteSourceFiles: false,
  targetFileKey: ''
};

module.exports = ({
  accessKeyId, secretAccessKey, region, bucket
}) => {
  const s3 = new AWS.S3({
    accessKeyId,
    secretAccessKey,
    region
  });

  // type-checkers
  const isArray = input => Array.isArray(input);
  const isObject = input => typeof input === 'object' && input.constructor === Object;
  const isString = input => typeof input === 'string' || input instanceof String;

  // utility
  const isEvery = (array, cb) => array.every(cb);

  // concatenate factory methods for different data-types
  const concatenateObjects = objects => objects.reduce((output, object) =>
    Object.assign({}, output, object)); // merge objects

  const concatenateArrays = arrays => arrays.reduce(
    (output, array) =>
      output.concat(array) // concat arrays
    , []
  );

  const concatenateStrings = (strings) => {
    let tempArr = [];

    return strings.reduce((output, string) => {
      tempArr = string.split('\n').filter(line => !!line);
      return output.concat(tempArr); // concat strings
    }, []).join('\n');
  };

  // AWS S3 File operation factories
  const downloadObjectFromS3 = key => s3
    .getObject({
      Bucket: bucket,
      Key: key,
    })
    .promise()
    .then(data =>
    // file contents.
      data.Body.toString('utf8'))
    .catch(error => error);

  const uploadFile = (key, output) => s3.upload({
    Body: Buffer.from(isString(output) ? output : JSON.stringify(output)),
    Bucket: bucket,
    Key: key,
  }).promise();

  const deleteFile = key => s3.deleteObject({
    Bucket: bucket,
    Key: key,
  }).promise();

  const deleteFiles = keys => Promise.all(keys.map(key => deleteFile(key)));

  // parser
  const tryParseJSON = (fileContent) => {
    try {
      return JSON.parse(fileContent);
    } catch (error) {
      return fileContent; // parse failed so do something with this data.
    }
  };

  // core logic
  const concatenateFileContents = keys => Promise.all(keys.map(key => downloadObjectFromS3(key)))
    .then((fileContents) => {
      // sanitize file contents.
      const parsedFileContents = fileContents
        .map(fileContent => tryParseJSON(fileContent))
        .filter(fileContent => !!fileContent);

      if (!parsedFileContents.length) {
        throw new Error('Content Error: Trying to merge empty files or invalid content');
      }

      // type check and return data.
      if (isEvery(parsedFileContents, isObject)) {
        return concatenateObjects(parsedFileContents);
      } else if (isEvery(parsedFileContents, isArray)) {
        return concatenateArrays(parsedFileContents);
      } else if (isEvery(parsedFileContents, isString)) {
        return concatenateStrings(parsedFileContents);
      }
      throw new Error('Type-mismatch Error: Merging of two different data-types not allowed');
    })
    .catch(error => error);

  // exported API
  const concatFiles = (keys, userOptions) => {
    // user options.
    const options = Object.assign({}, DEFAULT_OPTIONS, userOptions);

    return concatenateFileContents(keys)
      .then(output => output)
      .then(output => (options.targetFileKey ? uploadFile(options.targetFileKey, output)
        : Promise.resolve(output)))
      .then(output => (options.deleteSourceFiles ? deleteFiles(keys)
        : Promise.resolve(output)));
  };

  // immutable public exports
  return Object.freeze({
    concatFiles
  });
};
