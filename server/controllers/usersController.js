import moment from 'moment';
import dbQuery from '../db/dev/dbQuery.js';

import {
  hashPassword,
  comparePassword,
  isValidEmail,
  isValidPassword,
  isEmpty,
  generateJWT,
} from '../helpers/validations.js';

import {
  errorMessage, successMessage, status,
} from '../helpers/status.js';

/**
 * Create A User
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
 */
const registerUser = async (req, res) => {
    const {
        email, first_name, last_name, password,
    } = req.body;
    const created_on = moment(new Date());

    if (isEmpty(email) || isEmpty(first_name) || isEmpty(last_name) || isEmpty(password)) {
      errorMessage.error = 'Email, password, first name and last name field cannot be empty';
      return res.status(status.bad).send(errorMessage);
    }
    if (!isValidEmail(email)) {
      errorMessage.error = 'Please enter a valid email';
      return res.status(status.bad).send(errorMessage);
    }
    if (!isValidPassword(password)) {
      errorMessage.error = 'Password must be larger than eigth characters';
      return res.status(status.bad).send(errorMessage);
    }

    const hashedPassword = hashPassword(password);
    const createUserQuery = `INSERT INTO
        users(email, first_name, last_name, password, created_on)
        VALUES($1, $2, $3, $4, $5)
        returning *`;
    const values = [
      email,
      first_name,
      last_name,
      hashedPassword,
      created_on,
    ];
    try {
      const { rows } = await dbQuery.query(createUserQuery, values);
      const dbResponse = rows[0];
      delete dbResponse.password;
      const token = generateJWT(dbResponse.id, dbResponse.email, 
        dbResponse.first_name, dbResponse.last_name, dbResponse.is_admin);
      successMessage.data = dbResponse;
      successMessage.data.token = token;
      return res.status(status.success).send({user: dbResponse.email, token: token, data: successMessage});
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        errorMessage.error = 'User with that email already exist';
        return res.status(status.conflict).send(errorMessage);
      }
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage);
    }
};

/**
 * Signin
 * @param {object} req
 * @param {object} res
 * @returns {object} user object
 */
const siginUser = async (req, res) => {
    const { email, password } = req.body;

    if ( isEmpty(email) || isEmpty(password) ) {
        errorMessage.error = 'Email or password detail is missing';
        return res.status(status.bad).send(errorMessage);
    }
    if ( !isValidEmail(email) || !isValidPassword(password) ) {
        errorMessage.error = 'Please enter a valid email or password';
        return res.status(status.bad).send(errorMessage);
    }

    const signinUserQuery = 'SELECT * FROM users WHERE email = $1';
    try {
        const { rows } = await dbQuery.query(signinUserQuery, [email]);
        const dbResponse = rows[0];

        if ( !dbResponse ) {
            errorMessage.error = 'User with this email does not exist';
            return res.status(status.notfound).send(errorMessage);
        }
        if ( !comparePassword(dbResponse.password, password) ) {
            errorMessage.error = 'The password you provided is incorrect';
            return res.status(status.bad).send(errorMessage);
        }

        delete dbResponse.password;
        const token = generateJWT(dbResponse.id, dbResponse.email, 
          dbResponse.first_name, dbResponse.last_name, dbResponse.is_admin);

        res.cookie('token', token,  { sameSite: 'none', maxAge: 900000, httpOnly: true });
        console.log(res);
        successMessage.data = dbResponse;
        successMessage.data.token = token;
        return res.status(status.success).send(successMessage);
    } catch(error) {
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    };
};

/**
 * @params {Object} req
 * @params {Object} res
 * @returns return firstname and Lastname
 */
const searchFirstOrLastName = async (req, res) => {
    const { first_name, last_name } = req.query;
    const searchForQuery = `SELECT * FROM users WHERE first_name=$1 OR last_name=$2 ORDER BY id DESC`;
    try {
        const { rows } = await dbQuery.query(searchForQuery, [first_name, last_name]);
        const dbEntry = rows;
        console.log(dbEntry);
        if(!dbEntry) {
            errorMessage.error = 'User not found';
            return res.status(status.notfound).send(errorMessage);
        }
        delete dbEntry.password;
        successMessage.data = dbEntry;
        return res.status(status.success).send(successMessage);
    } catch (error) {
        errorMessage.error = 'Operation unsuccessful';
        console.log(error);
        return res.status(status.error).send(errorMessage);
    }
};


export {
    registerUser,
    siginUser,
    searchFirstOrLastName
};