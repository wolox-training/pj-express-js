const nock = require('nock');
const { factory } = require('factory-girl');
const supertest = require('supertest');
const app = require('../../app');
const { config } = require('../../config/testing');
const albumsResponse = require('../mocks/albumsResponse.json');
const photosResponse = require('../mocks/photosResponse.json');
const oneAlbumResponse = require('../mocks/oneAlbumResponse.json');
const authorizationTokens = require('../helpers/authorizationTokens');

const request = supertest(app);

require('../factory/models');

describe('Albums Controller', () => {
  beforeEach(async () => {
    await factory.create('User', { mail: 'pedro.jara@wolox.com.ar' });
  });
  describe('/GET albums', () => {
    describe('when using valid parameters', () => {
      it('should respond with albums information', done => {
        nock(config.common.api.albumsApiUrl)
          .get('/albums')
          .reply(200, albumsResponse, {
            'Content-Type': 'application/json'
          });
        request
          .get('/api/v1/albums')
          .set({
            Accept: 'application/json',
            authorization: authorizationTokens.regularToken
          })
          .then(response => {
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(100);
            done();
          });
      });
    });

    describe('when headers are missing', () => {
      it('should not respond with albums information', done => {
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

    describe('when the authorization token doesnt match the user', () => {
      it('should respond with an error', done => {
        request
          .get('/api/v1/albums')
          .set({
            Accept: 'application/json',
            authorization:
              'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtYWlsIjoicGVkcm8uamFyYUB3b2xveC5jb20uYXIifQ.zLLy2i25xQZuXyk0s98afCQA4hlomRq92D1lZQcaaaa'
          })
          .then(response => {
            expect(response.status).toBe(403);
            done();
          });
      });
    });
  });

  describe('/GET albums/:id/photos', () => {
    describe('when using valid parameters', () => {
      it('should respond with photos information', done => {
        nock(config.common.api.albumsApiUrl)
          .get('/photos?albumId=1')
          .reply(200, photosResponse, {
            'Content-Type': 'application/json'
          });
        request
          .get('/api/v1/albums/1/photos')
          .set({
            Accept: 'application/json',
            authorization: authorizationTokens.regularToken
          })
          .then(response => {
            expect(response.status).toBe(200);
            done();
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

  describe("when the authorization token doesn't match the user", () => {
    it('should respond with an error', done => {
      request
        .get('/api/v1/albums/1/photos')
        .set({
          Accept: 'application/json',
          authorization:
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtYWlsIjoicGVkcm8uamFyYUB3b2xveC5jb20uYXIifQ.zLLy2i25xQZuXyk0s98afCQA4hlomRq92D1lZQaaaaa'
        })
        .then(response => {
          expect(response.status).toBe(403);
          done();
        });
    });
  });

  describe('/POST albums/:id', () => {
    describe('when using valid parameters', () => {
      it('should buy an album', done => {
        nock(config.common.api.albumsApiUrl)
          .get('/albums?id=1')
          .reply(200, oneAlbumResponse, {
            'Content-Type': 'application/json'
          });
        request
          .post('/api/v1/albums/1')
          .send({
            user_id: 1
          })
          .set({
            Accept: 'application/json',
            authorization: authorizationTokens.regularToken
          })
          .then(response => {
            expect(response.status).toBe(200);
            expect(response.body.albumId).toBe(1);
            expect(response.body.userId).toBe(1);
            done();
          });
      });
    });

    describe('when trying to buy twice the same album', () => {
      it('should respond with error', done => {
        factory.create('UserAlbum', { albumId: 1 }).then(() => {
          nock(config.common.api.albumsApiUrl)
            .get('/albums?id=1')
            .reply(200, oneAlbumResponse, {
              'Content-Type': 'application/json'
            });
          request
            .post('/api/v1/albums/1')
            .send({
              user_id: 1
            })
            .set({
              Accept: 'application/json',
              authorization: authorizationTokens.regularToken
            })
            .then(response => {
              expect(response.status).toBe(503);
              done();
            });
        });
      });
    });

    describe("when user doesn't exist", () => {
      it('should respond with error', done => {
        factory.create('UserAlbum', { albumId: 1 }).then(() => {
          request
            .post('/api/v1/albums/1')
            .send({
              user_id: 0
            })
            .set({
              Accept: 'application/json',
              authorization: authorizationTokens.regularToken
            })
            .then(response => {
              expect(response.status).toBe(503);
              done();
            });
        });
      });
    });

    describe("when album doesn't exist", () => {
      it('should not buy an album', done => {
        nock(config.common.api.albumsApiUrl)
          .get('/albums?id=0')
          .reply(200, [], {
            'Content-Type': 'application/json'
          });
        request
          .post('/api/v1/albums/0')
          .send({
            user_id: 1
          })
          .set({
            Accept: 'application/json',
            authorization: authorizationTokens.regularToken
          })
          .then(response => {
            expect(response.status).toBe(404);
            done();
          });
      });
    });
  });
});
