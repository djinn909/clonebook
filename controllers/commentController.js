const User = require('../models/user');
const { body, validationResult } = require("express-validator");
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const Post = require('../models/post');
const Comment = require('../models/comment');
const async = require('async'); 



exports.createComment = (req , res, next) => {
    const newComment = new Comment({
        text: req.body.text, 
        user: req.body.user, 
        post:req.body.post,
    })
    newComment.save((err) => {
        if (err) { return next(err)}
        res.status(201).json({msg: 'Comment sucessfully added'})
    })
} 


exports.findComments = (req, res, next) => {
    Comment.find({post: req.params.id})
    .populate('user')
    .sort({timestamp:-1}) 
    .exec((err, result ) => {
        if (err) {return next (err)} 
        else {
            res.status(200).json(result)
        }
    })
}
