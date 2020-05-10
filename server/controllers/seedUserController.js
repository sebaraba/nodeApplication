import moment from 'moment';

import pool from '../db/dev/pool.js';
import {
    hashPassword,
} from '../helpers/validations.js';

import {
  status,
} from '../helpers/status.js';
import dbQuery from '../db/dev/dbQuery.js';

const time = moment(new Date());

/**
 * Create A User
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
 */
const seedUser = async (req, res) => {
    const seedUserQuery = `INSERT INTO users
                    VALUES(default,'admin.user@gmail.com', 'admin', 'root', '${hashPassword('Password1')}', true, '${time}')`;
    
    try {
        const { rows } = await dbQuery.query(seedUserQuery);
        const dbResponse = rows[0];
        if (!dbResponse) {
            return res.status(status.bad).send('Seeding was not successful');
        }
        return res.status(status.created).send('Seeding users table was successful');
    } catch (error) {
        console.log(error);
        return res.status(status.error).send('An error occured please try again later');
    }
};

export default seedUser;