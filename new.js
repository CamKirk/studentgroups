const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser:true});

app.use(express.json({
    strict:false,
}));
require('./models');

app.get('/',(req,res)=>{res.send("hello world");});

app.post('/api',(req,res)=>{
    console.log(req.headers);
    
    console.log(req.body)
        console.log(req.params);
    
    res.send(req.params);
    
});

app.listen(process.env.PORT||4000);