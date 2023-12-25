var express = require('express');
var router = express.Router();
const userModel = require("./users"); //import both data files 3.
const postModel = require("./posts");  //import both data files 3.
const passport = require("passport");
const upload = require('./multer'); // import multer here 

const localStrategy = require("passport-local"); //...
passport.use(new localStrategy(userModel.authenticate()));


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
 /* console.log(req.flash("error")); //will give error in terminal when put wroong username or password */
  res.render('login', {error: req.flash('error')});  //now use flash here, this is an array go to login ejs
});

router.get('/feed', function(req, res, next) {
  res.render('feed');
});

//handle file upload
router.post('/upload',upload.single('file'), (req, res) => {
  //access the uploaded file details via req.file
  if (!req.file) {
    return res.status(400).send('No files were uploaded.')
  }
  res.send('file uploaded successfully!');
});


router.get('/profile', isLoggedIn, async function(req, res, next) {
  /*work for showing the username of profile page (go to profile.ejs after that) */
  const user = await userModel.findOne({
    username: req.session.passport.user //username got save in this till you are logged in.
  });
  //console.log(user)
  res.render('profile', {user}); //put user here, passing user in profilepage
});

//register route
router.post('/register', (req,res) => {
  const { username, email, fullname } = req.body;
const userData = new userModel({ username, email, fullname });

  userModel.register(userData, req.body.password)
  .then(function (registereduser) {
    passport.authenticate("local")(req,res,function (){
      res.redirect('/profile');
    })
  });
});


router.post("/login", passport.authenticate("local", {
  successRedirect: '/profile',
  failureRedirect: '/login',
  /* flash message work,  can see flash message now go to app.js file */
  failureFlash: true
}), function (req,res){ 
});  //passport.authenticate() is working as a middleware here between route and function


router.get('/logout', (req,res,next) => {
  req.logout(function(err){
   if (err) { return next(err); }
     res.redirect('/');
  });
});


function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){   //if we are logged in then it will go ahead.
    return next();
  }
  res.redirect('/login');  //otherwise go to homepage
}



/*
// (10)
router.get('/alluserposts', async function(req, res, next) {
  let user = await userModel.findOne({_id: "65845e5e2b5e250786f07013"})  //run this route you will find id of post but not the data
  .populate("posts"); //open the data of posts array (11) run the route again.
  res.send(user);
});  


//creating default user 4.
router.get('/createuser', async function(req, res, next) { //this is a async func therfore using async await keyywords.
  let createduser = await userModel.create({
    username: "hassan",
    password: "hassan",
    posts: [],
    email: "hassan@male.com",
    fullname: "M HASSAN MALIK",
  });
  res.send(createduser); //check it one time , if you checkit second  time it  will show error because of unique name.
});
router.get('/createpost', async function(req, res, next) { //this is a async func therfore using async await keyywords.
  let createdpost = await postModel.create({
    postText: "Hello evernyan hi how are you fine shanksyou", //change the data (9)
    user: "65845e5e2b5e250786f07013" //paste user id here (7). do further work below
  });
  //here
   let user = await userModel.findOne({_id: "65845e5e2b5e250786f07013"}); //find the this id which we paste in userModel and sttore in user var
   user.posts.push(createdpost._id); //push the id of createdpost id in posts array of user
   await user.save(); //have to save this  by wriiten save func
  res.send("done"); //run this route  in browser then check the data in mongodb both will have each other id.
});
*/

module.exports = router;
