const fs = require('fs');
const path = require('path');

async function testUpload() {
  // Create a sample 1x1 png buffer for testing upload
  const samplePngBuffer = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    'base64'
  );

  const blob = new Blob([samplePngBuffer], { type: 'image/png' });
  const formData = new FormData();
  formData.append('file', blob, 'test_zebra.png');
  formData.append('schoolId', 'sch-1684');
  formData.append('questionId', 'q1_1');
  formData.append('caption', '24-maktab oldidagi sinov piyodalar o‘tish joyi rasmi');

  const res = await fetch('http://localhost:3000/api/evidence/upload', {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();
  console.log('Upload API Response:', JSON.stringify(data, null, 2));

  // Verify file exists on disk
  if (data.evidence?.imageUrl) {
    const localPath = path.join(__dirname, '..', 'public', data.evidence.imageUrl);
    console.log('File on disk exists:', fs.existsSync(localPath));
  }
}

testUpload().catch(console.error);
