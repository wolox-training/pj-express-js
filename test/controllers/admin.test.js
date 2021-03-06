const supertest = require('supertest');
const { factory } = require('factory-girl');
const authorizationTokens = require('../helpers/authorizationTokens');

const app = require('../../app');

const request = supertest(app);

require('../factory/models');

describe('Admin Controller', () => {
  describe('/POST admin/users', () => {
    describe('when using valid parameters and user exists', () => {
      it('should update regular user to admin', done => {
        factory.create('User', { mail: 'pedro.jara@wolox.com.ar', type: 'admin' }).then(() => {
          factory.create('User', { type: 'regular' }).then(user => {
            request
              .post('/api/v1/admin/users')
              .send({
                first_name: user.firstName,
                last_name: user.lastName,
                mail: user.mail,
                password: user.password,
                type: 'admin'
              })
              .set({
                Accept: 'application/json',
                authorization: authorizationTokens.adminToken
              })
              .then(response => {
                expect(response.status).toBe(200);
                expect(response.body.id).toBe(user.id);
                expect(response.body.type).toBe('admin');
                done();
              });
          });
        });
      });
    });

    describe("when user doesn't exist", () => {
      it('should create a new admin user', done => {
        factory.create('User', { mail: 'pedro.jara@wolox.com.ar', type: 'admin' }).then(() => {
          request
            .post('/api/v1/admin/users')
            .send({
              first_name: 'First',
              last_name: 'Last',
              mail: 'pepe@wolox.com.ar',
              password: 'password',
              type: 'admin'
            })
            .set({
              Accept: 'application/json',
              authorization: authorizationTokens.adminToken
            })
            .then(response => {
              expect(response.status).toBe(200);
              expect(response.body.id).toBe(2);
              expect(response.body.type).toBe('admin');
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
      factory.create('User', { mail: 'pedro.jara@wolox.com.ar', type: 'regular' }).then(() => {
        request
          .post('/api/v1/admin/users')
          .send({
            first_name: 'First',
            last_name: 'Last',
            mail: 'pepe@wolox.com.ar',
            password: 'password',
            type: 'admin'
          })
          .set({
            Accept: 'application/json',
            authorization: authorizationTokens.regularToken
          })
          .then(response => {
            expect(response.status).toBe(403);
            done();
          });
      });
    });
  });
});
