'use strict';

const express = require('express');
const route = express.Router();
const bearerMiddleware = require('./middleware/bearer');
const permissions = require('./middleware/authorize');


route.get('/secret',bearerMiddleware,checkLoginUser);
route.get('/read', bearerMiddleware, permissions('read'), read);
route.post('/add', bearerMiddleware, permissions('create'), create);
route.put('/change', bearerMiddleware, permissions('update'), update);
route.delete('/remove', bearerMiddleware, permissions('delete'), deleteFun);

function checkLoginUser(req,res){
  res.status(200).json(req.user);
}
function read(req,res){
  res.status(200).send('You can Read');
}
function create(req,res){
  res.status(200).send('You can Create');
}
function update(req,res){
  res.status(200).send('You can Update');
}
function deleteFun(req,res){
  res.status(200).send('You can Delete');
}
module.exports = route;