import chai from 'chai';
const should = chai.should();
import { isValidEmail, 
    validatePassword, 
    isEmpty} from '../app/helpers/validations.js';

describe('Basic Validation Tests', () => {
    it('email should be valid', () => {
        const validateEmail = isValidEmail('test.email@gmail.com');
        validateEmail.should.equal(true);
    });

    it('should validate password correctly', () => {
        const validPassowrd = validatePassword('TestPass1');
        validPassowrd.should.equal(true);
    });

    it('should be empty', () => {
        const empty = isEmpty('');
        empty.should.equal(true);
    });
});