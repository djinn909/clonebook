var express = require('express');
var router = express.Router(); 
const passport = require('passport'); 

const user_controller = require('../controllers/userController'); 
const post_controller = require('../controllers/postController'); 
const comment_controller = require('../controllers/commentController'); 

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

router.get('/own' , passport.authenticate("jwt", { session: false }), user_controller.getOwnDetail); 

router.put('/requests' , passport.authenticate("jwt", { session: false }), user_controller.findUsersRequests); 

router.put('/getrequests' , passport.authenticate("jwt", { session: false }), user_controller.acceptRequest); 

router.delete('/requests' , passport.authenticate("jwt", { session: false }), user_controller.rejectRequest); 

router.get('/timeline' , passport.authenticate("jwt", { session: false }), post_controller.getFriendsPosts);  

router.get('/allusers' , passport.authenticate("jwt", { session: false }), user_controller.getAllUsers);  

router.get('/users/:id/posts' , passport.authenticate("jwt", { session: false }), post_controller.getUserPosts);  


router.put('/posts/:id/like' , passport.authenticate("jwt", { session: false }), post_controller.likePost); 



router.post('/comment' , passport.authenticate("jwt", { session: false }), comment_controller.createComment); 

router.get('/posts/:id/comments' , passport.authenticate("jwt", { session: false }), comment_controller.findComments);

module.exports = router;

