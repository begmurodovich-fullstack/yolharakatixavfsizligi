const { Client } = require('pg');

const client = new Client({
  connectionString:
    process.env.DATABASE_URL ||
    'postgresql://neondb_owner:npg_KyZTrp7XQ8xl@ep-spring-snow-azgi3kt1.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
  ssl: { rejectUnauthorized: false },
});

async function main() {
  await client.connect();
  const res = await client.query(`
    SELECT u.email, u.password_hash, s.name as school_name, d.name as district_name, r.name as region_name 
    FROM users u 
    JOIN schools s ON u.school_id = s.id 
    JOIN districts d ON s.district_id = d.id 
    JOIN regions r ON s.region_id = r.id 
    WHERE r.name ILIKE '%Navoiy%' AND d.name ILIKE '%Qiziltepa%' AND (s.name = '24-maktab' OR s.school_number = '24');
  `);
  console.log('Found:', res.rows[0]);
  await client.end();
}

main().catch(console.error);
