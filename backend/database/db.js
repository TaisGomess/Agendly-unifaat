import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'smarthealth',
  password: '235689',
  port: 5432,
});

export default pool;