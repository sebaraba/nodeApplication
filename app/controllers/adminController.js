import moment from 'moment';
import dbQuery from '../db/dev/dbQuery.js';

import {
    hashPassword,
    isValidEmail,
    isValidPassword,
    isEmpty,
    generateJWT,
  } from '../helpers/validations';

import {
  errorMessage, successMessage, status,
} from '../helpers/status';

/**
 * Create A Admin
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
 */
const createAdmin = async (req, res) => {
    const {
        email, first_name, last_name, password
    } = req.body;

    const { is_admin } = req.user;
    const created_on = moment(new Date());
    const adminUser = true;

    if(!is_admin === false) {
        errorMessage.error = 'Sorry you are unauthorized to create admin users';
        return res.status(status.bad).send(errorMessage);
    }
    if (isEmpty(email) || 
        isEmpty(first_name) || 
        isEmpty(last_name) || 
        isEmpty(password)) {

        errorMessage.error = 'Email, password, first name and last name field cannot be empty';
        return res.status(status.bad).send(errorMessage);
    }
    if(isValidEmail(email)) {
        errorMessage.error = 'Email not valid';
        return res.status(status.bad).send(errorMessage);
    }
    if(isValidPassword(password)) {
        errorMessage.error = 'Password not valid';
        return res.status(status.bad).send(errorMessage);
    }

    const hashedPassword = hashPassword(password);
    const createUserQuery = `INSERT INTO users(email,first_name,last_name,
                                password,is_admin,created_on)
                                VALUES($1, $2, $3, $4, $5, $6)
                                returning *`;
    const values = [
        email,
        first_name,
        last_name,
        hashedPassword,
        adminUser,
        created_on,
    ];

    try {
        const { rows } = await dbQuery.query(createUserQuery, values);
        const dbEntry = rows[0];
        delete dbEntry.password;
        const token = generateJWT(
                        dbEntry.id, dbEntry.email, 
                        dbEntry.first_name, dbEntry.last_name, 
                        dbEntry.is_admin); 
        successMessage.data = dbEntry;
        successMessage.data.token = token;
        return res.status(status.created).send(successMessage);
    } catch(error) {
        if(error.routine === '_bt_check_unique') {
            errorMessage.error = 'Admin with that email already exist';
            return res.status(status.conflict).send(errorMessage);
        } else {
            return res.statis(status.error).send(error);
        }
    };
};

/**
 * Update A User to Admin
 * @param {object} req 
 * @param {object} res 
 * @returns {object} updated user
 */
const updateUserToAdmin =  async (req, res) => {
    const { id } = req.params;
    const { isAdmin } = req.body;
    const { is_admin } = req.user;

    if(!is_admin === false) {
        errorMessage.error = 'Sorry you are unauthorized to make an user admin';
        return res.status(status.bad).send(errorMessage);
    }
    if( isAdmin === '') {
        errorMessage.error = 'Admin status needed';
        return res.status(status.bad).send(errorMessage);
    }

    const findUserQuery = `SELECT * FROM users WHERE id=$1`;
    const updateUserQuery = `UPDATE users SET is_admin=$1 WHERE id=$2 returning *`;

    try {
        const { rows } = await dbQuery.query(findUserQuery, id);
        const dbEntry = rows[0];
        if(!dbEntry) {
            errorMessage.error = 'User you searched for does not exist';
            return res.status(status.notfound).send(errorMessage);
        }
        const values = [ 
            id, 
            isAdmin 
        ];
        const response = await dbQuery.query(updateUserQuery, values);
        const updateResult =  response[0];
        delete updateResult.password;
        successMessage.data = updateResult;
        return res.status(status.success).send(successMessage);
    } catch (error) {
        errorMessage.error = 'Operation unsuccessful';
        return res.status(status.error).send(errorMessage);
    };
};

export {
    createAdmin,
    updateUserToAdmin,
};