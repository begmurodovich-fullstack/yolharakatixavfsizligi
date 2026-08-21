const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres:dinara2002@localhost:5432/school_road_safety_db',
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
