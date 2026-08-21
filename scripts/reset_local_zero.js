const { Client } = require('pg');

const localClient = new Client({
  connectionString: 'postgresql://postgres:dinara2002@localhost:5432/school_road_safety_db',
});

async function resetLocal() {
  await localClient.connect();
  console.log('Connected to local PostgreSQL!');

  await localClient.query(`
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

  console.log('Local DB reset complete!');

  const check = await localClient.query(`
    SELECT 
      COUNT(*) as total_schools,
      COUNT(CASE WHEN current_score = 0 THEN 1 END) as zero_score_schools,
      COUNT(CASE WHEN latitude IS NOT NULL THEN 1 END) as schools_with_coordinates,
      COUNT(CASE WHEN coordinate_status = 'VERIFIED' THEN 1 END) as verified_coords_count,
      (SELECT COUNT(*) FROM assessments) as assessments_count,
      (SELECT COUNT(*) FROM evidence) as evidence_count
    FROM schools;
  `);

  console.log('Local Verification:', check.rows[0]);
  await localClient.end();
}

resetLocal().catch(console.error);
