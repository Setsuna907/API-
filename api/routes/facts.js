const express = require('express');
const { routes }= require('../../app');

const router = express.Router();

const mongoose = require('mongoose');
const Fact = require('./models/fact')
const fact = require('./models/fact');

router.get('/',(req,res,next)=>{

    //Get a random fact
    Fact
        .countDocuments()
        .exec((err,count)=> {
            var random=Math.floor(Math.random()*count)
            Fact
                .findOne
                .skip(random)
                .exec()
                .then((result)=> {
                    console.log(result)
                    res.status(200).json(result)
                })
                .catch((err)=> {
                    console.log(err)
                    res.status(500).json(err)
                })
        })

    //GET all the facts
    //Fact
    //    .find()
    //    .exec() //it is a promise
    //    .then((result)=>{
    //        console.log(result)
    //        res.status(200).json(result)
    //    })
    //    .catch((err)=>{
    //       console.log(err)
    //        res.status(500).json(err)
    //    })

    //res.status(200).json({
    //    message:"GET request works!"
    //})
})

router.post('/',(req,res,next)=>{
    //create a new instance of the model
    const fact = new Fact({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        author: req.body.author
    })

    fact
        .save() //it will act as a promise. if it is successful .then() else .catch() 
        .then(result => {
            console.log(result)
            res.status(200).json({
                messsage:"POST request works",
                createdFact: fact
            })
        })
        .catch((err)=> {
            console.log(err)
            res.status(500).json({
                error:err
            })
        })

    //const fact = {
    //    name:req.body.name,
    //    author:req.body.author
    //}
    
})

router.delete('/:factsId',(req,res,next)=>{
    const id=req.params.factsId;
    Fact
        .remove({ _id: id })
        .exec()
        .then((result)=> {
            console.log(result)
            res.status(200).json(result)
        })
        .catch((err)=> {
            console.log(err)
            res.status(500).json(err)
        })

    //res.status(200).json({
    //    messsage:"Delete request works"
    //})
})

module.exports = router;