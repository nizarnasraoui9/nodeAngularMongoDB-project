const mongoose = require('mongoose');
module.exports = mongoose.model('Publications', new mongoose.Schema({
   title: String ,
   publication: String , 
   comments: [Object] , 
   imagePath: String , 
   creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" , required: true}
}));
