const { Pool } = require('pg');
const pool = new Pool({
  connectionString: 'postgresql://postgres:dinara2002@localhost:5432/school_road_safety_db',
});

async function checkAdmins() {
  const res = await pool.query(`
    SELECT id, email, password_hash, name, role, is_first_login, is_active 
    FROM users 
    WHERE role IN ('ADMIN', 'SUPER_ADMIN');
  `);
  console.log('Admins in PostgreSQL database:');
  console.log(JSON.stringify(res.rows, null, 2));
  await pool.end();
}

checkAdmins();
