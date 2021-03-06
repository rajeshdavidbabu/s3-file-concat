# S3 File Concat  
  

Minimal javascript library to concatenate/merge/append **AWS S3** files of different data-types. 📦🔗📤 
<p>
  <a href="https://github.com/rajeshdavidbabu/Node-Clone-S3-Bucket/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/express.svg" alt="license" height="18">
  </a>
  <a href="https://badge.fury.io/js/s3-file-concat">
    <img src="https://badge.fury.io/js/s3-file-concat.svg" alt="npm version" height="18">
  </a>
  <a href="https://travis-ci.com/rajeshdavidbabu/s3-file-concat">
    <img src="https://travis-ci.com/rajeshdavidbabu/s3-file-concat.svg?branch=master" alt="travis build">
  </a>
  <a href="https://bundlephobia.com/result?p=s3-file-concat">
    <img src="https://badgen.net/bundlephobia/min/s3-file-concat" alt="size">
  </a>
  <a href="https://coveralls.io/github/rajeshdavidbabu/s3-file-concat?branch=master">
    <img src="https://coveralls.io/repos/github/rajeshdavidbabu/s3-file-concat/badge.svg?branch=master" alt="code coverage">
  </a>
  <a href="https://www.npmjs.com/package/s3-file-concat">
    <img src="https://img.shields.io/npm/dt/s3-file-concat.svg" alt="downloads total">
  </a>
</p>

## Why?  

If you are already using **S3**, you would know that the files are immutable in S3. Meaning you cannot edit or modify the contents of a file. Instead, you can only create a new file. Out of its many use-cases, S3 is prevalently used for dumping small to large data files/logs. ***Let's assume that you want to append all the data files inside a folder into one file, you cannot do it with an S3 API.*** That's where this minimal library comes into the picture.  
  

## Files ?? What kind of files can you append/concatenate?  

This can append all the text-based files that support **utf-8 format** and also **JSON** files.  
  

- .doc/.docx  
- .csv/.xls/.xslx  
- .txt/plain  
- .json  
  

## How does it handle different data-types?  

The library makes use of **JSON.parse API**, which would parse all object based data-types and throws for strings. The data returned from the API is sanitized, and the output is either concatenated or merged.

- Files containing large lists of strings/number/utf8 char codes are  
***concatenated***.  
- Files containing large arrays (of strings and objects) are  
***concatenated*** into one file consisting of the concatenated array.  
- Files containing objects are the only exception here. Pure objects are  
***merged*** instead (the last file overrides all the other keys).  
  

**Important Note:**  *Merging two files of different data-types will result in an error. Eg: you cannot merge a text file and a JSON consisting only an array/object. That's assumed to be a wrong kind of concatenation/merge.*  
  

## Requirements  

- Node version (8.9.1) and above.  
- AWS-SDK.  
  

## Installation  
  
  

Use the package manager [npm](https://www.npmjs.com/get-npm) to install dependencies.  
  

```bash  
npm  install  s3-file-concat --save  
```  
  

## Usage  
  

```javascript  
const  S3FileConcat  =  require('s3-file-concat');  
  
// this libray uses factory function composition against using classes for better encapsulation.  
// so its free from using `new` and `this` :)  
  
const  {  concatFiles  }  =  S3FileConcat({  
  "accessKeyId":  "<your AWS access key>",  
  "secretAccessKey":  "<your secret key>",  
  "region":  "<your region>",  
  "bucket":  "<your bucket>"  
});  
  
/** concatFiles method accepts two arguments and returns a promise.  
1) Keys of the S3 files we want to concatenate/append/merge.  
2) Options (optional object):  
i) targetFileKey: "<mybucket/myfolder/myConcatendatedFile>"
ii) deleteSourceFiles: '<true or false>' // defaulted to false.  
*/

// Appending arrays files
let keys = [
  'testdata/arrays/array1.json',
  'testdata/arrays/array2.json',
  'testdata/arrays/array3.json'
];
// this creates a new file on s3 with appended content.
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
  
// Note: when targetFileKey is empty, then we assume that 
// the user wants to use the appended/merged data and 
// return him appended/merged data in the promise resolve.  
  
s3FileConcat.concatFiles(keys,  {  
  targetFileKey  
})
// when no options are passed output consists of the appended
// file contents, sometimes a  huge dataset waiting to be used.  
.then(output  =>  console.log('All done ',  output)) 
.catch(error  =>  console.log('error occured oops ',  error));  
```  
  

*P.S: If the readability is not great, please check the [example](https://github.com/rajeshdavidbabu/s3-file-concat/tree/master/example) folder.*  
  

## Example Usage  

If the usage above is not clear, fear not. I have made a detailed usage scenario with different file types. [Here](https://github.com/rajeshdavidbabu/s3-file-concat/tree/master/example) you will find how you can pass options pass and the s3 file Keys in detail for all the file most common file types including arrays, objects and text files.
  

## Testing  

- Jest
- aws-sdk-mock

Unit tests are implemented using [Jest](https://jest-bot.github.io/jest/), test-cases for concatenating/merging all types of files are covered. Since AWS S3 requires a network operation, they are mocked to buffer our local test-data. You can safely assume that the test data files are present on your target AWS S3 Bucket.

The AWS test data is present here, at [s3BucketTestFiles](https://github.com/rajeshdavidbabu/s3-file-concat/tree/master/test/s3BucketTestFiles).
  

## Roadmap  
- 100% code coverage.
- Support legacy versions.  
  

## Contributing  

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.  
  
  

## License  
  

MIT © Rajesh Babu
