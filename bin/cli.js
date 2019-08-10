#!/usr/bin/env node

const chalk = require('chalk');
const pkg = require('../package.json');
const program = require('commander');

program
  .version(pkg.version)
  .usage('<file>');

program
  .command('config [value]')
  .description('inspect and add config')
  .option('-a, --add', 'add a config')
  .action((value, cmd) => {
    require('../lib/config')(value, cmd);
  });


program
  .option('-m, --markdown <file>', 'parse a markdown file', require('../lib/markdown'))
  .action((...args) => {
    const file = args.slice(0, -1);
    require('../lib/upload')(file);
  });



program.parse(process.argv);