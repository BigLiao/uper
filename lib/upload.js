const chalk = require('chalk');
const path = require('path');
const clipboardy = require('clipboardy');
const setupQiniuUploader = require('./uploaders/qiniuUploader');
const setupAliUploader = require('./uploaders/aliyunUploader');
const setupSmmsUploader = require('./uploaders/smmsUploader');
const setupTCloudUploader = require('./uploaders/tcloudUploader');
const { getConfig } = require('./util/configUtils');

async function upload(val, optionConfig) {
  let config;
  if (optionConfig) {
    config = optionConfig;
  } else {
    config = await getConfig();
  }
  console.log("");
  let uploader;
  switch (config.server) {
    case 'aliyun':
      uploader = await setupAliUploader(config);
      break;
    case 'qiniu':
      uploader = await setupQiniuUploader(config);
      break;
    case 'smms':
      uploader = await setupSmmsUploader(config);
    case 'tcloud':
      uploader = await setupTCloudUploader(config);
    default:
      break;
  }
  if (Array.isArray(val)) {
    const files = val;
    const multiple = files.length > 1;
    for (let i = 0; i < files.length; i++) {
      uploader(files[i]).then(res => {
        if (multiple) {
          console.log('\"' + files[i] + '\"' + chalk.blue(' => ') + '\"' + res + '\"');
        } else {
          console.log('\"' + files[i] + '\"' + chalk.blue(' => ') + '\"' + res + '\"' + chalk.blue(' => ') + chalk.yellow('Clipboard'));
        }
        clipboardy.writeSync(res);
      }).catch(err => {
        console.error(err);
      });
    }
  } else {
    return new Promise((resolve, reject) => {
      uploader(val).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    })
  }
  
}

module.exports = upload;
