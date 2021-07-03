const path = require('path');
const fs = require('fs');
const expectedLink = /https?:\S+\w/g;
const text = /\[(.*?)\]/gm;
const fetch = require('node-fetch');
const directory = require('node-dir')

const isDirectory = route =>
    fs.lstatSync(route).isDirectory();


const isFile = route =>
    fs.lstatSync(route).isFile();

    const dirOrFile = (route) => {
        return new Promise ((resolve) => {
        if (isDirectory(route)) {
            directory.promiseFiles(route)
        .then(files => files.filter(file => path.extname(file) === '.md'))
        .then(filesMd => {
            const mdFilesArr = filesMd.map(file => fs.readFileSync(file, 'utf-8'))
            resolve(mdFilesArr.join(' '));
        })
    } else if (isFile(route)) {
        if (path.extname(route) === '.md') {
            const fileRead = fs.readFileSync(route, 'utf-8')
            resolve (fileRead)
        }
    }
})
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
            } if (response.status !== 200) {
                return { ...object, status: 'fail', code: `${response.status}` }
            }
        })
        .catch((error) => {

        })
}

module.exports = {
    getLinks,
    dirOrFile
}
