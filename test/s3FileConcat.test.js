'use strict';

const S3FileConcat = require('../lib/index');

// AWS S3 mock
const S3 = require('./helpers/s3');
const fileOps = require('./helpers/fileOps');

// keys and targetKey
let keys = [];
let targetFileKey = '';
let concatFiles = () => {};

// applies to all tests in this file
beforeAll(() =>  {
  S3.mock();
  concatFiles = S3FileConcat({
    accessKeyId: '1234556789',
    secretAccessKey: '12455678990',
    region: 'eu-west-1',
    bucket: 'my_bucket'
  }).concatFiles;
});
afterAll(() => S3.restore());

describe('concatenate all given arrays into one array', () => {
  // applies only to tests in this describe block
  beforeEach(() => {
    keys = [
      's3BucketTestFiles/arrays/array1.json',
      's3BucketTestFiles/arrays/array2.json',
      's3BucketTestFiles/arrays/array3.json'
    ];
    // assuming this is saved on the s3 bucket.
    targetFileKey = 's3BucketTestFiles/arrays/array_append.json';
  });

  test('output is equal to expected result of concatention', async () => {
    const expectedOutput = await fileOps.readFilePromise(targetFileKey);

    return concatFiles(keys).then((data) => {
      expect(data).toEqual(JSON.parse(expectedOutput.toString('utf8')));
    });
  });
});

describe('concatenate all csv files into one csv file', () => {
  beforeEach(() => {
    keys = [
      's3BucketTestFiles/csv_files/csv1.csv',
      's3BucketTestFiles/csv_files/csv2.csv',
      's3BucketTestFiles/csv_files/csv3.csv'
    ];
    targetFileKey = 's3BucketTestFiles/csv_files/csv_append.csv';
  });

  test('output is present as result of concatention', async () => {
    const expectedOutput = await fileOps.readFilePromise(targetFileKey);

    return concatFiles(keys).then((data) => {
      expect(data).toEqual(expectedOutput.toString('utf8'));
    });
  });
});

describe('concatenate all doc files into one doc file', () => {
  beforeEach(() => {
    keys = [
      's3BucketTestFiles/doc_files/doc1.doc',
      's3BucketTestFiles/doc_files/doc2.doc',
      's3BucketTestFiles/doc_files/doc3.doc'
    ];
    targetFileKey = 's3BucketTestFiles/doc_files/doc_append.doc';
  });

  test('output is present as result of concatention', async () => {
    const expectedOutput = await fileOps.readFilePromise(targetFileKey);

    return concatFiles(keys).then((data) => {
      expect(data).toEqual(expectedOutput.toString('utf8'));
    });
  });
});

describe('merge all object files into one object file', () => {
  beforeEach(() => {
    keys = [
      's3BucketTestFiles/objects/object1.json',
      's3BucketTestFiles/objects/object2.json',
      's3BucketTestFiles/objects/object3.json'
    ];
    targetFileKey = 's3BucketTestFiles/objects/object_append.json';
  });

  test('output is present as result of merging', async () => {
    const expectedOutput = await fileOps.readFilePromise(targetFileKey);

    return concatFiles(keys).then((data) => {
      expect(data).toEqual(JSON.parse(expectedOutput.toString('utf8')));
    });
  });
});

describe('concatenate all plain files into one plain file', () => {
  beforeEach(() => {
    keys = [
      's3BucketTestFiles/plain/plain1',
      's3BucketTestFiles/plain/plain2',
      's3BucketTestFiles/plain/plain3'
    ];
    targetFileKey = 's3BucketTestFiles/plain/plain_append';
  });

  test('output is present as result of concatention', async () => {
    const expectedOutput = await fileOps.readFilePromise(targetFileKey);

    return concatFiles(keys).then((data) => {
      expect(data).toEqual(expectedOutput.toString('utf8'));
    });
  });
});

describe('concatenate all txt files into one txt file', () => {
  beforeEach(() => {
    keys = [
      's3BucketTestFiles/txt_files/file1.txt',
      's3BucketTestFiles/txt_files/file2.txt',
      's3BucketTestFiles/txt_files/file3.txt',
      's3BucketTestFiles/txt_files/file4.txt'
    ];
    targetFileKey = 's3BucketTestFiles/txt_files/file_append.txt';
  });

  test('output is present as result of concatention', async () => {
    const expectedOutput = await fileOps.readFilePromise(targetFileKey);

    return concatFiles(keys).then((data) => {
      expect(data).toEqual(expectedOutput.toString('utf8'));
    });
  });
});

