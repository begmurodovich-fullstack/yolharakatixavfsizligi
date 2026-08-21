const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://neondb_owner:npg_KyZTrp7XQ8xl@ep-spring-snow-azgi3kt1.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
  ssl: { rejectUnauthorized: false },
});

async function main() {
  await client.connect();
  console.log('Connected to Neon via direct client!');

  await client.query(`
    UPDATE schools 
    SET current_score = 0,
        latitude = NULL,
        longitude = NULL,
        coordinate_status = 'PENDING',
        address_notes = NULL,
        director_name = NULL,
        student_count = 0,
        updated_at = NOW();
    
    TRUNCATE assessments CASCADE;
    TRUNCATE evidence CASCADE;
    TRUNCATE audit_logs CASCADE;
    
    UPDATE users SET is_first_login = TRUE WHERE role = 'SCHOOL_USER';
  `);

  console.log('Direct query executed!');

  const check = await client.query(`
    SELECT 
      COUNT(*) as total_schools,
      COUNT(CASE WHEN current_score = 0 THEN 1 END) as zero_score_schools,
      COUNT(CASE WHEN latitude IS NOT NULL THEN 1 END) as schools_with_coordinates,
      COUNT(CASE WHEN coordinate_status = 'VERIFIED' THEN 1 END) as verified_coords_count,
      (SELECT COUNT(*) FROM assessments) as assessments_count,
      (SELECT COUNT(*) FROM evidence) as evidence_count
    FROM schools;
  `);

  console.log('Verification:');
  console.log(JSON.stringify(check.rows[0], null, 2));

  await client.end();
}

main().catch(console.error);
