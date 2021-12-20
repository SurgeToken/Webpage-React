const fs = require("fs");
const glob = require('glob');
const path = require('path')
const { readdirSync } = require('fs')

describe('Test preliminary setup', () => {

    test('Test', () => {
        expect(true).toBe(true);
    });

});

describe('Read updates mock directory', () => {

    function getMDFileUpdates(path) {
        return fs.readdirSync(path).filter(function (ptr) {
          let isFile = file => fs.statSync(path+'/'+file).isFile(),
            isHidden = file => (/(^|\/)\.[^\/\.]/g).test(file),
            isMDFile = file => (/\.md$/g).test(file);
          return !isHidden(ptr) && isFile(ptr) && isMDFile(ptr);
        });
      }

    let updatesPath = path.resolve(__dirname, "updates"); 
    // console.log({updatesPath})
    let updates = getMDFileUpdates(updatesPath);
    // console.log(updates);

    test('MD files counted', () => {
        expect(updates.length).toBe(4);
    });

    test('MD files matched', () => {
        expect(updates[0]).toBe("a.md");
        expect(updates[1]).toBe("b.md");
        expect(updates[2]).toBe("c.md");
        expect(updates[3]).toBe("d-but-should-be-third.md");
    });

});

// Todo: Chronologically by created date

// Todo: Parse <!-- --> comments, then parse version and other keywords