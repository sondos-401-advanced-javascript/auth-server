'use strict';

require('@code-fellows/supergoose');
const model = require('../src/auth/models/users-model');

describe('User Model',()=>{
  it('save()',()=>{
    let obj = {username:'sondosA',password:'123@soso',role:'writer'};
    return model.save(obj)
      .then(result =>{
        Object.keys(obj).forEach(key =>{
          expect(result[key]).toEqual(obj[key]);
        });
      });
  });
  //   it('authenticate()',()=>{
  //     let obj = {username:'sondosA',password:'123@soso',role:'writer'};
  //     return model.save(obj)
  //       .then(result =>{
  //         return model.authenticate(result.username,result.password)
  //           .then(data =>{
  //             Object.keys(obj).forEach(key =>{
  //               expect(data[key]).toEqual(obj[key]);
  //             });
  //           });
  //       });
  //   });
//   it('generateToken()',()=>{
//     let obj = {username:'sondosA',password:'123@soso',role:'writer'};
//     expect(model.generateToken(obj)).toHaveBeenReturned();
//   }); 
});