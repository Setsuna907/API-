const express = require('express');

const app = express();

const mongoose = require('mongoose');

const morgan = require('morgan');

const bodyParser = require('body-parser');

const factrouters = require('./api/routes/facts');

mongoose.connect("mongodb+srv://test:test@cluster0.qhlko.azure.mongodb.net/<dbname>?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');//star gives access to everythin
    res.header('Access-Control-Allow-Headers','*');
    if(req.method==="OPTIONS"){
        res.header('Access-Control-Allow-Methods','PUT, GET, POST, DELETE, PATCH')
        return res.status(200).json({});
    }
    next()
})

app.use('/facts',factrouters); //it will pass on the reqeust to this function which calls facts.js


module.exports = app;