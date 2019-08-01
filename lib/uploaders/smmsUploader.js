const fs = require('fs-extra');
const path = require('path');
const request = require('request');
const getHash = require('../util/getHash');

/**
 * 貌似接口已经访问不了，403 错误
 * 废弃吧！
 */
async function setupUploader() {
  const smmsAPI = 'https://sm.ms/api/upload?inajax=1&ssl=1';
  const uploader = function(file) {
    return new Promise(async (resolve, reject) => {
      const buffer = await fs.readFile(file);
      const hash = await getHash(file);
      const fileName = hash + path.extname(file);
      const formData = {};
      formData['smfile'] = buffer;
      request.post({
        url: smmsAPI,
        formData,
        headers: {
          Cookie: 'PHPSESSID=p1bbsuqcgsdkgd4u4q02llhvkp; cid=rBWawl1ChQABPGzTDyIkAg=='
        }
      }, (err, res, body) => {
        if (err) {
          console.error(res);
          reject(err);
        } else {
          console.log(res);
          resolve(res);
        }
      })
    });
  };
  return uploader;
}

module.exports = setupUploader;
