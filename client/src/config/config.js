'use strict';
const argv = process.argv;
console.log(argv);
let isDev = false;
if (argv.includes('--dev')) {
  isDev = true;
}
const config = {
  host: isDev ? '127.0.0.1' : '123.60.53.33',
  port: 17860,
};

module.exports = config;
