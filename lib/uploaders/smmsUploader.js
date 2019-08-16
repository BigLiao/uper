const fs = require('fs-extra');
const path = require('path');
const request = require('request');
const axios = require('axios');
const getHash = require('../util/getHash');

require('request').debug = true;
require('request-debug')(request, function(type, data, r) {
  // put your request or response handling logic here
  if (type === 'request') {
    console.log(data);
  }
});

/**
 * 貌似接口已经访问不了，403 错误
 * 废弃吧！
 */
async function setupUploader(config) {
  const smmsAPI = 'https://sm.ms/api/v2/upload';
  const uploader = function(file) {
    return new Promise(async (resolve, reject) => {
      const buffer = await fs.readFile(file);
      const hash = await getHash(file);
      const fileName = hash + path.extname(file);
      const formData = {};
      formData['smfile'] = {
        value:  fs.createReadStream(file),
        options: {
          filename: 'topsecret.jpg',
          contentType: 'image/jpeg'
        }
      };
      // console.log(formData);
      request.post({
        url: smmsAPI,
        formData,
        headers: {
          Cookie: 'PHPSESSID=p1bbsuqcgsdkgd4u4q02llhvkp; cid=rBWawl1ChQABPGzTDyIkAg==',
          'Authorization': config.secretKey
        }
      }, (err, res, body) => {
        if (err) {
          // console.error(res);
          console.log('error');
          reject(body);
        } else {
          // console.log(res);
          console.log('response');
          resolve(body);
        }
      })
    });
  };
  return uploader;
}

module.exports = setupUploader;
