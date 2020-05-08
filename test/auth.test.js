import chai from 'chai';
const should = chai.should();
import { generateJWT } from '../app/helpers/validations.js';

describe('Auth Service Tests', () => {
    it('should generate token', () => {
        const token = generateJWT('1', 'test@gmail', 'first', 'last', 'yes');
        token.should.match(/^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/);
    });
})