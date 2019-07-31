const crypto = require('crypto');
const fs = require('fs-extra');

async function getHash(file) {
  const hash = crypto.createHash('md5');
  try {
    const fileData = await fs.readFile(file);
    hash.update(fileData);
    const key = hash.digest('hex');
    return key;
  } catch (error) {
    throw error;
  }
}

module.exports = getHash;
