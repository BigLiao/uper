const AliOSS = require('ali-oss');
const fs = require('fs-extra');
const path = require('path');
const getHash = require('../util/getHash');
const {checkFile} = require('../util/tools');

async function setupUploader(config) {

  const { bucket, accessKey, secretKey, baseURL, region } = config;
  
  const ossClient = new AliOSS({
    accessKeyId: accessKey,
    accessKeySecret: secretKey,
    bucket: bucket,
    region: region
  })

  const uploader = function(file) {
    return new Promise(async (resolve, reject) => {
      if (checkFile(file)) {
        const fileExtension = path.extname(file);
        const hash = await getHash(file);
        const key = hash + fileExtension;
        try {
          const res = await ossClient.put(key, file);
          const result = baseURL === '/' ?  res.url : baseURL + res.name;
          resolve(result);
        } catch (e) {
          console.log(e);
          reject(e);
        }
      }
    })
  };

  return uploader;
}

module.exports = setupUploader;
