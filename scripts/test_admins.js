async function test() {
  const tests = [
    { email: 'superadmin@yhxx.uz', pass: 'Super@1234' },
    { email: 'superadmin@yhxx.uz', pass: 'Demo@1234' },
    { email: 'admin.bukhara@yhxx.uz', pass: 'Admin@1234' },
    { email: 'admin.bukhara@yhxx.uz', pass: 'Demo@1234' },
    { email: 'admin@yhxx.uz', pass: 'Admin@1234' },
  ];

  for (const t of tests) {
    const res = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: t.email, password: t.pass }),
    });
    const d = await res.json();
    console.log(`Login ${t.email} (${t.pass}) -> Status ${res.status}, Role: ${d.user?.role}`);
  }
}

test().catch(console.error);
