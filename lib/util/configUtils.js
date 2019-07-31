const fs = require('fs-extra');
const path = require('path');
const homedir = require('os').homedir();
const chalk = require('chalk');

function checkConfig() {
  const file = path.resolve(homedir, '.uperc');
  if (fs.existsSync(file)) {
    return true;
  } else {
    console.info('You don\'t have a config!\nRun \`' + chalk.red('uper config --add') + '\`.');
    return false;
  }
}

async function getConfig(server) {
  const file = path.resolve(homedir, '.uperc');
  let config = await fs.readJSON(file);
  if (server && config.servers[server]) {
    return config.servers[server];
  }
  return config.servers[config.default];
}

async function addConfig(config, isDefault) {
  const file = path.resolve(homedir, '.uperc');
  let conf;
  if (fs.existsSync(file)) {
    conf = await fs.readJSON(file);
  } else {
    conf = {
      default: null,
      servers: {}
    };
  }
  const name = config.server;
  let count = 1;
  // 防止重名
  while (name in conf.servers) {
    name = config.server + count;
    count++;
  }
  conf.servers[name] = config;
  if (isDefault || conf.default === null) {
    conf.default = name;
  }
  await fs.writeJSON(file, conf);
}

async function deleteConfig(name) {
  const file = path.resolve(homedir, '.uperc');
  const conf = await fs.readJSON(file);
  if (name in conf.servers) {
    delete conf.servers[name];
  }
  if (conf.default === name) {
    const servers = Object.keys(conf.servers);
    if (servers.length > 0) {
      conf.default = [0].server;
    } else {
      conf.default = null;
    }
  }
  await fs.writeJSON(file, conf);
}

exports.getConfig = getConfig;
exports.deleteConfig = deleteConfig;
exports.addConfig = addConfig;
exports.checkConfig = checkConfig;
