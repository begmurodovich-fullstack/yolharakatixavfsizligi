const { Pool } = require('pg');

const NEON_DATABASE_URL = 'postgresql://neondb_owner:npg_KyZTrp7XQ8xl@ep-spring-snow-azgi3kt1.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

const pool = new Pool({
  connectionString: NEON_DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function purgeAllScores() {
  console.log('🧹 Purging all mock scores, assessments, evidence and logs on Neon Cloud...');

  await pool.query(`
    UPDATE schools 
    SET current_score = 0,
        coordinate_status = 'PENDING',
        updated_at = NOW();
  `);

  await pool.query(`DELETE FROM assessments;`);
  await pool.query(`DELETE FROM evidence;`);
  await pool.query(`DELETE FROM audit_logs;`);

  const res = await pool.query(`
    SELECT 
      COUNT(*) as total_schools,
      COUNT(CASE WHEN current_score = 0 THEN 1 END) as zero_score_count,
      COUNT(CASE WHEN current_score > 0 THEN 1 END) as scored_count,
      (SELECT COUNT(*) FROM assessments) as assessments_count,
      (SELECT COUNT(*) FROM evidence) as evidence_count
    FROM schools;
  `);

  console.log('✅ Purge Verification Result:');
  console.log(JSON.stringify(res.rows[0], null, 2));

  await pool.end();
}

purgeAllScores().catch(console.error);
