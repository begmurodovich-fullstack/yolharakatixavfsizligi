const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_KyZTrp7XQ8xl@ep-spring-snow-azgi3kt1.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
  ssl: { rejectUnauthorized: false }
});

async function main() {
  const fix1 = await pool.query(`
    UPDATE schools 
    SET school_number = substring(name from '\\d+') 
    WHERE name ~ '\\d+-maktab' AND (school_number IS NULL OR school_number != substring(name from '\\d+'))
    RETURNING id, name, school_number;
  `);
  console.log('Fixed schools with number mismatch:', fix1.rows);
  await pool.end();
}

main();
