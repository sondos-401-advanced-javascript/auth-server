'use strict';
require('dotenv').config();
const users = require('./users-schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET =  process.env.SECRET || 'MysecretKey';

class UsersModel{
  async authenticate(username, password){
    users.find({username:username})
      .then(result =>{
        if(result){
          bcrypt.compare(password, result[0].password)
            .then(final =>{
              if(final){
                return users.find({username:username});
              }
              else{
                return Promise.reject();
              }
            });
        }
        else{
          return Promise.reject();
        }
        
      });    
  }

  generateToken(user){
    console.log('user ===>',user);
    let token = jwt.sign({username: user.username},SECRET);
    return token;
  }
  async save(newUser){
    if(!users[newUser.username]){
      newUser.password = await bcrypt.hash(newUser.password,5);
      let newUserSave = new users(newUser);
      return newUserSave.save();
    }
    return Promise.reject();
  }
}

module.exports = new UsersModel();