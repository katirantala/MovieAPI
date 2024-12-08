import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pgPool = new pg.Pool({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD
});

pgPool.query('SELECT NOW()')
    .then((res) => console.log('Database connection test successful:', res.rows))
    .catch((err) => console.error('Database connection error:', err.stack));

export default pgPool;
