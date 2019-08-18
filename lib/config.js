const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');
const { getConfig, addConfig, deleteConfig, checkConfig, showConfig } = require('./util/configUtils');
const upload = require('./upload');

async function config(value, options) {
  // 默认打印配置结果
  if (!options.add && !options.get && !options.edit) {
    showConfig();
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
      transformer: (input) => /\/$/.test(input) ? input : input + '/'
    }
  ];
  inquirer
    .prompt(questions)
    .then(answers => {
      Object.assign(config, answers);
      config.baseURL = /\/$/.test(config.baseURL) ? config.baseURL : config.baseURL + '/'
      inquirer.prompt([
        {
          type: 'confirm',
          name: 'default',
          message: 'Save as default?(Yes)',
          default: true
        }
      ]).then(answers => {
        const test_file_path = path.resolve(__dirname, '../test/pic.jpeg');
        upload(test_file_path, config).then(res => {
          console.log(chalk.red('Test success: ') + res);
          addConfig(config, answers.default);
        }).catch(err => {
          console.log(chalk.red('Config error: '));
          console.log(err);
        });
      });
    });
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
      name: 'baseURL',
      message: chalk.yellow('baseURL') + ': ',
      validate: required,
      transformer: (input) => /\/$/.test(input) ? input : input + '/'
    }
  ];
  inquirer
    .prompt(questions)
    .then(answers => {
      Object.assign(config, answers);
      config.baseURL = /\/$/.test(config.baseURL) ? config.baseURL : config.baseURL + '/'
      inquirer.prompt([
        {
          type: 'confirm',
          name: 'default',
          message: 'Save as default?(Yes)',
          default: true
        }
      ]).then(answers => {
        const test_file_path = path.resolve(__dirname, '../test/pic.jpeg');
        upload(test_file_path, config).then(res => {
          console.log(chalk.red('Test success: ') + res);
          addConfig(config, answers.default);
        }).catch(err => {
          console.log(chalk.red('Config error: '));
          console.log(err);
        });
      });
    });
}

module.exports = config;
