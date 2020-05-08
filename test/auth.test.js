import chai from 'chai';
import { generateJWT } from '../app/helpers/validations.js';
import { verifyToken } from '../app/auth/validateToken.js'
import sinMock from 'sinon-express-mock';
import sinon from 'sinon';

const mockReq = sinMock.mockReq;
const mockRes = sinMock.mockRes;
const should = chai.should();

const token = generateJWT('1', 'test@gmail', 'first', 'last', true);
const request = {
      headers: {"token": token},
};
const req = mockReq(request)
const res = mockRes();

describe('Auth Service Tests', () => {
    it('should generate token', () => {
        token.should.match(/^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/);
    });

    it('should be able to verify token', async () => {
        var nextSpy = sinon.spy();
        const verified = await verifyToken(res, req, nextSpy);
        nextSpy.calledOnce.should.equal(true);
        nextSpy.callCount.should.equal(1);
    });
})