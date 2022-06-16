const mongoose = require('mongoose');
const { Schema } = mongoose; 

const PostSchema = new Schema({
    text: {type: String , required:true, maxlength : 200 , minlength: 1},
    user: {type: Schema.Types.ObjectId, ref: "User", required: true}, 
    timestamp: { type: Date, default: Date.now },
    likes: [{type: Schema.Types.ObjectId, ref: "User"}]
}) 

module.exports = mongoose.model('Post' , PostSchema); 