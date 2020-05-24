var express = require('express');
var router = express.Router();
const Company = require("../models").Company;
const User = require("../models").User;
const UsersWorkingDay = require("../models").UsersWorkingDay;
const WorkingDays = require("../models").WorkingDays;

/* GET home page. */
router.get('/', function(req, res) {     
  res.render('index', { title: 'Canmerc LLP'})  
})

router.get('/companies',function(req,res){
  Company.findAll().then(results => res.render('companies', { title: 'Companies',companies:results}))
})

router.get('/users',function(req,res){  
  User.findAll({include: [{model: Company,as: 'Company',}],}).then(results => res.render('users', { title: 'Employees',employees:results}))
})

router.get('/usersworkingdays',function(req,res){
  UsersWorkingDay.findAll({
    include: {model: User,as: 'User'}, 
    include: { model: WorkingDays,as: "WorkingDay"}
  })
  .then(results => res.render('usersworkingdays', { title: 'Users Working Days',userWdays:results} ))
})

router.get('/workingdays',function(req,res){
  WorkingDays.findAll().then(results => res.render('workingdays', { title: 'Working Days',workingdays:results}))
})

module.exports = router;
