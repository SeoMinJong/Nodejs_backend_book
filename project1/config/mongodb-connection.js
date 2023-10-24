const { MongoClient } = require("mongodb");
const fs = require('fs');

const jsonFile = fs.readFileSync('./.env/mongo.json', 'utf8');
const jsonData = JSON.parse(jsonFile);

const url = `mongodb+srv://${jsonData.id}:${jsonData.password}@cluster0.ei1qrjr.mongodb.net/`

module.exports = function (callback){
    return MongoClient.connect(url, callback)
}