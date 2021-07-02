const objectLinks = [
    {
        file: './folder/pruebamd/prueba.md',
        text: 'youtube',
        href: 'https://www.youtube.com'
    },
    {
        file: './folder/pruebamd/prueba.md',
        text: 'Enlace Roto',
        href: 'https://www.sensacine.com/404'
    },
    {
        file: './folder/pruebamd/prueba.md',
        text: 'Markdown',
        href: 'https://es.wikipedia.org/wiki/Markdown'
    },
    {
        file: './folder/pruebamd/prueba.md',
        text: 'Enlace Roto',
        href: 'https://www.sensacine.com/404'
    }
];

const objectLinksValidate = [
    {
        file: './folder/pruebamd/prueba.md',
        href: 'https://www.youtube.com',
        text: 'youtube',
        status: 'ok',
        code: '200'
    },
    {
        file: './folder/pruebamd/prueba.md',
        href: 'https://www.sensacine.com/404',
        text: 'Enlace Roto',
        status: 'fail',
        code: '404'
    },
    {
        file: './folder/pruebamd/prueba.md',
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        status: 'ok',
        code: '200'
    },
    {
        file: './folder/pruebamd/prueba.md',
        href: 'https://www.sensacine.com/404',
        text: 'Enlace Roto',
        status: 'fail',
        code: '404'
    }
];


module.exports = {
    objectLinks,
    objectLinksValidate
}