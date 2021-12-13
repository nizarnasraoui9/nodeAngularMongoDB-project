const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('./models/User.js');
const PubModel = require('./models/publications.js');
const CommentModel = require('./models/Comment.js');
const checkAuth = require('./middleware/check-auth');
const path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
const  multipart  =  require('connect-multiparty');
const  multipartMiddleware  =  multipart({ uploadDir:  './uploads' });
const app = express()
const port = 3300
app.use(cors());
app.use('/login', require('./routes/login.js'));
app.use('/register', require('./routes/register.js'));
app.use('/publications', require('./routes/publications.js'));
app.use('/comments', require('./routes/comments.js'));
app.use(bodyParser.json({extended:true}));
app.use('/public',express.static('public'));
app.use('/public/uploads' , express.static('uploads'))
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/uploads', express.static('uploads'))

// app.options('*',cors());
//


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});


 app.post('/api/upload', checkAuth,  multipartMiddleware, (req, res) => {
    console.log("nice work")
    console.log(req.body.publication);
    console.log(req.body.title);
    console.log(req.files.uploads[0]);
    const newPub = new PubModel({title: req.body.title,
                                publication:req.body.publication,
                                imagePath: req.files.uploads[0].path,
                                creator: req.userData.userId
                              });    
    newPub.save();
    res.json(newPub);
});

var connection = mongoose.connect('mongodb://localhost:27017/Proxy0', {
  useNewUrlParser: true,
}).then((connection) => {
    UserModel.find({}).then((users) => {
        console.log(users);
    });
});


app.listen(port, () => {
  console.log(`Example app listening at  ${port}`)
})