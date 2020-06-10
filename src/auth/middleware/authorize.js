'use strict';

const userModel = require('../models/users-model');

module.exports= (capability)=>{
  return (req,res,next) =>{
    return userModel.can(req.user.capability.includes(capability))
      .then(result =>{
        result ? next() : next('access Denide');
      });
    
  };
};

