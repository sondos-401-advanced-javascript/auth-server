'use strict';
require('dotenv').config();
const express = require('express');
const route = require('./auth/router');
const errorHandler = require('../src/middleware/500');
const notFound = require('../src/middleware/404');

const server = express();
server.use(express.json());
server.use(route);
server.use('*',notFound);
server.use(errorHandler);




module.exports = {
  start: ()=>{
    const PORT = process.env.PORT || 3000;
    server.listen(PORT,()=>{
      console.log(`Listen to ${PORT}`);
    });
  },
};