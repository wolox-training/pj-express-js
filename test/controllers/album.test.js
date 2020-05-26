const nock = require('nock');
const supertest = require('supertest');
const app = require('../../app');
const { config } = require('../../config/testing');

const request = supertest(app);

require('../factory/user');

describe('Albums Controller', () => {
  describe('/GET albums', () => {
    describe('when using valid parameters', () => {
      it('should respond with albums information', done => {
        nock(config.common.api.albumsApiUrl)
          .get('/albums')
          .reply(200, '../mocks/albumsResponse.json', {
            'Content-Type': 'application/json'
          });
        request
          .get('/api/v1/albums')
          .set({
            Accept: 'application/json',
            authorization:
              'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtYWlsIjoicGVkcm8uamFyYUB3b2xveC5jb20uYXIifQ.zLLy2i25xQZuXyk0s98afCQA4hlomRq92D1lZQcP-mE'
          })
          .then(response => {
            expect(response.status).toBe(200);
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
            expect(response.status).toBe(500);
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
          .reply(200, '../mocks/photosResponse.json', {
            'Content-Type': 'application/json'
          });
        request
          .get('/api/v1/albums/1/photos')
          .set({
            Accept: 'application/json',
            authorization:
              'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtYWlsIjoicGVkcm8uamFyYUB3b2xveC5jb20uYXIifQ.zLLy2i25xQZuXyk0s98afCQA4hlomRq92D1lZQcP-mE'
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
          expect(response.status).toBe(500);
          done();
        });
    });
  });
});
