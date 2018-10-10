const express = require('express');
const graphql = require('graphql');
const graphqlHTTP = require('express-graphql');
const mongojs = require('mongojs');

require('dotenv').config();

const app = express();

const db = mongojs(process.env.MONGODB_URI);

const student = db.collection('students');

app.get('/api/:name', (req, res) => {
    let name = req.params.name;
    name = name.toLowerCase().split('+');
    let queryObj = {
        fName: name[0],
        lName: name[1]
    };
    student.findOne(queryObj, (err, docs) => {
        if (err) res.send(err);
        if (docs === null) res.json({ data: "name not found" });
        res.send(docs);
    });
});

app.listen(process.env.PORT || 4000, () => {
    console.log("now listening");
});