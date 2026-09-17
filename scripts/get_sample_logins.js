const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://neondb_owner:npg_KyZTrp7XQ8xl@ep-spring-snow-azgi3kt1.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
  ssl: { rejectUnauthorized: false },
});

async function main() {
  await client.connect();
  const res = await client.query(`
    SELECT u.email, u.password_hash, s.school_number, s.name as school_name, d.name as district_name, r.name as region_name
    FROM users u
    JOIN schools s ON u.school_id = s.id
    JOIN districts d ON s.district_id = d.id
    JOIN regions r ON s.region_id = r.id
    WHERE (d.name ILIKE '%Qiziltepa%' OR d.name ILIKE '%Gijduvon%' OR d.name ILIKE '%G‘ijduvon%') AND s.school_number = '24'
    LIMIT 5;
  `);
  console.log('--- SPECIFIC TEST SCHOOL ACCOUNTS ---');
  res.rows.forEach((row, i) => {
    console.log(`${i+1}. ${row.region_name} -> ${row.district_name} (${row.school_name})`);
    console.log(`   Login (Email): ${row.email}`);
    console.log(`   Parol: Maktab@${row.school_number}`);
    console.log('');
  });
  await client.end();
}

main().catch(console.error);
