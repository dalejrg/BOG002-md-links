#!/usr/bin/env node

const {mdLinks} = require('../index.js');
const process = require('process');
const yargs = require('yargs');
const [, , ...args] = process.argv
let route = args[0]

const argv = yargs
.option('validate', {
        alias: 'v',
        description: 'validate the links of your path or file',
        type: 'boolean'
    })
    .option('stats', {
        alias: 's',
        description: 'shows the statistics of the links',
        type: 'boolean'
    })
    .help()
    .alias('help', 'h')
    .argv
    

    if (argv.validate && !argv.stats) {
        mdLinks(route, { validate: true })
        .then((links) => {
            links.forEach(object => {
                console.log({
                    file: object.file,
                    href: object.href,
                    text: object.text,
                    status: object.status,
                    code: object.code
                })
            })
        })
    } else if (argv.stats && !argv.validate) {
        mdLinks(route)
        .then((links) => {
            console.log ({ 
            total: links.length, unique: [...new Set(links.map((allLinks) => 
            allLinks.href))].length });
        })
    } else if (argv.stats && argv.validate) {
        mdLinks(route, {validate:true})
        .then(links => {
            console.log({
                total: links.length, unique: [...new Set(links.map((allLinks) => 
                allLinks.href))].length, broken: links.filter((object) => object.code !== '200').length
            })
        })
    } else if (!argv.validate && !argv.stats) {
        console.log('Please enter a valid command')
        mdLinks(route, { validate: false, stats: false })
    } else if(route === 'false' || route === 'undefined') {
        console.log('Please enter a valid route')
    } 















/* const yargs = require('yargs')
const [, , ...args] = process.argv
const path = args[0] */

/* const argv = yargs
    .option('validate', {
        alias: 'v',
        description: 'validate the links of your path or file',
        type: 'boolean'
    })
    .option('stats', {
        alias: 's',
        description: 'shows the statistics of the links',
        type: 'boolean'
    })
    .help()
    .alias('help', 'h')
    .argv */

/* if (argv.validate) {
    console.log('validate')
    console.log(mdLinks(path))
    .then((link) => {
        link.forEach(elem => {
            console.log({
                file: elem.file,
                href: elem.href,
                text: elem.text,
                status: elem.status,
                code: elem.code
            })
        }).then(console.log)
    })
} */

/* if (statOpt === '--stats' || statOpt === '-s') {
    options.stats = true
}

if (path === false || path === undefined) {
    console.log('Please enter a path or file')
} */

/* mdLinks(path, options)
.then(console.log) */