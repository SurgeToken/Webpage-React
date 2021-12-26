const fs = require("fs");
const glob = require('glob');
const path = require('path')
const { readdirSync } = require('fs')

let FILE_MODES = {
  CTIME: 1,
  VERSION: 2
} 

function getMDFileUpdates(path, mode) {

  let alphaSorted = fs.readdirSync(path).filter(function (filename) {
    let isFile = file => fs.statSync(path+'/'+file).isFile(),
      isHidden = file => (/(^|\/)\.[^\/\.]/g).test(file),
      isMDFile = file => (/\.md$/g).test(file);
    return !isHidden(filename) && isFile(filename) && isMDFile(filename);
  });
  
  
  if(mode===FILE_MODES.CTIME)
    return alphaSorted.sort(function(filename, filename2) {
      fileInfo = fs.statSync(path+'/'+filename);
      fileInfo2 = fs.statSync(path+'/'+filename2)
      // console.log({fileInfo,fileInfo2})
      if(fileInfo.ctimeMs < fileInfo2.ctimeMs) {
        return -1
      } else if(fileInfo.ctimeMs > fileInfo2.ctimeMs) {
        return 1
      } else {
        return 0;
      }
    });
  else {
    return alphaSorted;
  }
}

describe('Test preliminary setup', () => {

    test('Test', () => {
        expect(true).toBe(true);
    });

});

describe('Read updates mock folder', () => {

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

describe('Read updates mock folder by created times', () => {

  let updatesPath = path.resolve(__dirname, "updates"); 
  // console.log({updatesPath})
  let updates = getMDFileUpdates(updatesPath, FILE_MODES.CTIME);
  // console.log(updates);

  test('MD files counted', () => {
      expect(updates.length).toBe(4);
  });

  test('MD files matched', () => {
      expect(updates[0]).toBe("a.md");
      expect(updates[1]).toBe("b.md");
      expect(updates[2]).toBe("d-but-should-be-third.md");
      expect(updates[3]).toBe("c.md");
  });

});

// Todo: Chronologically by created date

// Todo: Parse <!-- --> comments, then parse version and other keywords