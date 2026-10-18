const { Pool } = require('pg');
const pool = new Pool({ connectionString: 'postgresql://neondb_owner:npg_KyZTrp7XQ8xl@ep-spring-snow-azgi3kt1.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require' });

async function check() {
  const assess = await pool.query(`
    SELECT a.*, s.name, s.current_score 
    FROM assessments a 
    JOIN schools s ON a.school_id = s.id 
    WHERE a.school_id = 'sch-3837'
  `);
  console.log('Assessments for sch-3837:', assess.rows);
  await pool.end();
}
check().catch(console.error);
