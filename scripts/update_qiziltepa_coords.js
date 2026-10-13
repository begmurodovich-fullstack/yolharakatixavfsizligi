const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_KyZTrp7XQ8xl@ep-spring-snow-azgi3kt1.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require'
});

const updates = [
  {
    id: 'sch-3848',
    name: '35-maktab',
    latitude: 40.160165,
    longitude: 64.890152,
    address_notes: 'Asosiy kirish darvozasi'
  },
  {
    id: 'sch-3837',
    name: '24-maktab',
    latitude: 40.15813,
    longitude: 64.905322,
    address_notes: 'Asosiy kirish darvozasi'
  },
  {
    id: 'sch-3841',
    name: '28-maktab',
    latitude: 40.190709,
    longitude: 64.901004,
    address_notes: "Toshrabotdan Nurafshon MFY ga kelishda o'ng qo'lda"
  },
  {
    id: 'sch-3836',
    name: '23-maktab',
    latitude: 40.1032,
    longitude: 64.6756,
    address_notes: 'Asosiy kirish darvozasi'
  },
  {
    id: 'sch-3838',
    name: '25-maktab',
    latitude: 40.1032,
    longitude: 64.6756,
    address_notes: 'Asosiy kirish darvozasi'
  },
  {
    id: 'sch-3842',
    name: '29-maktab',
    latitude: 40.103789,
    longitude: 64.675299,
    address_notes: 'Asosiy kirish darvozasi'
  },
  {
    id: 'sch-3855',
    name: '43-maktab',
    latitude: 39.95574,
    longitude: 64.66615,
    address_notes: 'Asosiy kirish darvozasi'
  }
];

async function main() {
  console.log('Updating school coordinates based on verified screenshot data...');
  for (const item of updates) {
    const res = await pool.query(
      `UPDATE schools 
       SET latitude = $1, 
           longitude = $2, 
           address_notes = $3, 
           coordinate_status = 'VERIFIED', 
           updated_at = NOW() 
       WHERE id = $4 
       RETURNING id, name, latitude, longitude, address_notes, coordinate_status`,
      [item.latitude, item.longitude, item.address_notes, item.id]
    );
    console.log('✓ Successfully updated:', res.rows[0]);
  }
  await pool.end();
  console.log('All 7 schools successfully updated and verified!');
}

main().catch((err) => {
  console.error('Update error:', err);
  process.exit(1);
});
