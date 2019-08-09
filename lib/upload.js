const chalk = require('chalk');
const clipboardy = require('clipboardy');
const setupQiniuUploader = require('./uploaders/qiniuUploader');
const setupAliUploader = require('./uploaders/aliyunUploader');
const { getConfig, checkConfig } = require('./util/configUtils');

async function upload(val) {
  if(!await checkConfig()) return;
  console.log("")
  const config = await getConfig();
  let uploader;
  switch (config.server) {
    case 'aliyun':
      uploader = await setupAliUploader(config);
      break;
    case 'qiniu':
      uploader = await setupQiniuUploader(config);
      break;
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
        console.err(err);
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
