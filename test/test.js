const uper = require('../index');
const path = require('path');

const testConfig = {
  server: 'smms',
  secretKey: '1w8bK6Pgd9E5gq1DzaHzTiB2ErFUVVTd'
}

const testQiniuConfig = {
  "server": "qiniu",
  "accessKey": "jRqyPYM5eiubPWfzxVsPE9PsnV4N8MtgDOa-aTj_",
  "secretKey": "aGsZsqdeWVLOFWx4WQvkjqPydSplMcnMglQgAX0l",
  "bucket": "bigliao",
  "baseURL": "https://cdn.bigliao.com/"
};
const testPic = path.resolve(__dirname, './pic.jpeg');

describe('Test smms', () => {
  it('upload', async () => {
    return uper.upload(testPic, testConfig).then(res => {
      // console.log(res);
    });
    
  })
});
