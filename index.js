const routeFunctions = require('./src/functions.js');

const mdLinks = () => {
  routeFunctions.readFileMd();
  routeFunctions.extMd();
  routeFunctions.getLinks();
  routeFunctions.routeAbsolute();
}
mdLinks();