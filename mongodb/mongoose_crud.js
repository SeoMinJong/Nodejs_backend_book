const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const Person = require("./person_model");
const fs = require('fs');

mongoose.set("strictQuery", false);

const app = express();
app.use(bodyparser.json());

app.listen(3000, async ()=>{
    console.log("Server Start")
    const jsonFile = fs.readFileSync('../config/mongo.json', 'utf8');
    const jsonData = JSON.parse(jsonFile);
    
    const url = `mongodb+srv://${jsonData.id}:${jsonData.password}@cluster0.ei1qrjr.mongodb.net/`
    
    mongoose.connect(url, { useNewUrlParser : true })
    .then(console.log("Connection mongoDB to mongoose"));

    app.get('/person', async (req, res)=>{
        const person = await Person.find({});
        res.send(person);
    })

    app.get('/person/:email', async (req, res)=>{
        const person = await Person.findOne({email:req.params.email});
        res.send(person);
    })

    app.post('/person', async (req, res)=>{
        const person = new Person(req.body);
        await person.save();
        res.send(person);
    })

    app.put('/person/:email', async (req, res)=>{
        const person = await Person.findOneAndUpdate(
            {email: req.params.email},
            {$set: req.body},
            {new:true}
        );
        console.log(person);
        res.send(person);
    });

    app.delete('/person/:email', async (req, res)=>{
        await Person.deleteMany({email: req.params.email});
        res.send({sueccess:true})
    })
})