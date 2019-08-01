const setupQiniuUploader = require('./uploaders/qiniuUploader');
const setupAliUploader = require('./uploaders/aliyunUploader');
const { getConfig, checkConfig } = require('./util/configUtils');

async function upload(val, cmd) {
  if (!checkConfig()) return;
  const config = await getConfig();
  let uploader;
  let res;
  switch (config.server) {
    case 'aliyun':
      uploader = await setupAliUploader(config);
      res = await uploader(val);
      console.log(res);
      return;
    case 'qiniu':
      uploader = await setupQiniuUploader(config);
      res = await uploader(val);
      console.log(res);
      return;
    default:
      break;
  }
}

module.exports = upload;
