const fs = require("fs");
const glob = require('glob');
const path = require('path')
const { readdirSync } = require('fs')

let FILE_MODES = {
  CTIME: 0,
  VERSION: 1
},
  PARSE_FOR = {
    VERSION: 0
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


function getMDFileUpdatesByVersionParsed(path, mode) {
  let parser = (filepath, parse_for)=>{
    switch(parse_for) {
      case PARSE_FOR.VERSION:
        text = fs.readFileSync(filepath, "utf8", (error)=>{throw error;});
        let lines = text.split("\n");
        var version = 1;
        for(var i=0; i<lines.length; i++) {
          var line = lines[i]; 
          let regExp = /<!--+\s*Version:\s*([0-9\.]+)/i;
          let matchedGroup1 = line.match(regExp);
          if(matchedGroup1) {
            version = matchedGroup1[1];
            break;
          }
        }
        return version;
        break;
      default:
        throw "Error: Unable to parse version";
    } // cases
    
  } // def parser

  let alphaSorted = fs.readdirSync(path).filter(function (filename) {
    let isFile = file => fs.statSync(path+'/'+file).isFile(),
      isHidden = file => (/(^|\/)\.[^\/\.]/g).test(file),
      isMDFile = file => (/\.md$/g).test(file);
    return !isHidden(filename) && isFile(filename) && isMDFile(filename);
  });
  alphaSorted = alphaSorted.map(filename=>{
    let filepath = path+'/'+filename;
    return {
      filename,
      path,
      ctimeMs: fs.statSync(path+'/'+filename).ctimeMs,
      version: parser(filepath, PARSE_FOR.VERSION)
    }
  });
  // console.log({alphaSorted});
  
  if(mode===FILE_MODES.CTIME)
    return alphaSorted.sort(function(fileInfo, fileInfo2) {
      if(fileInfo.ctimeMs < fileInfo2.ctimeMs) {
        return -1
      } else if(fileInfo.ctimeMs > fileInfo2.ctimeMs) {
        return 1
      } else {
        return 0;
      }
    });
  else if(mode===FILE_MODES.VERSION)
    return alphaSorted.sort(function(fileInfo, fileInfo2) {
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

describe('Read updates mock folder by version parsed', () => {

  let updatesPath = path.resolve(__dirname, "updates"); 
  // console.log({updatesPath})
  let updates = getMDFileUpdatesByVersionParsed(updatesPath, FILE_MODES.VERSION);
  // console.log(updates);

  test('MD files counted', () => {
      expect(updates.length).toBe(4);
  });

  test('MD file versions matched', () => {
    expect(updates[0].version).toBe("1.1");
    expect(updates[1].version).toBe("1.2");
    expect(updates[2].version).toBe("1.3");
    expect(updates[3].version).toBe("1.4");
  });

  test('MD files matched', () => {
    expect(updates[0].filename).toBe("a.md");
    expect(updates[1].filename).toBe("b.md");
    expect(updates[2].filename).toBe("d-but-should-be-third.md");
    expect(updates[3].filename).toBe("c.md");
  });

});