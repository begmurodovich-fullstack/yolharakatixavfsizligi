const { Pool } = require('pg');
const pool = new Pool({ connectionString: 'postgresql://postgres:dinara2002@localhost:5432/school_road_safety_db' });

async function reset() {
  await pool.query(`
    UPDATE users 
    SET password_hash = 'Maktab@24', is_first_login = TRUE 
    WHERE id = 'usr-sch-1684';
  `);
  console.log('✅ Gijduvon 24-maktab is ready for user onboarding test!');
  await pool.end();
}

reset();
