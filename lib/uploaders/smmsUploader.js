const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');
const getHash = require('../util/getHash');
const FormData = require('form-data');

async function setupUploader(config) {
  const smmsAPI = 'https://sm.ms/api/v2/upload';
  const uploader = function(file) {
    return new Promise(async (resolve, reject) => {
      const formData = new FormData();
      formData.append('smfile', fs.createReadStream(file));
      axios({
        url: smmsAPI,
        method: 'post',
        data: formData,
        headers: {
          ...(formData.getHeaders()),
          // Authorization: config.secretKey,
          // 'origin': 'https://sm.ms',
          // 'referer': 'https://sm.ms/',
          // 'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36'
        }
      }).then(res => {
        if (res.data.success) {
          resolve(res.data.data.url);
        } else {
          reject(new Error(res.data.message));
        }
      }).catch(err => {
        reject(err);
      })
    });
  };
  return uploader;
}

module.exports = setupUploader;
