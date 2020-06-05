/* eslint-disable max-lines */
const supertest = require('supertest');
const { factory } = require('factory-girl');
const nock = require('nock');
const converter = require('../helpers/converter');
const jwt = require('../../app/services/jwt');
const { config } = require('../../config/testing');
const authorizationToken = require('../helpers/authorizationTokens');

const app = require('../../app');

const request = supertest(app);

require('../factory/models');

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

    describe('should not create a new user', () => {
      it('when using a repeated mail', done => {
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
      it('when using a invalid mail', done => {
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
      it('when using a invalid password', done => {
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
              expect(res.status).toBe(403);
              expect(res.body.internal_code).toBe('authentication_error');
              expect(res.headers.authorization).toBeUndefined();
              done();
            });
        });
      });
    });
    describe("when user doesn't exist", () => {
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
              expect(res.status).toBe(404);
              expect(res.body.internal_code).toBe('not_found');
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
  describe('/GET users', () => {
    describe('when using an admin user authentication', () => {
      it('should list all users', done => {
        factory.createMany('User', 5).then(() => {
          factory.create('User', { mail: 'pedro.jara@wolox.com.ar', type: 'admin' }).then(() => {
            request
              .get('/api/v1/users')
              .set({
                Accept: 'application/json',
                authorization: authorizationToken.adminToken
              })
              .then(res => {
                expect(res.status).toBe(200);
                expect(res.body.count).toBe(6);
                expect(res.body.page).toBe(0);
                done();
              });
          });
        });
      });
    });

    describe('with 5 admin users created', () => {
      beforeEach(() => {
        factory.createMany('User', 5, { type: 'admin' });
      });
      describe('when using an regular user authentication', () => {
        it('should list only regular users', done => {
          factory.create('User', { mail: 'pedro.jara@wolox.com.ar', type: 'regular' }).then(() => {
            request
              .get('/api/v1/users')
              .set({
                Accept: 'application/json',
                authorization: authorizationToken.regularToken
              })
              .then(res => {
                expect(res.status).toBe(200);
                expect(res.body.count).toBe(1);
                expect(res.body.page).toBe(0);
                done();
              });
          });
        });
      });

      describe('when authentication header is missing', () => {
        it('should not list users', done => {
          factory.create('User', { mail: 'pedro.jara@wolox.com.ar', type: 'regular' }).then(() => {
            request
              .get('/api/v1/users')
              .set({
                Accept: 'application/json'
              })
              .then(res => {
                expect(res.status).toBe(422);
                done();
              });
          });
        });
      });
    });
  });

  describe('/POST users/sessions/invalidate_all', () => {
    describe('when using valid parameters', () => {
      it('should invalidate all session tokens', done => {
        factory.create('User', { mail: 'pedro.jara@wolox.com.ar' }).then(user => {
          request
            .post('/api/v1/users/sessions/invalidate_all')
            .set({ Accept: 'application/json', authorization: authorizationToken.expiredToken })
            .then(() => {
              expect(
                jwt.validate(authorizationToken.expiredToken).iat <= Math.round(user.tokenEmitDate / 1000)
              ).toBeTruthy();
              done();
            });
        });
      });

      describe("when sessions aren't invalidated", () => {
        it('should keep tokens valid', done => {
          factory.create('User', { mail: 'pedro.jara@wolox.com.ar' }).then(user => {
            expect(
              jwt.validate(authorizationToken.regularToken).iat > Math.round(user.tokenEmitDate / 1000)
            ).toBeTruthy();
            done();
          });
        });
      });
    });
  });

  describe('/GET users/:id/albums', () => {
    describe('when using valid params', () => {
      it("should list all user's albums", done => {
        nock(config.common.api.albumsApiUrl)
          .get('/albums?id=2')
          .replyWithFile(200, `${process.cwd()}/test/mocks/limitedAlbumsResponse.json`, {
            'Content-Type': 'application/json'
          });
        factory.create('User', { mail: 'pedro.jara@wolox.com.ar' }).then(user => {
          factory.create('UserAlbum', { userId: user.id, albumId: 2 }).then(() => {
            request
              .get(`/api/v1/users/${user.id}/albums`)
              .set({
                Accept: 'application/json',
                authorization: authorizationToken.regularToken
              })
              .then(res => {
                expect(res.status).toBe(200);
                expect(res.body[0].id).toBe(2);
                done();
              });
          });
        });
      });
    });

    describe('when using admin user', () => {
      it("should list other user's albums", done => {
        nock(config.common.api.albumsApiUrl)
          .get('/albums?id=2')
          .replyWithFile(200, `${process.cwd()}/test/mocks/limitedAlbumsResponse.json`, {
            'Content-Type': 'application/json'
          });
        factory.create('User', { mail: 'pedro.jara@wolox.com.ar', type: 'admin' }).then(() => {
          factory.create('User', { type: 'regular' }).then(user => {
            factory.create('UserAlbum', { userId: user.id, albumId: 2 }).then(() => {
              request
                .get(`/api/v1/users/${user.id}/albums`)
                .set({
                  Accept: 'application/json',
                  authorization: authorizationToken.adminToken
                })
                .then(res => {
                  expect(res.status).toBe(200);
                  expect(res.body[0].id).toBe(2);
                  done();
                });
            });
          });
        });
      });
    });

    describe("when user doesn't exist", () => {
      it('should return status 404', done => {
        factory.create('User', { mail: 'pedro.jara@wolox.com.ar', type: 'admin' }).then(() => {
          request
            .get('/api/v1/users/0/albums')
            .set({
              Accept: 'application/json',
              authorization: authorizationToken.adminToken
            })
            .then(res => {
              expect(res.status).toBe(404);
              done();
            });
        });
      });
    });

    describe('when there is no authorization header', () => {
      it('should return status 422', done => {
        request
          .get('/api/v1/users/1/albums')
          .set({
            Accept: 'application/json'
          })
          .then(res => {
            expect(res.status).toBe(422);
            done();
          });
      });
    });
  });
});
