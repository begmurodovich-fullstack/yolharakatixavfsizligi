const { Pool } = require('pg');

const NEON_DATABASE_URL =
  'postgresql://neondb_owner:npg_KyZTrp7XQ8xl@ep-spring-snow-azgi3kt1.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

const pool = new Pool({
  connectionString: NEON_DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function fixSchools() {
  const client = await pool.connect();
  try {
    console.log('Adding road_type column if not exists...');
    await client.query(`
      ALTER TABLE schools ADD COLUMN IF NOT EXISTS road_type VARCHAR(30) DEFAULT 'URBAN';
    `);

    // Assign realistic road types based on school distribution:
    console.log('Assigning road types to schools...');
    await client.query(`
      UPDATE schools
      SET road_type = CASE
        WHEN (id ~* '[0-9]' AND (substring(id from '[0-9]+')::bigint % 100) < 12) THEN 'INTERNATIONAL'
        WHEN (id ~* '[0-9]' AND (substring(id from '[0-9]+')::bigint % 100) < 35) THEN 'NATIONAL'
        WHEN (id ~* '[0-9]' AND (substring(id from '[0-9]+')::bigint % 100) < 70) THEN 'LOCAL'
        ELSE 'URBAN'
      END;
    `);

    console.log('Checking school count by road_type:');
    const roadStats = await client.query(`
      SELECT road_type, COUNT(*) as count 
      FROM schools 
      GROUP BY road_type
      ORDER BY count DESC
    `);
    console.log(roadStats.rows);

    console.log('Done fixing schools road types!');
  } catch (err) {
    console.error('Error fixing schools:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

fixSchools();
