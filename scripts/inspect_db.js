const { Client } = require('pg');

async function main() {
  const client = new Client({
    connectionString: 'postgresql://neondb_owner:npg_KyZTrp7XQ8xl@ep-spring-snow-azgi3kt1.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
    connectionTimeoutMillis: 10000,
  });

  try {
    await client.connect();
    const { rows: users } = await client.query("SELECT id, email, school_id, role, name FROM users WHERE role = 'SCHOOL_ADMIN' LIMIT 10");
    console.log('Sample School Users:', JSON.stringify(users, null, 2));

    const { rows: sch24 } = await client.query("SELECT id, name, school_number, current_score, coordinate_status, region_id, district_id FROM schools WHERE school_number = '24' LIMIT 5");
    console.log('Schools with number 24:', JSON.stringify(sch24, null, 2));

    const { rows: assessments } = await client.query('SELECT id, school_id, score, max_score, percentage, status, submitted_at FROM assessments LIMIT 10');
    console.log('Assessments in DB:', JSON.stringify(assessments, null, 2));
  } catch (err) {
    console.error('DB Error:', err);
  } finally {
    await client.end();
  }
}

main();
