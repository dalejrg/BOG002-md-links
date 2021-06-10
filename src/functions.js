const path = require('path');
const fs = require('fs');
const expectedLink = /https?:\S+\w/g;
const text = /\[(.*?)\]/gm;
let file = './README.md';

/* Read file */
const readFileMd = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', (err, data) => {
            resolve(data);
            reject(err);



        });
    })
}

/* get links */
const getLinks = () => {
    fs.readFile(file, 'utf8', (err, data) => {
    const links = data.match(expectedLink);
    const texts = data.matchAll(text);
    const arrayLinks = [];

    links.forEach((link) => {
        let foundText = texts.next()
        const foundLink = link;
        const objLink = {
            file: file,
            href: foundLink,
            text: foundText.value[1]
        }
        arrayLinks.push(objLink)
    })
    console.log(arrayLinks);
}) 
}

/* validate file .md */
const extMd = () => {
    return new Promise((resolve, reject) => {
        if (path.extname(file) === '.md') {
            resolve(console.log('the file is .md'));
        } else {
            reject(console.log('it is not an .md file'));
        }
    })
}

/* Route file absolute */
const routeAbsolute = () => {
    const absolute = path.isAbsolute(file)
    ? file : path.resolve(file)
}

module.exports = {
    readFileMd, extMd, getLinks, routeAbsolute
}
