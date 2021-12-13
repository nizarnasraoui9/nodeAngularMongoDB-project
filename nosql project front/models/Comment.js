const mongoose = require('mongoose');
module.exports = mongoose.model('Comment', new mongoose.Schema({
    comment: String , id: String
}));
