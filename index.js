const routeFunctions = require('./src/functions.js');
const mdLinks = () => {
  routeFunctions.readFileMd()
  .then(routeFunctions.getLinks)
  .then(routeFunctions.extMd);
  routeFunctions.routeAbsolute();
}

mdLinks();
