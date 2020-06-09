'use strict';
require('dotenv').config();
const users = require('./users-schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET =  process.env.SECRET;

class UsersModel{
  async authenticate(username, password){
    return new Promise((resolve,reject) =>{
      return users.find({username:username})
        .then(result =>{
          if(result.length){
            bcrypt.compare(password, result[0].password)
              .then(final =>{
                if(final){
                  return  resolve(users.find({username:username}));
                }
                else{
                  return reject('error');
                }
              });
          }
          else{
            return reject('error');
          }
        });   
    });
   
  }

  generateToken(user){
    let token = jwt.sign({username: user.username},SECRET,{
      expiresIn: '15m',
    });
    
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
  allUsers(){
    return users.find({});
  }

  verfiyToken(token){
    return jwt.verify(token, SECRET, (err, verifiedJwt) => {
      if(err){
        return Promise.reject();
      }else{
        let username = verifiedJwt['username'];
        return users.find({username})
          .then(result =>{
            if(result.length){
              return Promise.resolve(result[0]);
            }
            else{
              return Promise.reject();
            }
          });
        
      }
    });

  }
}

module.exports = new UsersModel();