const mockDate = require('mockdate');
const jwt = require('../../app/services/jwt');

describe('JWT Service', () => {
  describe('authorizationToken', () => {
    describe('when expiry time has passed', () => {
      it('the token should be invalid', done => {
        mockDate.set('2000-11-22');
        const token = jwt.authorizationToken('pedro.jara@wolox.com.ar');
        mockDate.set('2000-11-23');
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
