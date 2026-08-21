const { Client } = require('pg');

async function checkAndFix() {
  const client = new Client({
    connectionString: 'postgresql://neondb_owner:npg_KyZTrp7XQ8xl@ep-spring-snow-azgi3kt1.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 30000,
    query_timeout: 60000,
  });

  console.log('Connecting to Neon...');
  await client.connect();
  console.log('Connected!');

  // Check current state
  const before = await client.query(`
    SELECT coordinate_status, COUNT(*) as count
    FROM schools
    GROUP BY coordinate_status
    ORDER BY count DESC;
  `);
  console.log('BEFORE cleanup:');
  before.rows.forEach(r => console.log(` ${r.coordinate_status}: ${r.count} ta maktab`));

  const withCoords = await client.query(`
    SELECT COUNT(*) as count FROM schools WHERE latitude IS NOT NULL;
  `);
  console.log('Schools with non-null latitude:', withCoords.rows[0].count);

  // FIX: Set ALL to NOT_SUBMITTED and clear latitude/longitude
  console.log('\nFixing all schools to NOT_SUBMITTED...');
  const updateResult = await client.query(`
    UPDATE schools 
    SET coordinate_status = 'NOT_SUBMITTED',
        latitude = NULL,
        longitude = NULL,
        address_notes = NULL,
        updated_at = NOW();
  `);
  console.log('Updated rows:', updateResult.rowCount);

  // Also wipe assessments, evidence, audit_logs
  await client.query('DELETE FROM assessments;');
  await client.query('DELETE FROM evidence;');
  await client.query('DELETE FROM audit_logs;');
  console.log('Cleared assessments, evidence, audit_logs');

  // Verify after
  const after = await client.query(`
    SELECT coordinate_status, COUNT(*) as count
    FROM schools
    GROUP BY coordinate_status
    ORDER BY count DESC;
  `);
  console.log('\nAFTER cleanup:');
  after.rows.forEach(r => console.log(` ${r.coordinate_status}: ${r.count} ta maktab`));

  await client.end();
  console.log('\nDone!');
}

checkAndFix().catch(err => {
  console.error('FATAL ERROR:', err.message);
  process.exit(1);
});
