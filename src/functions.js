const path = require('path');
const fs = require('fs');
const expectedLink = /https?:\S+\w/g;
const text = /\[(.*?)\]/gm;
const fetch = require('node-fetch');
const { resolve } = require('path');


/* validate file .md */
const extMd = (file) => {
    if (path.extname(file) === '.md') {
        console.log('the file is .md');
    } else {
        console.log('it is not an .md file');
    }
}

/* Read file */
const readFileMd = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            resolve(data);
            reject(err);
        });
    });
}
const getLinks = (data, path, validate) => {
    const links = data.match(expectedLink);
    const texts = data.matchAll(text);
    const arrayLinks = [];

    links.forEach((link) => {
        let foundText = texts.next()
        const foundLink = link;
        const object = {
            file: path,
            href: foundLink,
            text: foundText.value[1],
        }
        const objLinkPromise = new Promise((resolve) => {
            resolve(object)
        })
        if (validate === false) {
            arrayLinks.push(objLinkPromise)
        } else {
            arrayLinks.push(statusLinks(object))
        }
    })
    return arrayLinks;
}

const statusLinks = (object) => {
    return fetch(object.href)
        .then((response) => {
            if (response.status === 200) {
                return { ...object, status: 'ok', code: `${response.status}` }
            } else {
                return { ...object, status: 'fail', code: `${response.status}` }
            }
        })
        .catch((error) => {

        })
}


/* Route file absolute */
const routeAbsolute = (data) => {
    const absolute = path.isAbsolute(data)
        ? path : path.resolve(data)
    return absolute;
};




module.exports = {
    readFileMd,
    extMd,
    routeAbsolute,
    getLinks
}
