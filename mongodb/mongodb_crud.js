const MongoClient = require("mongodb").MongoClient;
const fs = require('fs');

const jsonFile = fs.readFileSync('../config/mongo.json', 'utf8');
const jsonData = JSON.parse(jsonFile);

const url = `mongodb+srv://${jsonData.id}:${jsonData.password}@cluster0.ei1qrjr.mongodb.net/`

const client = new MongoClient(url, { useNewUrlParser : true });

async function main(){
    try{
        await client.connect();

        console.log("MongoDB 접속");
        const collection = client.db('test').collection('person');

        await collection.insertOne({name:'Andy', age:30});
        console.log("Andy 문서 추가");

        const documents = await collection.find({name:'Andy'});
        console.log('찾은 문서 :',documents);

        await collection.updateOne({name:'Andy'}, {$set:{age:31}});
        console.log("Andy 문서 업데이트");

        const updateDocuments = await collection.find({name:'Andy'}).toArray();
        console.log('Andy 문서 :',updateDocuments);
    }catch(err){
        console.log(err)
    }finally{
        await client.close();
    }
}

main();