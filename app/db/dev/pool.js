import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const Pool = pg.Pool;
const databaseConfig = { connectionString: process.env.DATABASE_URL};
const pool = new Pool(databaseConfig);

export default pool;