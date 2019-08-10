const fs = require('fs-extra');
const chalk  = require('chalk');

module.exports.checkFile = function(file) {
  if (fs.existsSync(file)) {
    const stats = fs.statSync(file);
    if (stats.isFile()) {
      return true;
    }
  } else {
    console.error(chalk.red('Error:') + ' file \"' + file + '\" not exists');
    return false;
  }
}