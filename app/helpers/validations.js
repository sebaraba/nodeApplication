import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import env from '../../env.js';

/**
 * Hash password before saving to db
 * @param {string} password
 * @returns {string} return hashed password 
 */
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const hashPassword = password => bcrypt.hashSync(password, salt);


/**
 * Compare hashed and plain text passwords
 * @param {string} hashedPassword
 * @param {string} password
 * @returns {boolean} True/Fales 
 */
const comparePassword = (hashedPassword, password) => {
  return bcrypt.compareSync(password, hashedPassword)
}

/**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */
const isValidEmail = (email) => {
  const regEx = /\S+@\S+\.\S+/;
  return regEx.test(email);
};

/**
   * isValidPassword helper method
   * @param {string} password
   * @returns {Boolean} True or False
   */
const isValidPassword = (password) => {
    const regEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    return regEx.test(password);
};

/**
   * isEmpty helper method
   * @param {string, integer} input
   * @returns {Boolean} True or False
   */
const isEmpty = (input) => {
  if (input === undefined || input === '') {
    return true;
  }
  if (input.replace(/\s/g, '').length) {
    return false;
  } return true;
};

/**
   * empty helper method
   * @param {string, integer} input
   * @returns {Boolean} True or False
   */
const empty = (input) => {
  if (input === undefined || input === '') {
    return true;
  }
};

/**
 * Generate JWT
 * @param {string} id
 * @param {string} email
 * @param {string} first_name
 * @param {string} last_name
 * @param {bool}   is_admin
 */

const generateJWT = (id, email, first_name, last_name, is_admin) => {
  const token = jwt.sign({email, user_id: id,
    is_admin,first_name,last_name,},
    env.secret, 
    { expiresIn: '3d'});
    
  return token;
};

export  {
  hashPassword,
  comparePassword,
  isValidEmail,
  isValidPassword,
  isEmpty,
  empty,
  generateJWT
};