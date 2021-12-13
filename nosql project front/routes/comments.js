const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const CommentModel = require('../models/Comment.js');
const PubModel = require('../models/publications.js');

const { all } = require('./login');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

const comments = express.Router();

comments.use(bodyParser.json());

comments.route('/')
.all((req,res,next) => {
    res.statusCode=200;
    res.setHeader('content-type','text/plain');
    next();
})
.post(async (req, res ,next) => {
  const pub =await PubModel.findById(req.body.id);
  pub.comments.push({ text: req.body.comment, id: Date.now(), fname: req.body.fname, lname: req.body.lname });
  await pub.save();
  console.log(req.body.id);
  res.statusCode=201;
  res.json(pub);
})
.patch(async (req, res, next) => {
  const pub = await PubModel.findById(req.body.publicationId);
  //pub.comments.map((comment) = {
    //if(comment.id === req.body.commentId) return {
      //text: req.body.comment,
      //id: comment.id
    //};
    //return comment;
  //});

  const commentIndex = pub.comments.findIndex((comment) => comment.id === req.body.commentId);
  pub.comments[commentIndex].text = req.body.comment;
  res.statusCode = 200;
  res.json(pub);
})
.get((req, res, next) => {
      PubModel.find({}).then((comments) => {
          console.log(comments);
          res.json(comments)
      });
})





module.exports= comments ;
