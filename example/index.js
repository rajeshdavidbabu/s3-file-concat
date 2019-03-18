'use strict';

const S3FileConcat = require('../lib');

const { concatFiles } = S3FileConcat({
  accessKeyId: '<your access key>',
  secretAccessKey: '<secret key>',
  region: '<region>',
  bucket: '<bucket name>'
});

/**
 * The following are the examples of how you can append the files based on their
 * keys in S3. Assuming that you have all your files inside the folder testData on
 * your S3 bucket. This is how you set the keys and targetFileKey for storing your
 * concatenated files. You can test this by using a valid S3 config details and also
 * by commenting out one-by-one, the key.
 */

// Appending arrays files
let keys = [
  'testdata/arrays/array1.json',
  'testdata/arrays/array2.json',
  'testdata/arrays/array3.json'
];
let targetFileKey = 'testdata/arrays/array_append.json';

// Appending CSV files
keys = [
  'testdata/csv_files/csv1.csv',
  'testdata/csv_files/csv2.csv',
  'testdata/csv_files/csv3.csv'
];
targetFileKey = 'testdata/csv_files/csv_append.csv';

// Appending doc files
keys = [
  'testdata/doc_files/doc1.doc',
  'testdata/doc_files/doc2.doc',
  'testdata/doc_files/doc3.doc'
];
targetFileKey = 'testdata/doc_files/doc_append.doc';

// Merging objects files
keys = [
  'testdata/objects/object1.json',
  'testdata/objects/object2.json',
  'testdata/objects/object3.json'
];
targetFileKey = 'testdata/objects/object_append.json';

// Appending plain files
keys = [
  'testdata/plain/plain1',
  'testdata/plain/plain2',
  'testdata/plain/plain3'
];
targetFileKey = 'testdata/plain/plain_append';

// Appending txt files
keys = [
  'testdata/txt_files/file1.txt',
  'testdata/txt_files/file2.txt',
  'testdata/txt_files/file3.txt',
  'testdata/txt_files/file4.txt'
];
targetFileKey = 'testdata/txt_files/file_append.txt';

/**
 * concatFiles method accepts two arguments and returns a promise.
 * @param {Array} keys is an array of keys for the files that need to be merged.
 * @param {Object} options gives us the ability to override default options.
 */

concatFiles(keys, {
  targetFileKey, // defaults to ''
  deleteSourceFiles: true // defaults to false
})
  // when no options are passed, output consists of appended file contents.
  // if targetFileKey is present output consists of S3 file upload response.
  .then(output => output)
  .catch(error => error);
