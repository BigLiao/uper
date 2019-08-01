const chalk = require('chalk');
const setupQiniuUploader = require('./uploaders/qiniuUploader');
const setupAliUploader = require('./uploaders/aliyunUploader');
const { getConfig, checkConfig } = require('./util/configUtils');

async function upload(val) {
  if(!await checkConfig()) return;
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
  const files = val;
  const multiple = files.length > 1;
  for (let i = 0; i < files.length; i++) {
    uploader(files[i]).then(res => {
      if (multiple) {
        console.log(files[i] + chalk.green('  =>  ') + res);
      } else {
        console.log(res);
      }
    }).catch(err => {
      console.err(err);
    });
  }
  
}

module.exports = upload;
