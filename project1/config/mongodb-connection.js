import { MongoClient } from "mongodb";
import fs from "fs";

const jsonFile = fs.readFileSync('./.env/mongo.json', 'utf8');
const jsonData = JSON.parse(jsonFile);

const url = `mongodb+srv://${jsonData.id}:${jsonData.password}@cluster0.ei1qrjr.mongodb.net/`;


export function mongodbConnection(callback) {
    return MongoClient.connect(url, callback)
}