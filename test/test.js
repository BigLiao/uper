const uper = require('../index');
const path = require('path');

const testConfig = {
  server: 'smms',
}

const testPic = path.resolve(__dirname, './pic.jpeg');

describe('Test upload', function () {
  this.timeout(5000);
  it('upload to smms', async function () {
    return uper.upload(testPic, testConfig);
  })
});

describe('Test glob', () => {
  it('upload by glob', function () {
    return uper.upload('test/*');
  })
});

