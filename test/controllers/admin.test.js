const supertest = require('supertest');
const { factory } = require('factory-girl');

const app = require('../../app');

const request = supertest(app);

require('../factory/user');

describe('Admin Controller', () => {
  describe('/POST admin/users', () => {
    describe('when using valid parameters', () => {
      it('should create a new admin', done => {
        factory.create('User', { mail: 'pedro.jara@wolox.com.ar', type: 'admin' }).then(() => {
          factory.create('User', { type: 'regular' }).then(user => {
            request
              .post('/api/v1/admin/users')
              .send({ user_id: user.id })
              .set({
                Accept: 'application/json',
                authorization:
                  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtYWlsIjoicGVkcm8uamFyYUB3b2xveC5jb20uYXIifQ.zLLy2i25xQZuXyk0s98afCQA4hlomRq92D1lZQcP-mE'
              })
              .then(response => {
                expect(response.status).toBe(200);
                expect(response.body.id).toBe(user.id);
                done();
              });
          });
        });
      });
    });

    describe("when user doesn't exist", () => {
      it('should not create a new admin', done => {
        factory.create('User', { mail: 'pedro.jara@wolox.com.ar', type: 'admin' }).then(() => {
          request
            .post('/api/v1/admin/users')
            .send({ user_id: 0 })
            .set({
              Accept: 'application/json',
              authorization:
                'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtYWlsIjoicGVkcm8uamFyYUB3b2xveC5jb20uYXIifQ.zLLy2i25xQZuXyk0s98afCQA4hlomRq92D1lZQcP-mE'
            })
            .then(response => {
              expect(response.status).toBe(404);
              done();
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

  describe("when user isn't an admin user", () => {
    it('should not create a new admin', done => {
      factory.create('User', { password: 'QSShBtjP', type: 'regular' }).then(user => {
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
                expect(response.status).toBe(500);
                done();
              });
          });
      });
    });
  });
});