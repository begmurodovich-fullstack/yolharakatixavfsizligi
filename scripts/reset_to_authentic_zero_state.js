const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://postgres:dinara2002@localhost:5432/school_road_safety_db',
});

async function resetToAuthenticZeroState() {
  console.log('Resetting all 10,110 schools to authentic unassessed starting state (0 ball)...');

  // 1. Reset all schools current_score to 0, coordinate_status to PENDING
  await pool.query(`
    UPDATE schools 
    SET current_score = 0,
        coordinate_status = 'PENDING',
        updated_at = NOW();
  `);

  // 2. Clear any test assessment records and test evidence
  await pool.query(`DELETE FROM assessments;`);
  await pool.query(`DELETE FROM evidence;`);

  console.log('✅ All fake scores and assessments cleared!');
  console.log('All 10,110 schools now start cleanly with current_score = 0 (Baholanmagan).');

  const check = await pool.query(`
    SELECT COUNT(*) as total_schools, 
           COUNT(*) FILTER (WHERE current_score = 0) as zero_score_count,
           COUNT(*) FILTER (WHERE current_score > 0) as scored_count
    FROM schools;
  `);

  console.log('Database Status Verification:');
  console.log(JSON.stringify(check.rows[0], null, 2));

  await pool.end();
}

resetToAuthenticZeroState().catch(console.error);
