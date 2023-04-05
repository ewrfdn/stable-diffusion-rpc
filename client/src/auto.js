'use strict';
const process = require('child_process');
const childProcess = process.fork('./src/index.js');
const { sleep } = require('./utils');

childProcess.on('exit', async function(code) {
  console.log('process exits + ' + code);
  await sleep(3000);
  process.fork('./src/auto.js');
});
