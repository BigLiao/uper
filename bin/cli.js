#!/usr/bin/env node

const chalk = require('chalk');
const pkg = require('../package.json');
const program = require('commander');

program
  .version(pkg.version)
  .usage('<file> [options]');

program.action((value, cmd) => {
  require('../lib/upload')(value, cmd);
});

program
  .command('config [value]')
  .description('inspect and modify the config')
  .option('-g, --get <path>', 'get value from config')
  .option('-a, --add', 'add a config')
  .option('-e, --edit', 'reset configs by command')
  .action((value, cmd) => {
    require('../lib/config')(value, cmd);
  });




program.parse(process.argv);