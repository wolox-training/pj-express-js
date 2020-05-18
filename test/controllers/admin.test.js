const supertest = require('supertest');
const { factory } = require('factory-girl');

const app = require('../../app');

const request = supertest(app);

require('../factory/user');

describe('Admin Controller', () => {
  describe('/POST admin/users', () => {
    describe('when using valid parameters', () => {
      it('should create a new admin', done => {
        factory.create('User', { password: 'QSShBtjP', type: 'admin' }).then(user => {
          request
            .post('/api/v1/users/sessions')
            .send({
              mail: user.mail,
              password: '$2b$10$G4b27Ilbv5Jmg8IrtWzjUuiY3zD2wvG9OuWlXEbg60F5Xy8s1Z12u'
            })
            .set('Accept', 'application/json')
            .then(res => {
              request
                .post('/api/v1/admin/users')
                .send({ user_id: user.id })
                .set({
                  Accept: 'application/json',
                  authorization: res.headers.authorization
                })
                .then(response => {
                  expect(response.status).toBe(200);
                  expect(res.body.user_id).toBe(user.id);
                  done();
                });
            });
        });
      });
    });

    describe('when using invalid parameters', () => {
      it('should not create a new admin', done => {
        factory.create('User', { password: 'QSShBtjP', type: 'admin' }).then(user => {
          request
            .post('/api/v1/users/sessions')
            .send({
              mail: user.mail,
              password: '$2b$10$G4b27Ilbv5Jmg8IrtWzjUuiY3zD2wvG9OuWlXEbg60F5Xy8s1Z12u'
            })
            .set('Accept', 'application/json')
            .then(res => {
              request
                .post('/api/v1/admin/users')
                .send({ user_id: 0 })
                .set({
                  Accept: 'application/json',
                  authorization: res.headers.authorization
                })
                .then(response => {
                  expect(response.status).toBe(503);
                  done();
                });
            });
        });
      });
    });

    describe('when authorization header is missing', () => {
      it('should not create a new admin', done => {
        request
          .post('/api/v1/admin/users')
          .send({ user_id: 0 })
          .set({
            Accept: 'application/json'
          })
          .then(response => {
            expect(response.status).toBe(422);
            done();
          });
      });
    });
  });
});
