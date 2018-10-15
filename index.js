const express = require('express');
const graphql = require('graphql');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const model = require('./models');

require('dotenv').config();
const app = express();

const db = mongoose.connect(process.env.MONGODB_URI);
app.use(express.json());
function errorHandler (err, req, res, next) {
    res.status(500)
    res.send('error', { error: err })
  }
app.use(errorHandler);
app.get('/',(req, res)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.json({data:"hello world"});
});

app.get('/api/:name/:week', (req, res,next)  => {
    let name = req.params.name.toLowerCase();
    let week = parseInt(req.params.week);

    if (!week||isNaN(week)){
        res.status(400).json({err:("you must send a week number")});
    }else {
        model.Group.find({members:name, week:week}, (err, docs) => {
            console.log(req.headers);
            
            if (err) res.send(err);
            if (docs === null) res.json({err:"name not found"} );
            else{
                console.log(docs);
                res.set('Access-Control-Allow-Origin', '*');
                res.json(docs);
            }
        });
    }

    console.log(name, week);
    
    
});

app.listen(process.env.PORT || 4000, () => {
    console.log("now listening");
});
