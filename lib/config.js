const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');
const homedir = require('os').homedir();
const { getConfig, addConfig, deleteConfig, checkConfig } = require('./util/configUtils');

async function config(value, options) {
  if (!options.add && !checkConfig()) return;
  const file = path.resolve(homedir, '.uperc');
  // 默认打印配置结果
  if (!options.add && !options.get && !options.edit) {
    const conf = await fs.readJSON(file);
    console.log('Config file path: ' + file);
    console.log(JSON.stringify(conf, null, 2));
  }

  if (options.set) {
    console.log('set config');
  }

  if (options.add) {
    const available = ['qiniu', 'aliyun', 'none?'];
    const questions = [
      {
        type: 'list',
        name: 'server',
        message: 'Which file server do you want to upload to?',
        choices: available
      }
    ];
    const answers = await inquirer.prompt(questions)
    switch (answers.server) {
      case 'qiniu':
        await setQiniuConfig();
        return;
      case 'aliyun':
        await setAliyunConfig();
        return;
      default:
        console.log('If you don\'t have a server provider, you must get one first. Please check the document for more information.');
    }
  }

  if (options.edit) {
    setAliyunConfig();
  }
}

async function setAliyunConfig() {
  const config = {
    server: 'aliyun',
  };
  console.log('Configing for ' + chalk.cyan('aliyun') + ' server:\n' + chalk.dim('(Find accessIdKey, accessSecretKey, bucket, region and baseURL from your aliyun account.)'));
  const required = (val) =>  val ? true : 'required!';
  const questions = [
    {
      type: 'input',
      name: 'accessIdKey',
      message: chalk.yellow('accessIdKey') + ': ',
      validate: required
    }, {
      type: 'input',
      name: 'accessSecretKey',
      message: 'AccessSecretKey of aliyun OSS: ',
      validate: required
    }, {
      type: 'input',
      name: 'bucket',
      message: 'Bucket of aliyun OSS: ',
      validate: required
    }, {
      type: 'input',
      name: 'region',
      message: 'Region of aliyun OSS: ',
      validate: required
    }, {
      type: 'input',
      name: 'baseURL',
      message: 'Base URL of aliyun OSS (optional): ',
    }
  ];
  inquirer
    .prompt(questions)
    .then(answers => {
      Object.assign(config, answers);
      console.log('Your config for aliyun: \n' + JSON.stringify(config, null, 2));
      inquirer.prompt([{
        type: 'confirm',
        name: 'confirm',
        message: 'Are sure for this?(Yes)',
        default: true
      }, {
        type: 'confirm',
        name: 'default',
        message: 'Set it as default?(Yes)',
        default: true
      }]).then(answers => {
        console.log(answers);
        if (!answers.confirm) {
          return;
        }
        addConfig(config, answers.default);
      })
    })
}


async function setQiniuConfig() {
  const config = {
    server: 'qiniu',
  };
  console.log('Configing for ' + chalk.cyan('qiniu') + ' server:\n' + chalk.dim('(Find accessKey, secretKey, bucket, region and baseURL from your qiniu account.)'));
  const required = (val) =>  val ? true : 'required!';
  const questions = [
    {
      type: 'input',
      name: 'accessKey',
      message: chalk.yellow('accessKey') + ': ',
      validate: required
    }, {
      type: 'input',
      name: 'secretKey',
      message: chalk.yellow('secretKey') + ': ',
      validate: required
    }, {
      type: 'input',
      name: 'bucket',
      message: chalk.yellow('bucket') + ': ',
      validate: required
    }, {
      type: 'input',
      name: 'region',
      message: chalk.yellow('region') + ': ',
      validate: required
    }, {
      type: 'input',
      name: 'baseURL',
      message: chalk.yellow('baseURL') + ': ',
    }
  ];
  inquirer
    .prompt(questions)
    .then(answers => {
      Object.assign(config, answers);
      console.log('Your config for qiniu: \n' + JSON.stringify(config, null, 2));
      inquirer.prompt([{
        type: 'confirm',
        name: 'confirm',
        message: 'Are sure for this?(Yes)',
        default: true
      }, {
        type: 'confirm',
        name: 'default',
        message: 'Set it as default?(Yes)',
        default: true
      }]).then(answers => {
        console.log(answers);
        if (!answers.confirm) {
          return;
        }
        addConfig(config, answers.default);
      })
    })
}

module.exports = config;
