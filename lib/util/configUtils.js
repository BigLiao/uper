const fs = require('fs-extra');
const path = require('path');
const homedir = require('os').homedir();
const chalk = require('chalk');

const defaultConf = {
  default: 'smms',
  servers: {
    'smms': {
      server: 'smms'
    }
  }
};

async function checkConfig() {
  try {
    const file = path.resolve(homedir, '.uperc');
    if (fs.existsSync(file)) {
      const conf = await fs.readJSON(file);
      if (Object.keys(conf.servers).length > 0) {
        return true;
      } else {
        console.info('You don\'t have a config!\nPlease Run \`' + chalk.red('uper config --add') + '\` first.');
        return false;
      }
    } else {
      await fs.writeJSON(file, defaultConf, {
        spaces: 2
      });
      // console.info('You don\'t have a config!\nPlease Run \`' + chalk.red('uper config --add') + '\` first.');
      return false;
    }
  } catch (error) {
    console.info('You don\'t have a config!\nPlease Run \`' + chalk.red('uper config --add') + '\` first.');
    return false; 
  }
}

async function getConfig(server) {
  const file = path.resolve(homedir, '.uperc');
  let config;
  if (fs.existsSync(file)) {
    config = await fs.readJSON(file);
  } else {
    config = defaultConf;
    fs.writeFile(file, JSON.stringify(config, null, 2), 'utf8');
  }
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
    conf = defaultConf;
  }
  let name = config.server;
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
  await fs.writeJSON(file, conf, {
    spaces: 2
  });
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
  await fs.writeJSON(file, conf, {
    spaces: 2
  });
}

async function showConfig() {
  const file = path.resolve(homedir, '.uperc');
  const conf = await fs.readJSON(file);
  hideKey(conf);
  console.log('Config file path: ' + file);
  console.log(chalk.magenta(JSON.stringify(conf, null, 2)));
}

function hideKey(obj) {
  for (let key in obj) {
    if (typeof obj[key] === 'string' && key === 'accessKey' || key === 'secretKey') {
      obj[key] = obj[key].slice(0, 1) + '******' + obj[key].slice(-1);
    } else if (typeof obj[key] === 'object') {
      hideKey(obj[key]);
    }
  }
}

exports.getConfig = getConfig;
exports.deleteConfig = deleteConfig;
exports.addConfig = addConfig;
exports.checkConfig = checkConfig;
exports.showConfig = showConfig;

