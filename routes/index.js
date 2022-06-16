var express = require('express');
var router = express.Router(); 
const passport = require('passport'); 

const user_controller = require('../controllers/userController'); 
const post_controller = require('../controllers/postController'); 

/* GET home page. */
router.get('/home',passport.authenticate("jwt", { session: false }), function(req, res, next) {
res.send(req.user);
});

router.post('/test', user_controller.signup); 

router.post('/login', user_controller.login); 

router.get('/testlogin' , passport.authenticate('jwt' , {session: false}), function(req,res,next) {
  res.send('secure route'); 
} )



router.get('/users', passport.authenticate("jwt", { session: false }), user_controller.getAllUsers);

router.get('/users/:id', passport.authenticate("jwt", { session: false }), user_controller.getUserDetail);  


router.post('/posts', passport.authenticate("jwt", { session: false }), post_controller.createPost);  


router.get('/posts', passport.authenticate("jwt", { session: false }), post_controller.getAllPosts);

router.get('/posts/:id', passport.authenticate("jwt", { session: false }), post_controller.getPostDetail);  

router.delete('/posts/:id' , passport.authenticate("jwt", { session: false }), post_controller.deletePost); 

router.put('/posts/:id' , passport.authenticate("jwt", { session: false }), post_controller.editPost); 

router.get('/profile' , passport.authenticate("jwt", { session: false }), post_controller.getProfilePosts); 


router.put('/users/:id' , passport.authenticate("jwt", { session: false }), user_controller.sendFriendRequest); 

router.get('/users/own' , passport.authenticate("jwt", { session: false }), user_controller.getOwnDetail); 

router.get('/requests' , passport.authenticate("jwt", { session: false }), user_controller.findUsersRequests); 

router.put('/requests' , passport.authenticate("jwt", { session: false }), user_controller.acceptRequest); 

router.delete('/requests' , passport.authenticate("jwt", { session: false }), user_controller.rejectRequest);

module.exports = router;

