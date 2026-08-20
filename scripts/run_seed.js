const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://postgres:dinara2002@localhost:5432/school_road_safety_db',
});

async function runSeed() {
  console.log('Connecting to PostgreSQL and running seed_data.sql...');
  const sqlPath = path.join(__dirname, '..', 'seed_data.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');

  const start = Date.now();
  await pool.query(sql);
  const duration = Date.now() - start;

  console.log(`✅ Seed executed in ${duration}ms!`);

  const gij24 = await pool.query(`
    SELECT u.email, u.password_hash, u.name, s.name as school_name, d.name as district_name 
    FROM users u 
    JOIN schools s ON u.school_id = s.id 
    JOIN districts d ON s.district_id = d.id 
    WHERE d.name LIKE '%ijduvon%' AND s.name = '24-maktab';
  `);

  console.log('Gijduvon 24-maktab Login Credentials:');
  console.log(JSON.stringify(gij24.rows[0], null, 2));

  await pool.end();
}

runSeed().catch((err) => {
  console.error('Seed execution error:', err);
  process.exit(1);
});
