'use strict';

const express = require('express');
const route = express.Router();
const bearerMiddleware = require('./middleware/bearer');


route.get('/secret',bearerMiddleware,checkLoginUser);

function checkLoginUser(req,res){
  res.status(200).json({id:req.user._id,username:req.user.username});
}

module.exports = route;