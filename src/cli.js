#!/usr/bin/env node

const { mdLinks } = require('../index.js');
const process = require('process');
const yargs = require('yargs');
const [, , ...args] = process.argv;
const chalk = require('chalk');
const figlet = require('figlet');
let route = args[0]

figlet.text('MD-LINKS', {
    font: 'ANSI Shadow',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 90
}, function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data);
});


const argv = yargs
    .option('validate', {
        alias: 'v',
        description: 'Validate the links of your path or file',
        type: 'boolean'
    })
    .option('stats', {
        alias: 's',
        description: 'Shows the statistics of the links',
        type: 'boolean'
    })
    .option('resolve', {
        alias: 'r',
        description: 'Displays the content of the file',
        type: 'boolean'
    })
    .help()
    .alias('help', 'h')
    .argv


if (argv.validate && !argv.stats) {
    mdLinks(route, { validate: true })
        .then((links) => {
            links.forEach(object => {
                console.table({
                    file: object.file,
                    href: object.href,
                    text: object.text,
                    status: object.status,
                    code: object.code
                })
            })
        })
} else if (argv.stats && !argv.validate) {
    mdLinks(route, {stats: true})
        .then((links) => {
            console.table({
                Total: links.length, Unique: [...new Set(links.map((allLinks) =>
                    allLinks.href))].length
            });
        })
} else if (argv.stats && argv.validate) {
    mdLinks(route, { validate: true })
        .then(links => {
            console.table({
                Total: links.length, Unique: [...new Set(links.map((allLinks) =>
                    allLinks.href))].length, Broken: links.filter((object) => object.code !== '200').length
            })
        })
} else if (argv.resolve) {
    mdLinks(route, {validate: false}).then(array => {
        array.forEach(object => {
            console.table({
                file: object.file,
                href: object.href,
                text: object.text
            })
        })
    })
} else if (!argv.validate && !argv.stats) {
    mdLinks(route).then(() => {
        console.log(`${chalk.black.bgMagenta('Please enter a valid command')}`)
    })
}
