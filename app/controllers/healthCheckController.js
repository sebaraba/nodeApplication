import express from 'express';
import moment from 'moment';
import { errorMessage, status } from '../helpers/status.js'
import dbQuery from '../db/dev/dbQuery.js'

const time = moment(new Date());

const healthCheck = async (req, res, next) => {
    
    var dbHealth = await dbHealthCheck();
    const healthcheck = {
        server : {
            uptime: process.update,
            message: 'UP',
            timestamp: time,
            status: 200
        },
        database: dbHealth
    };
    try {
        return res.send(healthcheck);
    } catch (error) {
        errorMessage.error = 'Server unavailable';
        return res.status(status.down).send(errorMessage);
    }
};

const dbHealthCheck = async () => {
    const { rows } = await dbQuery.query(`SELECT * FROM users`);
    if(!rows) {
        return {
            message: 'DOWN',
            time: time,
            status: 503
        }
    } 
    return {
        message: 'UP',
        time: time,
        status: 200
    }
}

export { healthCheck };