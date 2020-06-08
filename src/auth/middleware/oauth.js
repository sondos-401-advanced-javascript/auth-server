'use strict';
require('dotenv').config();

const superagent = require('superagent');
const userModel = require('../models/users-model');
const userSchema = require('../models/users-schema');
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const tokenUrl = 'https://github.com/login/oauth/access_token';
const apiUrl = 'https://api.github.com/user';
const redirectUrl = 'http://localhost:3000/oauth';


async function oauth(req,res,next){
  try{
    let firstToken = await tokenFromGithub(req.query.code);
    let getDataUser = await takeInformationUser(firstToken);
    let returnToken = await giveUserToken(getDataUser);
    req.token = returnToken.token;
    next();
  }
  catch (e){
    console.log(`the error ${e}`);
    next('there is error');
  }

}

async function tokenFromGithub(code){

  let tokenGitHub = await superagent
    .post(tokenUrl)
    .send({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: code,
      redirect_uri: redirectUrl,
    });


  let acsses_token = tokenGitHub.body.access_token;
  return acsses_token;
}
async function takeInformationUser(token){
  let userInformation = await superagent.get(apiUrl)
    .set('Authorization', `token ${token}`)
    .set('user-agent', 'express-app');
  let user = userInformation.body;
  return user;
}
async function giveUserToken(user){
  let addUser = {
    username: user.login,
    password: 'HiThatsFakePassword',
  };
  let userSaved = await checkUsername(addUser);
  let newToken = userModel.generateToken(addUser);
  return {user: userSaved,token:newToken};
}

async function checkUsername(addUser) {
  await userSchema.find({ username: addUser.username })
    .then(result => {
      if (!result.length) {
        return userModel.save(addUser);
      }
    });
}

module.exports = oauth;


