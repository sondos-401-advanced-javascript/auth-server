'use strict';

const userModel = require('../models/users-model');

function bearerAuth(req,res,next){

  if(!req.headers.authorization){
    next('You are not signIn');
    return;
  }
  // console.log(req.headers.authorization,'headers authorization @@'); //Bearer c2Fsc2FAZ2ltYWwuY29tOmFsaV8xMjM
  let bearerToken = req.headers.authorization.split(' ')[1];
  userModel.verfiyToken(bearerToken)
    .then(userObj =>{
      req.user = userObj;
      next();
    }).catch(err =>{
      console.log('the error in bearer is ',err);
      next('You are not verfiy');
    });
      
  

}

module.exports = bearerAuth;