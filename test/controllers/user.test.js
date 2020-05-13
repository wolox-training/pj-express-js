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

  describe('/POST users/sessions', () => {
    describe('when using valid parameters', () => {
      it('should create a new session token', done => {
        factory.create('User', { password: 'QSShBtjP' }).then(user => {
          request
            .post('/api/v1/users/sessions')
            .send({
              mail: user.mail,
              password: '$2b$10$G4b27Ilbv5Jmg8IrtWzjUuiY3zD2wvG9OuWlXEbg60F5Xy8s1Z12u'
            })
            .set('Accept', 'application/json')
            .then(res => {
              expect(res.status).toBe(200);
              expect(res.body.user_id).toBe(user.id);
              expect(res.headers.authorization).toBeDefined();
              done();
            });
        });
      });
    });

    describe('when using invalid password', () => {
      it('should not create a new session token', done => {
        factory.create('User', { password: 'pSShBtjP' }).then(user => {
          request
            .post('/api/v1/users/sessions')
            .send({
              mail: user.mail,
              password: '$2b$10$G4b27Ilbv5Jmg8IrtWzjUuiY3zD2wvG9OuWlXEbg60F5Xy8s1Z12u'
            })
            .set('Accept', 'application/json')
            .then(res => {
              expect(res.status).toBe(500);
              expect(res.body.internal_code).toBe('authentication_error');
              expect(res.headers.authorization).toBeUndefined();
              done();
            });
        });
      });
    });
    describe('when user doesnt exist', () => {
      it('should not create a new session token', done => {
        factory.create('User', { password: 'QSShBtjP' }).then(() => {
          request
            .post('/api/v1/users/sessions')
            .send({
              mail: 'pepe@wolox.com.ar',
              password: '$2b$10$G4b27Ilbv5Jmg8IrtWzjUuiY3zD2wvG9OuWlXEbg60F5Xy8s1Z12u'
            })
            .set('Accept', 'application/json')
            .then(res => {
              expect(res.status).toBe(500);
              expect(res.body.internal_code).toBe('authentication_error');
              expect(res.headers.authorization).toBeUndefined();
              done();
            });
        });
      });
    });

    describe('when using invalid parameters', () => {
      it('should create a new session token', done => {
        factory.create('User', { password: 'QSShBtjP' }).then(() => {
          request
            .post('/api/v1/users/sessions')
            .send({
              mail: 'hi',
              password: '$2b$10$G4b27Ilbv5Jmg8IrtWzjUuiY3zD2wvG9OuWlXEbg60F5Xy8s1Z12u'
            })
            .set('Accept', 'application/json')
            .then(res => {
              expect(res.status).toBe(422);
              expect(res.body.internal_code).toBe('invalid_params');
              expect(res.headers.authorization).toBeUndefined();
              done();
            });
        });
      });
    });
  });
});
