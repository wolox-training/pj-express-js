const nock = require('nock');
const httpAdapter = require('axios/lib/adapters/http');
const axios = require('axios');
const supertest = require('supertest');
const { factory } = require('factory-girl');
const app = require('../../app');
const { config } = require('../../config/testing');

const request = supertest(app);
const host = 'http://localhost';

axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;

require('../factory/user');

describe('Albums Controller', () => {
  describe('/GET albums', () => {
    describe('when using valid parameters', () => {
      it('should respond with albums information', done => {
        const scope = nock(config.common.api.albumsApiUrl)
          .get('/albums')
          // eslint-disable-next-line no-undef
          .replyWithFile(200, `${appRoot}/test/mocks/albumsResponse.json`, {
            'Content-Type': 'application/json'
          });
        factory.create('User', { password: 'QSShBtjP' }).then(user => {
          request
            .post('/api/v1/users/sessions')
            .send({
              mail: user.mail,
              password: '$2b$10$G4b27Ilbv5Jmg8IrtWzjUuiY3zD2wvG9OuWlXEbg60F5Xy8s1Z12u'
            })
            .set('Accept', 'application/json')
            .then(res => {
              request
                .get('/api/v1/albums')
                .set({
                  Accept: 'application/json',
                  user_id: res.body.user_id,
                  authorization: res.headers.authorization
                })
                .then(response => {
                  expect(response.status).toBe(200);
                  scope.done();
                  done();
                });
            });
        });
      });
    });

    describe('when headers are missing', () => {
      it('should respond with albums information', done => {
        request
          .get('/api/v1/albums')
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

  describe('/GET albums/:id/photos', () => {
    describe('when using valid parameters', () => {
      it('should respond with albums information', done => {
        const scope = nock(config.common.api.albumsApiUrl)
          .get('/photos?albumId=1')
          // eslint-disable-next-line no-undef
          .replyWithFile(200, `${appRoot}/test/mocks/photosResponse.json`, {
            'Content-Type': 'application/json'
          });
        factory.create('User', { password: 'QSShBtjP' }).then(user => {
          request
            .post('/api/v1/users/sessions')
            .send({
              mail: user.mail,
              password: '$2b$10$G4b27Ilbv5Jmg8IrtWzjUuiY3zD2wvG9OuWlXEbg60F5Xy8s1Z12u'
            })
            .set('Accept', 'application/json')
            .then(res => {
              request
                .get('/api/v1/albums/1/photos')
                .set({
                  Accept: 'application/json',
                  user_id: res.body.user_id,
                  authorization: res.headers.authorization
                })
                .then(response => {
                  expect(response.status).toBe(200);
                  scope.done();
                  done();
                });
            });
        });
      });
    });
  });

  describe('when headers are missing', () => {
    it('should respond with albums information', done => {
      request
        .get('/api/v1/albums/1/photos')
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
