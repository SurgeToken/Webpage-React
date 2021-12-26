const fs = require("fs");
const {readdirSync} = fs;
const glob = require('glob');
const path = require('path')

let FILE_MODES = {
    ALPHA: 0,
    CTIME: 1,
    VERSION: 2
  },
PARSE_FOR = {        
    VERSION: 0,
    TITLE: 1,
    ALL: 2
}

const readUpdates = {
    getUpdates: ()=>{

        let parser = (filepath, parse_for) => {
            switch(parse_for) {
                case PARSE_FOR.VERSION:
                    var text = fs.readFileSync(filepath, "utf8", (error)=>{throw error;});
                    var lines = text.split("\n");
                    var version = 1;
                    for(var i=0; i<lines.length; i++) {
                    var line = lines[i]; 
                    var regExp = /<!--+\s*Version:\s*([0-9\.]+)/i;
                    var matchedGroup1 = line.match(regExp);
                    if(matchedGroup1) {
                        version = matchedGroup1[1];
                        break;
                    }
                    }
                    return version;
                    break;
                case PARSE_FOR.TITLE:
                    var text = fs.readFileSync(filepath, "utf8", (error)=>{throw error;});
                    var lines = text.split("\n");
                    if(lines.length)
                        return lines[0].replaceAll("#", "").trim();
                    else
                        return "<Untitled>";
                    break;
                case PARSE_FOR.DESC:
                    var text = fs.readFileSync(filepath, "utf8", (error)=>{throw error;});
                    text = text.replaceAll(/<!--(.*?)-->/igm, "");
                    var lines = text.split("\n");
                    lines.splice(0,1);
                    text = lines.join("\n");
                    return text;
                default:
                    throw "Error: Unable to parse version";
            } // cases
            
          } // def parser

        let getMDFileUpdates = (path, mode) => {
    
            // Get only relevant files
            let alphaSorted = fs.readdirSync(path).filter(function (filename) {
                let isFile = file => fs.statSync(path+'/'+file).isFile(),
                    isHidden = file => (/(^|\/)\.[^\/\.]/g).test(file),
                    isMDFile = file => (/\.md$/g).test(file);
                return !isHidden(filename) && isFile(filename) && isMDFile(filename);
            });

            // Wrap file datum
            alphaSorted = alphaSorted.map(filename=>{
                let filepath = path+'/'+filename;
                return {
                    filename,
                    path,
                    title: parser(filepath, PARSE_FOR.TITLE),
                    desc: parser(filepath, PARSE_FOR.DESC),
                    ctimeMs: fs.statSync(path+'/'+filename).ctimeMs,
                    version: parser(filepath, PARSE_FOR.VERSION)
                }
            });
            // console.log({alphaSorted});
            
            if(mode===FILE_MODES.CTIME) {
                // Nothing. Most servers will sort alphabetically by default
            } else if(mode===FILE_MODES.CTIME) // Created time
                return alphaSorted.sort(function(fileInfo, fileInfo2) {
                    if(fileInfo.ctimeMs < fileInfo2.ctimeMs) {
                        return -1
                    } else if(fileInfo.ctimeMs > fileInfo2.ctimeMs) {
                        return 1
                    } else {
                        return 0;
                    }
            });
            else if(mode===FILE_MODES.VERSION) // Versions parsed
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
        } // def getMDFileUpdates

        let updatesPath = path.resolve(__dirname, "../../public/updates"); 
        let updates = getMDFileUpdates(updatesPath, FILE_MODES.VERSION);;
        return updates;
    } // def getUpdates

}; // def readUpdates
  
module.exports = {
    readUpdates
}