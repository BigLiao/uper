const uper = require('../index');
const path = require('path');

const testConfig = {
  server: 'smms',
}

const testPic = path.resolve(__dirname, './pic.jpeg');

describe('Test upload', function () {
  it('upload to smms', async function () {
    this.timeout(5000);
    return uper.upload(testPic, testConfig);
  })
});
