var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './app/uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})


// bring in user model
const User = require("../models").User;

/* GET users listing. */
router.get('/signup',function(req,res){
    res.render('signup',{title:'Sign Up'})
  })
  
router.get('/signin',function(req,res){
    res.render('signin',{title:'Sign In'})
})


// register users
router.post('/register',function(req,res){
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;  
  const password = req.body.password;
  const password2 = req.body.password2;

  req.checkBody('fname', 'First Name is *required').notEmpty();
  req.checkBody('lname', 'Last Name is *required').notEmpty();
  req.checkBody('email', 'email is *required').notEmpty();
  req.checkBody('password', 'password is *required').notEmpty();
  req.checkBody('password2', 'password2 is *required').notEmpty();
  req.checkBody('password2', 'Password does not *match').equals(req.body.password);

  let errors = req.validationErrors();

  if(errors){
    res.render('register',{
      errors:errors
    });    
  }else{
    
    bcrypt.genSalt(10, function(err,salt){
      bcrypt.hash(password, salt, function(err,hash){
        if(err){
          console.log(err);
        }               
        const hashedpwd=hash
        return User.create({ firstName:fname, lastName:lname, email:email, password:hashedpwd}).then(
          console.log("***************************"),
          console.log(password),
          console.log(hashedpwd),
          console.log(fname),
          console.log("***************************"),
          req.flash('success','You are now registered and can log in'),
          res.redirect('/auth/signin')                                      
        );                          
      })
    })    
  }
});

router.post('/login',function(req,res,next){
  passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect:'/auth/signin',
    failureFlash:true,
  })(req,res,next);    
});

router.get('/logout',function(req,res){
  req.logOut();
  req.flash('success', ' Your Logged Out!');
  res.redirect('/')
})

module.exports = router;
