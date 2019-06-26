//requiring path and fs modules
const path = require('path');
const fs = require('fs');
//joining path of directory 
const directoryPath = path.join(__dirname, './covers/m_covers_0000_04');
//passsing directoryPath and callback function
let pathObj = {
    imagePaths: []
};
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
   
    //listing all files using forEach
    files.forEach(function (file) {
        pathObj.imagePaths.push({"src": file});
    });
    fs.appendFileSync('./images.json', JSON.stringify(pathObj.imagePaths),(err)=>{
        if(err){
            throw err;
        }
    });
});