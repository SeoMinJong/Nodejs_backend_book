const { MongoClient } = require("mongodb");
const fs = require('fs');

const jsonFile = fs.readFileSync('../config/mongo.json', 'utf8');
const jsonData = JSON.parse(jsonFile);

const url = `mongodb+srv://${jsonData.id}:${jsonData.password}@cluster0.ei1qrjr.mongodb.net/`
const client = new MongoClient(url)

async function run(){
    await client.connect();
    const adminDB = client.db('test').admin();
    const listDatabases = await adminDB.listDatabases();
    console.log(listDatabases);

    return "OK"
};

run()
    .then(console.log)
    .catch(console.error)
    .finally(()=>client.close());