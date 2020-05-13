const supertest = require('supertest');
const { factory } = require('factory-girl');
const converter = require('../helpers/converter');

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
            .send(converter.objectToSnakeCase(body))
            .set('Accept', 'application/json')
            .then(res => {
              expect(res.status).toBe(200);
              expect(res.body.mail).toBe(body.mail);
              done();
            });
        });
      });
    });

    describe('when using invalid parameters', () => {
      describe('when using a repeated mail', () => {
        it('should not create a new user', done => {
          factory.create('User').then(user => {
            factory.attrs('User', { mail: `${user.mail}` }).then(body => {
              request
                .post('/api/v1/users')
                .send(converter.objectToSnakeCase(body))
                .set('Accept', 'application/json')
                .then(res => {
                  expect(res.status).toBe(503);
                  done();
                });
            });
          });
        });
      });

      describe('when using a invalid mail', () => {
        it('should not create a new user', done => {
          factory.attrs('User', { mail: 'Foo' }).then(body => {
            request
              .post('/api/v1/users')
              .send(converter.objectToSnakeCase(body))
              .set('Accept', 'application/json')
              .then(res => {
                expect(res.status).toBe(422);
                expect(res.body.internal_code).toBe('invalid_params');
                done();
              });
          });
        });
      });

      describe('when using a invalid password', () => {
        it('should not create a new user', done => {
          factory.attrs('User', { password: 'foo' }).then(body => {
            request
              .post('/api/v1/users')
              .send(converter.objectToSnakeCase(body))
              .set('Accept', 'application/json')
              .then(res => {
                expect(res.status).toBe(422);
                expect(res.body.internal_code).toBe('invalid_params');
                done();
              });
          });
        });
      });
    });
  });
});
