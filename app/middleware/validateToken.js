

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {
    errorMessage, status
} from '../helpers/status.js';

import env from '../../env.js';

dotenv.config();


/**
 * Verify Token
 * @param {object} req 
 * @param {object} res 
 * @param {object} next
 * @returns {object|void} response object 
 */
const verifyToken = async (err, res, req, next) => {
    try {
        var { token } = req.headers;
    } catch (error) {
        errorMessage.error = 'Please login first';
        return res.status(status.bad).send(errorMessage);
    }
    
    if(!token) {
        res.status(status.bad).send(errorMessage);
        return res.status(status.bad).send(errorMessage);
    }
    try {
        const decodedObject = await jwt.verify(token, process.env.SECRET)
        req.user = {
            email: decodedObject.email,
            user_id: decodedObject.user_id,
            is_admin: decodedObject.is_admin,
            first_name: decodedObject.first_name,
            last_name: decodedObject.last_name
        }
        next();
    } catch(err) {
        errorMessage.error = 'Authentication Failed';
        return res.status(status.unauthorized).send(errorMessage);
    }
};

export default verifyToken;