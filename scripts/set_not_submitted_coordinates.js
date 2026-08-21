const { Pool } = require('pg');

const NEON_DATABASE_URL = 'postgresql://neondb_owner:npg_KyZTrp7XQ8xl@ep-spring-snow-azgi3kt1.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';
const LOCAL_DATABASE_URL = 'postgresql://postgres:dinara2002@localhost:5432/school_road_safety_db';

async function updateDb(url, name) {
  const pool = new Pool({
    connectionString: url,
    ssl: url.includes('neon.tech') ? { rejectUnauthorized: false } : undefined,
  });

  try {
    console.log(`Updating ${name}...`);
    await pool.query(`
      UPDATE schools 
      SET coordinate_status = 'NOT_SUBMITTED',
          latitude = NULL,
          longitude = NULL,
          address_notes = NULL,
          current_score = 0,
          updated_at = NOW();
      
      TRUNCATE assessments CASCADE;
      TRUNCATE evidence CASCADE;
      TRUNCATE audit_logs CASCADE;
    `);

    const res = await pool.query(`
      SELECT 
        COUNT(*) as total_schools,
        COUNT(CASE WHEN coordinate_status = 'PENDING' THEN 1 END) as pending_coords_count,
        COUNT(CASE WHEN coordinate_status = 'NOT_SUBMITTED' THEN 1 END) as not_submitted_count,
        COUNT(CASE WHEN latitude IS NOT NULL THEN 1 END) as schools_with_lat
      FROM schools;
    `);

    console.log(`✅ ${name} updated successfully:`, res.rows[0]);
  } catch (err) {
    console.error(`Error updating ${name}:`, err.message);
  } finally {
    await pool.end();
  }
}

async function main() {
  await updateDb(LOCAL_DATABASE_URL, 'Local Database');
  await updateDb(NEON_DATABASE_URL, 'Neon Cloud Database');
}

main().catch(console.error);
