// Script: fix_duplicate_navoiy.js
// Navoiy viloyatining takrorlanishini DB dan tuzatish

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_KyZTrp7XQ8xl@ep-spring-snow-azgi3kt1.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
  ssl: { rejectUnauthorized: false },
});

async function fixDuplicateNavoiy() {
  const client = await pool.connect();
  try {
    // 1. Barcha regionlarni ko'rish
    console.log('=== Barcha regionlar ===');
    const allRegions = await client.query("SELECT id, name FROM regions ORDER BY name");
    allRegions.rows.forEach(r => console.log(`  id=${r.id}  name="${r.name}"`));

    // 2. Navoiy viloyati takrorlanganlarini topish
    const dups = await client.query(`
      SELECT id, name FROM regions
      WHERE LOWER(name) LIKE '%navoiy%'
      ORDER BY id
    `);
    console.log('\n=== Navoiy takrorlanishlari ===');
    dups.rows.forEach(r => console.log(`  id=${r.id}  name="${r.name}"`));

    if (dups.rows.length <= 1) {
      console.log('Takrorlanish topilmadi.');
      return;
    }

    // 3. Eng kichik ID ni asosiy qilib qoldiramiz, qolganlarini o'chiramiz
    const keepId = dups.rows[0].id;
    const removeIds = dups.rows.slice(1).map(r => r.id);
    
    console.log(`\nAsosiy ID: ${keepId}`);
    console.log(`O'chiriladigan IDlar: ${removeIds}`);

    // 4. O'chiriladigan region IDlar bilan bog'liq maktab/tuman larni asosiy ga o'tkazish
    for (const removeId of removeIds) {
      // Maktablarni yangilash
      const schoolResult = await client.query(
        `UPDATE schools SET region_id = $1 WHERE region_id = $2`,
        [keepId, removeId]
      );
      console.log(`  schools: ${schoolResult.rowCount} ta yangilandi`);

      // Tumanlarni yangilash
      const distResult = await client.query(
        `UPDATE districts SET region_id = $1 WHERE region_id = $2`,
        [keepId, removeId]
      );
      console.log(`  districts: ${distResult.rowCount} ta yangilandi`);

      // Usersni yangilash
      const userResult = await client.query(
        `UPDATE users SET region_id = $1 WHERE region_id = $2`,
        [keepId, removeId]
      );
      console.log(`  users: ${userResult.rowCount} ta yangilandi`);

      // Takror regionni o'chirish
      await client.query(`DELETE FROM regions WHERE id = $1`, [removeId]);
      console.log(`  regions: id=${removeId} o'chirildi`);
    }

    // 5. Natijani ko'rish
    console.log('\n=== Yangilangan regionlar ===');
    const updated = await client.query("SELECT id, name FROM regions ORDER BY name");
    updated.rows.forEach(r => console.log(`  id=${r.id}  name="${r.name}"`));

    console.log('\n✅ Muvaffaqiyatli tuzatildi!');
  } catch (err) {
    console.error('Xatolik:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

fixDuplicateNavoiy();
