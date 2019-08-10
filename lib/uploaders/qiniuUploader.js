const qiniu = require('qiniu');
const fs = require('fs-extra');
const path = require('path');
const getHash = require('../util/getHash');
const {checkFile} = require('../util/tools');


async function setupUploader(config) {

  const { bucket, accessKey, secretKey, baseURL } = config;
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  const options = {
    scope: bucket,
  };
  const putPolicy = new qiniu.rs.PutPolicy(options);

  const uploadToken = putPolicy.uploadToken(mac);
  const qiniuConf = new qiniu.conf.Config();

  const formUploader = new qiniu.form_up.FormUploader(qiniuConf);
  const putExtra = new qiniu.form_up.PutExtra();

  const uploader = function(file) {
    return new Promise(async (resolve, reject) => {
      if (checkFile(file)) {
        const fileExtension = path.extname(file);
        const hash = await getHash(file);
        const key = hash + fileExtension;
        formUploader.putFile(uploadToken, key, file, putExtra, (respErr, respBody, respInfo) => {
          if (respErr) {
            reject(respErr);
          } else if (respInfo.statusCode === 200) {
            const result = baseURL + respBody.key;
            resolve(result);
          } else {
            console.log(respInfo);
          }
        })
      }
    })
  };

  return uploader;
}

module.exports = setupUploader;
