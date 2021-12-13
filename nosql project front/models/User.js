
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
     firstname: { type: String, required: true },
     lastname: { type: String, required: true },
     email: { type: String, required: true , unique: true },
     username: { type: String, required: true },
     password: { type: String, required: true },
     pole: { type: String , required:true }
});
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);