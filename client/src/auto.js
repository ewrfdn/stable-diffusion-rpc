'use strict';
const process = require('child_process');
const childProcess = process.fork('./src/index.js');

childProcess.on('exit', function(code) {
  console.log('process exits + ' + code);
  process.fork('./src/auto.js');
});
