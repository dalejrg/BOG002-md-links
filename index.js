const routeFunctions = require('./src/functions.js');
const path = './README.md';

const mdLinks = (route, validate = false) => {
  routeFunctions.extMd(path)
  routeFunctions.routeAbsolute(path)
  return routeFunctions.readFileMd(route)
    .then((data) => {
      return Promise.all(routeFunctions.getLinks(data, path, validate))
    })
    .then(console.log)
    .catch(error => error)

}

mdLinks(path, true);
