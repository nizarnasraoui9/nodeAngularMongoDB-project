const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PubModel = require('../models/publications.js');
const checkAuth = require('../middleware/check-auth');

const { all } = require('./login');

const publications = express.Router();



publications.route('/')

.all((req,res,next) => {
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
}) 
.post(checkAuth, (req, res, next) => {
    console.log(req.body.Publication );
    console.log(req.body.title);
    const newPub = new PubModel({title: req.body.title,
                                publication:req.body.publication,
                              });
    newPub.save();
    res.json(newPub);
  })

.get((req, res, next) => {
      PubModel.find({}).populate('creator').sort('_id').then((publications) => {
          console.log(publications);
          res.json(publications)
      });
})


publications.route('/:id')

.patch(async (req, res, next) => {
  const pub = await PubModel.findById(req.params.id);
  Object.assign(pub, req.body);
  await pub.save();
  res.statusCode=201;
  res.json(pub);
})

.delete(checkAuth,(req, res, next) => {
  PubModel.deleteOne({_id: req.params.id, creator: req.userData.userId}).then(result => {
    if (result.n >0){
      res.status(200).json({ message: "Successfuly deleted!" });
    } else {
      res.status(401).json({ message: "Not Authorized!!!" })    }
  }) 
})



module.exports= publications ;
