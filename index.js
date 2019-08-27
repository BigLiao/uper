const glob = require('glob');
const upload = require('./lib/upload');

/**
 * 上传文件
 * @param {string} path 文件路径，支持glob
 */
module.exports.upload = function(filepath, config) {
  return new Promise((resolve, reject) => {
    glob(filepath, {
      nodir: true,
      absolute: true
    }, function(err, files) {
      if (err) {
        reject(err)
        return;
      }
      upload(files, config)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  });
}
