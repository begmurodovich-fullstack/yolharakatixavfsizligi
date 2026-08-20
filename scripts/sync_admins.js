const { Pool } = require('pg');
const pool = new Pool({
  connectionString: 'postgresql://postgres:dinara2002@localhost:5432/school_road_safety_db',
});

async function syncAdmins() {
  console.log('Syncing all admin accounts into PostgreSQL...');

  const admins = [
    {
      id: 'usr-super-admin',
      email: 'superadmin@yhxx.uz',
      password: 'Super@1234',
      name: 'Bosh Administrator (IIV YHXX)',
      role: 'SUPER_ADMIN',
      regionId: null,
      districtId: null,
    },
    {
      id: 'usr-admin-bukhara',
      email: 'admin.bukhara@yhxx.uz',
      password: 'Admin@1234',
      name: 'Buxoro viloyati YHXB Boshqarmasi',
      role: 'ADMIN',
      regionId: 'reg-3',
      districtId: 'dist-39',
    },
    {
      id: 'usr-inspector-admin',
      email: 'admin@yhxx.uz',
      password: 'Admin@1234',
      name: 'Hududiy Inspektor (IIV YHXX)',
      role: 'ADMIN',
      regionId: 'reg-3',
      districtId: null,
    },
  ];

  for (const a of admins) {
    await pool.query(
      `INSERT INTO users (id, email, password_hash, name, role, region_id, district_id, is_first_login, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7, FALSE, TRUE)
       ON CONFLICT (id) DO UPDATE 
       SET email = EXCLUDED.email, 
           password_hash = EXCLUDED.password_hash, 
           name = EXCLUDED.name, 
           role = EXCLUDED.role,
           region_id = EXCLUDED.region_id,
           is_first_login = FALSE,
           is_active = TRUE;`,
      [a.id, a.email, a.password, a.name, a.role, a.regionId, a.districtId]
    );
  }

  console.log('✅ Admin accounts successfully synced in PostgreSQL:');
  const res = await pool.query(
    'SELECT id, email, password_hash, name, role FROM users WHERE role IN (\'ADMIN\', \'SUPER_ADMIN\')'
  );
  console.log(JSON.stringify(res.rows, null, 2));

  await pool.end();
}

syncAdmins().catch(console.error);
