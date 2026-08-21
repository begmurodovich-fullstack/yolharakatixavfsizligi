const { Pool } = require('pg');

const NEON_DATABASE_URL = 'postgresql://neondb_owner:npg_KyZTrp7XQ8xl@ep-spring-snow-azgi3kt1.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

const pool = new Pool({
  connectionString: NEON_DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function enforceAbsoluteZeroState() {
  console.log('🏛️ Enforcing 100% ABSOLUTE ZERO STATE on Neon Cloud Database...');

  // 1. Reset ALL 10,110 schools: 0 score, NULL coordinates, PENDING status, NULL notes
  await pool.query(`
    UPDATE schools 
    SET current_score = 0,
        latitude = NULL,
        longitude = NULL,
        coordinate_status = 'PENDING',
        address_notes = NULL,
        director_name = NULL,
        student_count = 0,
        status = 'ACTIVE',
        updated_at = NOW();
  `);

  // 2. Wipe ALL assessments, evidence, audit logs
  await pool.query(`TRUNCATE assessments CASCADE;`);
  await pool.query(`TRUNCATE evidence CASCADE;`);
  await pool.query(`TRUNCATE audit_logs CASCADE;`);

  // 3. Reset all users to first login
  await pool.query(`
    UPDATE users 
    SET is_first_login = TRUE 
    WHERE role = 'SCHOOL_USER';
  `);

  // 4. Verification queries
  const check = await pool.query(`
    SELECT 
      COUNT(*) as total_schools,
      COUNT(CASE WHEN current_score = 0 THEN 1 END) as zero_score_schools,
      COUNT(CASE WHEN current_score > 0 THEN 1 END) as scored_schools,
      COUNT(CASE WHEN latitude IS NOT NULL THEN 1 END) as schools_with_coordinates,
      COUNT(CASE WHEN coordinate_status = 'VERIFIED' THEN 1 END) as verified_coords_count,
      COUNT(CASE WHEN coordinate_status = 'PENDING' THEN 1 END) as pending_coords_count,
      (SELECT COUNT(*) FROM assessments) as assessments_count,
      (SELECT COUNT(*) FROM evidence) as evidence_count,
      (SELECT COUNT(*) FROM audit_logs) as audit_logs_count
    FROM schools;
  `);

  console.log('🎉 ABSOLUTE ZERO STATE APPLIED SUCCESSFULLY:');
  console.log(JSON.stringify(check.rows[0], null, 2));

  await pool.end();
}

enforceAbsoluteZeroState().catch((err) => {
  console.error('Zero state error:', err);
  process.exit(1);
});
