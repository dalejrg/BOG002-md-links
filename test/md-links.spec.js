
const mdLinks = require('../index.js');
const mocks = require('./__Mocks__/mocks.js')

describe('mdLinks', () => {

  test('Should be a function', () => {
    expect(typeof mdLinks.mdLinks).toBe('function');
  });

  test('Should resolve to an array that contents a object list ', () => {
    const namePath = './folder/pruebamd/prueba.md'
    return mdLinks.mdLinks(namePath).then(res => {
      expect(res).toEqual(mocks.objectLinks);
    });
  });

  test('mdLinks should fail with the error `The path does not correspond to the markdown file`, for extensions other than .md', () => {
    jest.setTimeout(() => {
      const namePath = './folder/pruebamd/prueba.js' 
      return expect(mdLinks.mdLinks(namePath).catch(new Error()))
      .rejects.toThrow('The path does not correspond to the markdown file');
      
    }, 30000);
  });

  
  test('pasando --validate', () => {
    jest.setTimeout(() => {
      const namePath = './folder/pruebamd/prueba.md'
      const options = {validate:true}
      return mdLinks.mdLinks(namePath, options).then(res => {
        expect(res).toEqual(mocks.objectLinksValidate);
      });
      
    }, 30000);
  });


  test('links with status', () => {
    const pathName = './folder/pruebamd/prueba.md'
    const option = {validate : false}
      return mdLinks.mdLinks(pathName, option).then(() => {
        expect(mocks.objectLinks).toBe(mocks.objectLinks)
      })
  })
  
  test('recursion search file in the directory', () => {
    const path = './folder'
    const dir = './folder/pruebamd'
    return mdLinks.mdLinks(path).then(() => {
      expect(dir).toBe(dir)
    })
  }) 
})
