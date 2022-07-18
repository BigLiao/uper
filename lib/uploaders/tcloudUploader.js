var COS = require('cos-nodejs-sdk-v5');
const fs = require('fs-extra');
const path = require('path');
const getHash = require('../util/getHash');
const { checkFile } = require('../util/tools');

async function setupUploader(config) {

  const { bucket, accessKey, secretKey, baseURL, region } = config;


  var cos = new COS({
    SecretId: accessKey,
    SecretKey: secretKey
  });

  const uploader = function(file) {
    return new Promise(async (resolve, reject) => {
      if (checkFile(file)) {
        const fileExtension = path.extname(file);
        const hash = await getHash(file);
        const key = hash + fileExtension;

        cos.putObject({
          Bucket: bucket, /* 填入您自己的存储桶，必须字段 */
          Region: region,  /* 存储桶所在地域，例如ap-beijing，必须字段 */
          Key: key,  /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
          StorageClass: 'STANDARD',
          /* 当Body为stream类型时，ContentLength必传，否则onProgress不能返回正确的进度信息 */
          Body: fs.createReadStream(file), // 上传文件对象
          ContentLength: fs.statSync(file).size,
        }, function (err, data) {
          if (err) {
            console.log(err || data);
            return reject(err);
          }
          resolve('https://'+ data.Location);
        });
      }
    })
  };

  return uploader;
}

module.exports = setupUploader;
