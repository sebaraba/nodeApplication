import pool from './pool';

pool.on('connect', () => {
    console.log('connected to the db');
});

pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
});

/**
 * CREATE users Table
 */

const createUsersTable = () => {
    const createUsersQuery = `CREATE TABLE IF NOT EXISTS users
    (id SERIAL PRIMARY KEY, 
    email VARCHAR(100) UNIQUE NOT NULL, 
    first_name VARCHAR(100), 
    last_name VARCHAR(100), 
    password VARCHAR(100) NOT NULL,
    is_admin BOOLEAN,
    created_on DATE NOT NULL)`;

    pool.query(createUsersQuery)
    .then((res) => {
        console.log(res);
        pool.end();
    })
    .catch((err) => {
        console.log(err);
        pool.end();
    });
};

/**
 * DROP Users Table
 */

const dropUsersTable = () => {
    const dropUsersQuery = `DROP TABLE IF EXISTS user`;
    pool.query(dropUsersQuery)
    .then((res) => {
        console.log(res);
        pool.end;
    })
    .catch((err) => {
        console.log(err);
        pool.end;
    });
};

/**
 * CREATE All Tables
 * this is method is intended for a latter use when we need to export several CREATES/DROPS
 */
const createAllTables = () => {
    createUsersTable();
};

  
/**
 * DROP All Tables
 * this is method is intended for a latter use when we need to export several CREATES/DROPS
 */

const dropAllTables = () => {
    dropUsersTable();
};

export {
    createAllTables,
    dropAllTables
}

require('make-runnable');