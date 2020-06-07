'use strict';

const server = require('./src/server');
const mongoose = require('mongoose');
server.start();

const MONGO_URL = 'mongodb://localhost:27017/users';
const mongooseOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};
mongoose.connect(MONGO_URL,mongooseOptions);
