const mockDate = require('mockdate');
const jwt = require('../../app/services/jwt');

describe('JWT Service', () => {
  describe('authorizationToken', () => {
    global.beforeEach(() => {
      mockDate.set('2020-06-03');
    });
    describe('when expiry time has passed', () => {
      it('the token should be invalid', done => {
        const token = jwt.authorizationToken({ mail: 'pedro.jara@wolox.com.ar', type: 'regular' });
        mockDate.set('2020-06-04');
        expect(() => jwt.validate(token)).toThrow();
        done();
      });
    });

    describe("when expiry time hasn't passed", () => {
      it('the token should be valid', done => {
        const token = jwt.authorizationToken('pedro.jara@wolox.com.ar');
        expect(jwt.validate(token)).toBeDefined();
        done();
      });
    });
  });
});
