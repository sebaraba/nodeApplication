import pool from './pool.js';

export default {
    /**
     * DB Query
     * @param {object} rwq
     * @param {object} res
     * @returns {object} object
     */


    query(queryText, params) {
        return new Promise((resolve, reject) => {
            pool.query(queryText, params)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }
}