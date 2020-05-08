import chai from 'chai';
const should = chai.should();
import { comparePassword, hashPassword} from '../app/helpers/validations.js';

describe('Password Hash test', () => {
    it('should hash password', () => {
        const hashedPassword = hashPassword('test');
        hashedPassword.length.should.equal(60);
        hashedPassword.should.not.equal('test');
    });

    it('should compare passwords', () => {
        const notEqual = comparePassword('test', 'tset');
        notEqual.should.equal(false);
    });
});