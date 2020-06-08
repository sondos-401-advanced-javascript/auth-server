'use strict';

const {server}=require('../src/server');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);



describe('server', () => {

  it('404 test' , ()=> {
    return mockRequest.get('/wrong')
      .then(data => {
        expect(data.status).toEqual(404);
      });
  });



  it('/signup ', async() => {
    let output = { 'username': 'sondos@1996.net', 'password': 'soso@321_' };
    mockRequest
      .post('/signup')
      .send(output)
      .then(data => {
        expect(data.status).toEqual(200);
      });
  });
  it('/signin ', async() => {
    let output = { 'username': 'sondos@1996.net', 'password': 'soso@321_' };
    mockRequest
      .post('/signin')
      .send(output)
      .then(data => {
        expect(data.status).toEqual(500);
      });
  });
  it('/signin ', async() => {
    let output = { 'username': 'sondos@1996.net', 'password': 'soso@321_' };
    mockRequest
      .post('/signup')
      .send(output)
      .then(() => {
        return  mockRequest
          .post('/signin')
          .send(output)
          .then(data =>{
            expect(data.status).toEqual(500);

          });
      });
  });
  it('/users ', () => {
    return mockRequest
      .get('/users')
      .then(data => {
        expect(data.status).toEqual(200);
      });
  });

});




