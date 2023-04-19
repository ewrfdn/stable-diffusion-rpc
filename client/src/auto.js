'use strict';

const { fork } = require('child_process');
const argv = process.argv.slice(2);
const childProcess = fork('./src/index.js', argv);

childProcess.on('exit', function(code) {
  console.log('process exits + ' + code);
  fork('./src/auto.js', argv);
});

