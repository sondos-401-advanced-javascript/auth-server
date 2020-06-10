'use strict';
require('dotenv').config();
const express = require('express');
// const session = require('express-session');
const route = require('./auth/router');
const extraRoute = require('./auth/extra-routes');
const errorHandler = require('../src/middleware/500');
const notFound = require('../src/middleware/404');
const morgan = require('morgan');

const server = express();
server.use(express.json());

server.use(express.static('./public'));
server.use(morgan('dev'));
// server.use(session({
//   genid: function(req) {
//     return genuuid(); // use UUIDs for session IDs
//   },
//   secret: 'keyboard cat',
// }));
server.use(route);
server.use(extraRoute);
server.use('*',notFound);
server.use(errorHandler);




module.exports = {
  server: server,
  start: ()=>{
    const PORT = process.env.PORT || 3000;
    server.listen(PORT,()=>{
      console.log(`Listen to ${PORT}`);
    });
  },
};