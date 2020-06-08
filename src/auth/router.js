'use strict';

const express = require('express');
const route = express.Router();
const userModel = require('../auth/models/users-model');
const basicAuth = require('./middleware/basic');

route.post('/signup',signUp);
route.post('/signin',basicAuth,signIn);
route.get('/users',allUsers);
// for signUp
function signUp(req,res,next){
  let newUser = req.body;
  userModel.save(newUser)
    .then(result =>{
      let token = userModel.generateToken(result);
      res.status(200).json({signUp: `You are sign up and your token ${token}`});
    })
    .catch(()=>{
      res.json({error: 'This userName is taken'});
    });


}
// for sign In
function signIn(req,res,next){
  res.json({signIn: `you are sign In, token ${req.token}`});
}
// get all users
function allUsers(req,res,next){
  userModel.allUsers()
    .then(result =>{
      res.json(result);

    });
}




module.exports = route;