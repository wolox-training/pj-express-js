const supertest = require('supertest');
const { factory } = require('factory-girl');

const app = require('../../app');

const request = supertest(app);

require('../factory/user');

describe('Users Controller', () => {
  describe('/POST users', () => {
    describe('when using valid parameters', () => {
      it('should create a new user', done => {
        factory.attrs('User').then(body => {
          request
            .post('/api/v1/users')
            .send(body)
            .set('Accept', 'application/json')
            .then(res => {
              expect(res.status).toBe(200);
              expect(res.body.mail).toBe(body.mail);
              done();
            });
        });
      });
    });
  });

  describe('/POST users/sessions', () => {
    describe('when using valid parameters', () => {
      it('should create a new session token', done => {
        factory.create('User').then(user => {
          request
            .post('/api/v1/users/sessions')
            .send({
              mail: user.mail,
              password: user.password
            })
            .set('Accept', 'application/json')
            .then(res => {
              expect(res.status).toBe(200);
              done();
            });
        });
      });
    });
  });
});
