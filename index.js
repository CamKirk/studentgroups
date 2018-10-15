const express = require('express');
const graphql = require('graphql');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const model = require('./models');

require('dotenv').config();
const app = express();

const db = mongoose.connect(process.env.MONGODB_URI);

app.use(express.json({
    strict:true,
}));

app.get('/',(req, res)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.json({data:"you must send a GET request to https://camkirk-studentgroups.herokuapp.com/api/<firstname>/<week_number>"});
});

app.get('/api/:name/:week', (req, res)  => {

    let name = req.params.name.toLowerCase();
    let week = parseInt(req.params.week);
    console.log(req.params);
    
    if (!week||isNaN(week)){
        res.set('Access-Control-Allow-Origin', '*');
        res.status(400).json({err:("you must send a week number")});
    }else {
        model.Group.find({members:name, week:week}, (err, docs) => {
            
            if (err) res.send(err);
            else{
                console.log(docs);
                res.set('Access-Control-Allow-Origin', '*');
                res.json(docs);
            }
        });
    }
    
    
});


app.listen(process.env.PORT || 4000, () => {
    console.log("now listening");
});
