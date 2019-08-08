/**
 * Parse markdown files
 */
const FsLine = require('fs-line');
const path = require('path');
const upload = require('./upload');

function searchImg(line) {
  const regexp = /!\[.*\]\((.+)\)/;
  const result = regexp.exec(line);
  if (result) {
    return result[1];
  } else {
    return null;
  }
}

function isUrl(str) {
  return /^http(s)?:\/\//.test(str);
}

async function parseMarkdown(file) {
  const filePath = path.resolve(process.cwd(), file);
  console.log(filePath);
  const fsline = new FsLine();
  fsline.open(filePath);
  fsline.on('line', async (line, next) => {
    const imgPath = searchImg(line);
    if (imgPath) {
      if (isUrl(imgPath)) {
        console.log('is url ', imgPath);
      } else {
        console.log('local ', imgPath);
        const res = await upload(imgPath);
        console.log('res', res);
      }
    }
    next();
  })
}

module.exports = parseMarkdown;
