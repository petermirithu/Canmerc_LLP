var express = require('express');
var router = express.Router();
const Company = require("../models").Company;
const User = require("../models").User;
const UsersWorkingDay = require("../models").UsersWorkingDay;
const WorkingDays = require("../models").WorkingDays;

function isAuthenticated(req, res, next) {
  if (req.user){
    return next();      
  }
  else{
    res.redirect('/auth/signin');
  }
}

/* GET home page. */
router.get('/', function(req, res) {     
  var username=null;
  if (req.user){
    username=req.user
  }
  res.render('index', { title: 'Canmerc LLP',username:username})  
})

router.get('/profile',isAuthenticated,async function(req,res){
  let user= await User.findByPk(req.user.id,{include: [{model: Company,as: 'Company',}]})
  res.render('profile',{title:'Profile',username:req.user,user:user})
})

router.get('/companies',isAuthenticated, function(req,res){
  Company.findAll().then(results => res.render('companies', { title: 'Companies',companies:results,username:req.user}))
})

router.get('/users',isAuthenticated, async(req,res) => {  

  let companies= await Company.findAll()     
  let users= await User.findAll({include: [{model: Company,as: 'Company',}]})

  res.render('users', { title: 'Employees',employees:users,username:req.user,companies:companies})
})


router.get('/usersworkingdays',isAuthenticated, async(req,res) => {
  let users= await User.findAll({include: [{model: Company,as: 'Company',}]})
  let workingdays= await WorkingDays.findAll()
  let usersworkingdays= await UsersWorkingDay.findAll({include: [{model: User,as: 'User'},{ model: WorkingDays,as: "WorkingDay"}]})

  res.render('usersworkingdays', { title: 'Users Working Days',userWdays:usersworkingdays,users:users,workingdays:workingdays,username:req.user})
})

router.get('/workingdays',isAuthenticated,function(req,res){
  WorkingDays.findAll().then(results => res.render('workingdays', { title: 'Working Days',workingdays:results,username:req.user}))
})

module.exports = router;
