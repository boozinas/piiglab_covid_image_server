var express = require("express");
const fs = require('fs');
var app = express();
const rootFolder = './public/assets/img/COVID/';
const relativeFolder = 'assets/img/COVID/';
var categoryFolder = '';

app.get("/url", (req, res, next) => {
    const list = [];
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed;
    var innerFolder = rootFolder;
    if(req.query.category){
        categoryFolder = req.query.category;
        innerFolder = innerFolder +  categoryFolder;
        res.json(getImgs(list, innerFolder));
    }else{
        res.json(getFolder(list, innerFolder));
    }
});

function getFolder(list, folder) {
    fs.readdirSync(folder).forEach(file => {
        list.push(file);
      });
    console.log(list);
   return list; 
}
function getImgs(list, folder) {
    fs.readdirSync(folder).forEach(file => {
        list.push(relativeFolder+categoryFolder+"/"+file);
      });
    console.log(list);
   return list; 
}
   
app.listen(3001,() => {
    console.log("Server runnning on port 3001");
});

