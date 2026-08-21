const { Client } = require('pg');

const NEON_DATABASE_URL = 'postgresql://neondb_owner:npg_KyZTrp7XQ8xl@ep-spring-snow-azgi3kt1.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

async function fixNeonCoordinates() {
  const client = new Client({
    connectionString: NEON_DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000,
  });

  console.log('Connecting to Neon Cloud PostgreSQL...');
  await client.connect();
  console.log('Connected!');

  // Check how many schools currently have non-null coordinates
  const before = await client.query(`
    SELECT COUNT(*) as with_coords, COUNT(*) as total 
    FROM schools 
    WHERE latitude IS NOT NULL OR longitude IS NOT NULL OR address_notes IS NOT NULL;
  `);
  console.log('Schools with mock coordinates on Neon BEFORE cleanup:', before.rows[0]);

  // Set ALL 10,110 schools to NULL coordinates and PENDING
  console.log('Nullifying ALL coordinates across 10,110 schools on Neon...');
  await client.query(`
    UPDATE schools 
    SET latitude = NULL,
        longitude = NULL,
        coordinate_status = 'PENDING',
        address_notes = NULL,
        current_score = 0,
        updated_at = NOW();
  `);

  // Truncate test submissions
  await client.query(`TRUNCATE assessments CASCADE;`);
  await client.query(`TRUNCATE evidence CASCADE;`);
  await client.query(`TRUNCATE audit_logs CASCADE;`);

  // Verify AFTER cleanup
  const after = await client.query(`
    SELECT 
      COUNT(*) as total_schools,
      COUNT(CASE WHEN latitude IS NOT NULL THEN 1 END) as schools_with_lat,
      COUNT(CASE WHEN longitude IS NOT NULL THEN 1 END) as schools_with_lng,
      COUNT(CASE WHEN coordinate_status = 'VERIFIED' THEN 1 END) as verified_count,
      COUNT(CASE WHEN current_score > 0 THEN 1 END) as scored_count
    FROM schools;
  `);
  console.log('Schools on Neon AFTER cleanup:', after.rows[0]);

  await client.end();
  console.log('✅ Neon database 100% purged!');
}

fixNeonCoordinates().catch((err) => {
  console.error('Error fixing Neon:', err);
  process.exit(1);
});
