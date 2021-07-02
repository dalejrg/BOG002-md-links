const routeFunctions = require('./src/functions.js');

const mdLinks = (route, validate = false) => {
  return routeFunctions.dirOrFile(route)
  .then(data => 
    Promise.all(routeFunctions.getLinks(data, route, validate)))
  
}

module.exports = {mdLinks}
