const User = require('../models/user');
const { body, validationResult } = require("express-validator");
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const async = require('async'); 
const mongoose = require('mongoose');


exports.signup = [
    body('username', 'Enter Email').trim().isLength({min:1}).escape(),
    body('password', 'Enter Password of min 8 character').trim().isLength({min:1}).escape(), 
    body('first_name', 'Enter First Name').trim().isLength({min:1}).escape(), 
    body('last_name', 'Enter Last Name').trim().isLength({min:1}).escape(),  
    body('confirmPassword', 'Confirm Password').custom((value, {req})=>{
      if(value !=req.body.password) {
        return next('Password Confirmation did not match')
      }
      return true;
    }),
    (req,res,next)=>{
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        res.json({
          username: req.body.username,
          errors: errors.array()
        });
        return;
      } 
      else {
        var user = new User(
          {
            username: req.body.username, 
            first_name: req.body.first_name, 
            last_name: req.body.last_name, 
            
          }
        );
        bcrypt.hash(req.body.password, 10, (err, hashedPassword)=>{
          if(err) {return next(err);}
          user.set('password',hashedPassword);
          user.save(err=>{
            if(err) {return next(err);}
            res.status(200).json({
              message: "Sign up succesfull",
              user: req.user,
            })
          })
        });
      }
    }
  ];
  

  exports.login = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({ msg: 'Something went wrong.' });
        }
        req.login(user, { session: false }, (error) => {
            if (error) res.next(error);
            const token = jwt.sign({ user }, 'your_jwt_secret', {
                expiresIn: '1d',
            });
            let data = { _id: user._id, username: user.username};
            return res.json({ user: data, token , msg:'HELLLLLLLLLLLLOOOOOOOOOO' });
        });
    })(req, res);
}
  
exports.logout = function (req, res) {
    req.logout();
    res.status(200).json({msg: "logged out"});
}; 

exports.testlogin = function (req , res) {
  res
} 

exports.getAllUsers = (req, res, next) => {
  User.find({})
  .exec((err, result) => {
      if (err) { return next(err)}
      else{
          res.status(200).json(result)
      }
  })
}

exports.getUserDetail = (req, res, next) => {
  User.findById(req.params.id)
  
  .exec((err, result) => {
      if (err) { return next(err)}
      else{
          res.status(200).json(result)
      }
  })
} 

exports.getOwnDetail = (req, res, next) => {
  //let id = mongoose.Types.ObjectId(req.user)
  User.find(req.user)
  .exec((err, result) => {
      if (err) { return next(err)}
      else{
          res.status(200).json(result)
      }
  })
} 

exports.sendFriendRequest = (req, res, next) => {
  User.findByIdAndUpdate(req.params.id , {$addToSet: {friend_requests: req.user}}) 
  .exec((err, result) => {
    if (err) { return next(err)}
      else{
        //res.json({msg: 'List updated'}); 
        res.send(req.user);
      }
  })
} 

exports.findUsersRequests = (req, res, next) => { 
  User.findById(req.body.userid)
  .exec((err, result) => {
    if (err) { return next(err)}
    else {
      User.find().where('_id').in(result.friend_requests)
  .exec((err, result) => {
      if (err) { return next(err)}
      else{
          
          res.status(200).json(result)
      }
  })
    }
  })
  
} 





exports.acceptRequest = (req, res, next) => {
  async.parallel({
      userReceiver: (callback) => {
          User.findByIdAndUpdate(req.user._id, {
              $push : { friends: req.body.id },
              $pull: {friend_requests: req.body.id}
          })
          .exec(callback);
      },
      userSender: (callback) => {
          User.findByIdAndUpdate(req.body.id, {
              $push : {friends: req.user._id},
              
          })
          .exec(callback);
      }
  }, (err, results) => {
      if (err) { return next(err)}
      if (results.userReceiver === null || results.userSender === null) {
          let err = new Error('Post not found');
          err.status = 404;
          return next(err);
      }
      res.status(201).json({msg: 'Request Accepted'});
  })
}





exports.rejectRequest = (req, res, next) => {
  User.findByIdAndDelete(req.user._id , {$pull: {friend_requests: req.body.id}})
  .exec((err, result) => {
      if (err) { return next(err)}
      else{
          res.status(200).json(result)
      }
  })
} 

exports.findUserFriends = (req, res, next) => {
  User.find().where('_id').in(req.user.friends)
  .exec((err, result) => {
      if (err) { return next(err)}
      else{
          res.status(200).json(result)
      }
  })
} 

