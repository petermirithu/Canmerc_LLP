var express = require('express');
var router = express.Router();
const Company = require("../models").Company;
const User = require("../models").User;
const UsersWorkingDay = require("../models").UsersWorkingDay;
const WorkingDays = require("../models").WorkingDays;


router.post('/add_company', function(req, res) {                
  return Company
      .create({
        name: req.body.name,
      })
      .then(
        req.flash('success','Created a new company'),
        res.redirect('/companies/')
        )        
      .catch(error => res.status(400).send(error))                     
});  

router.post('/add_user', async(req, res) => {           
  try {
    return User
      .update(
        { companyId: req.body.compchoose },
        { where: { id: req.body.userid  } 
      })
      .then(
        req.flash('success','Employee has been updated'),        
        res.redirect('/users'))

  } catch(error){
    next(error);
  }
})

router.post('/add_userworkingdays', function(req, res) {                
  return UsersWorkingDay
      .create({
        userId: req.body.userId,
        workingDayId: req.body.workingDayId,
      })
      .then(
        req.flash('success','Created a new employee working day'),
        res.redirect('/usersworkingdays/')
        )        
      .catch(error => res.status(400).send(error))                     
});  

router.post('/add_workingdays', function(req, res) {                
  return WorkingDays
      .create({
        weekDay: req.body.weekDay,
        workingDate: req.body.workingDate,
        isWorking: req.body.isWorking,
      })
      .then(
        req.flash('success','Created a new working day'),
        res.redirect('/workingdays/')
        )        
      .catch(error => res.status(400).send(error))                     
});  



module.exports = router;
