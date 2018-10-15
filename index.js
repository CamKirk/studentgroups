const express = require('express');
const graphql = require('graphql');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const model = require('./models');

require('dotenv').config();
const app = express();

const db = mongoose.connect(process.env.MONGODB_URI);
app.use(express.json());

app.get('/',(req, res)=>{
    res.json({data:"hello world"});
});

app.get('/api/:name/:week', (req, res, next)  => {
    let name = req.params.name;
    let week = parseInt(req.params.week);
    if (!week||isNaN(week)){
        res.send(200,new Error("you must send a week"));
    }
    console.log(name, week);
    
    model.Group.find({members:name, week:week}, (err, docs) => {
        if (err) res.send(err);
        if (docs === null) res.json({err:"name not found"} );
        else{
            console.log(docs);
            res.setHeader('Access-Control-Allow-Origin','*');
            res.json(docs);
        }
    });
});

app.listen(process.env.PORT || 4000, () => {
    console.log("now listening");
});
