const { Pool } = require('pg');
const pool = new Pool({
  connectionString: 'postgresql://postgres:dinara2002@localhost:5432/school_road_safety_db',
});

async function runTest() {
  // 1. Reset user 1684 to first login state
  await pool.query(`
    UPDATE users 
    SET password_hash = 'Maktab@24', is_first_login = TRUE 
    WHERE id = 'usr-sch-1684';
  `);
  console.log('1. Reset usr-sch-1684 to initial state: is_first_login = TRUE');

  // 2. Test Login
  const loginRes = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'maktab_24_gijduvon@maktab.uz', password: 'Maktab@24' }),
  });
  const loginData = await loginRes.json();
  console.log('2. Login Response Status:', loginRes.status);
  console.log('   User isFirstLogin:', loginData.user.isFirstLogin);
  console.log('   School Name:', loginData.school.name, '-', loginData.school.districtName);

  // 3. Test Onboarding Submit
  const onbRes = await fetch('http://localhost:3000/api/auth/onboarding', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: loginData.user.id,
      schoolId: loginData.school.id,
      newPassword: 'YangiGijduvonParol#2026',
      directorName: 'Ergashev Jamshid Anvarovich',
      studentCount: 920,
      latitude: 40.1032,
      longitude: 64.6756,
      addressNotes: 'Gijduvon markaziy kochasi 24-maktab darvozasi',
    }),
  });
  const onbData = await onbRes.json();
  console.log('3. Onboarding Status:', onbRes.status);
  console.log('   Success:', onbData.success);
  console.log('   New isFirstLogin:', onbData.user.isFirstLogin);

  // 4. Test Fetch School by ID from PostgreSQL
  const schoolRes = await fetch('http://localhost:3000/api/schools/sch-1684');
  const schoolData = await schoolRes.json();
  console.log('4. School by ID from PostgreSQL:');
  console.log('   Name:', schoolData.name);
  console.log('   Director:', schoolData.directorName);
  console.log('   Students:', schoolData.studentCount);
  console.log('   Coordinates:', schoolData.coordinates);

  await pool.end();
}

runTest().catch((e) => {
  console.error('Test error:', e);
  process.exit(1);
});
