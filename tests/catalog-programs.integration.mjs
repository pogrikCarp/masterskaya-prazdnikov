import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';

const base = process.env.CATALOG_TEST_URL ?? 'http://localhost:3002';
assert.ok(['localhost', '127.0.0.1'].includes(new URL(base).hostname), 'Integration tests only run against a local server');
const username = process.env.CATALOG_TEST_USERNAME;
const password = process.env.CATALOG_TEST_PASSWORD;
assert.ok(username && password, 'Set CATALOG_TEST_USERNAME and CATALOG_TEST_PASSWORD for the isolated test server');
const login = await fetch(`${base}/api/admin/login`, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username,password})});
assert.equal(login.status, 200);
const cookie = login.headers.get('set-cookie').split(';')[0];
const request = (path, method, data, authenticated = true) => fetch(base+path,{method,headers:{'Content-Type':'application/json',...(authenticated?{cookie}:{})},...(data?{body:JSON.stringify(data)}:{})});

const unauthorized = await request('/api/admin/quests','POST',{name:'Unauthorized'},false);
assert.equal(unauthorized.status,401);
console.log('PASS: admin writes require authentication');

for (const entity of ['quests','shows','master-classes']) {
  const publicRows = await (await fetch(`${base}/api/${entity}`)).json();
  const legacy = publicRows.find(row=>row.name.startsWith('Legacy'));
  assert.ok(legacy, 'Seed the old-schema legacy record before applying the migration');
  assert.deepEqual(legacy.imageUrls, ['/api/uploads/legacy.jpg']);
  assert.equal(legacy.priceFrom,false);
  const path = `/api/admin/${entity}`;
  const photos=['/favicon.png','/apple-icon.png'];
  let id;
  try {
    const created = await request(path,'POST',{name:`Integration ${entity}`,imageUrls:photos,price:5000,priceFrom:true});
    assert.equal(created.status,200);
    const row = await created.json(); id=row.id;
    assert.deepEqual(row.imageUrls,photos); assert.equal(row.imageUrl,photos[0]); assert.equal(row.priceFrom,true);
    const renamed = await (await request(path,'PUT',{id,name:'Updated title',price:5000})).json();
    assert.deepEqual(renamed.imageUrls,photos); assert.equal(renamed.priceFrom,true);
    const reordered = await (await request(path,'PUT',{id,name:'Reordered',price:5000,imageUrls:[...photos].reverse(),priceFrom:false})).json();
    assert.equal(reordered.imageUrl,photos[1]); assert.equal(reordered.priceFrom,false);
    const oldClient = await (await request(path,'PUT',{id,name:'Old client',price:5000,imageUrl:'/new-cover.png'})).json();
    assert.deepEqual(oldClient.imageUrls,[...photos].reverse());
    const cleared = await (await request(path,'PUT',{id,name:'Cleared',price:5000,imageUrls:[]})).json();
    assert.deepEqual(cleared.imageUrls,[]); assert.equal(cleared.imageUrl,null);
    const bad = await request(path,'POST',{name:'Bad input',imageUrls:'not-an-array'});
    assert.equal(bad.status,400);
    console.log(`PASS: ${entity}: migration preservation, create, edit, reorder, price toggle, legacy update, clear, validation`);
  } finally {
    if(id) assert.equal((await request(`${path}?id=${id}`,'DELETE')).status,200);
  }
}

// Use the existing single-file endpoint repeatedly: the admin queues multiple files without changing its contract.
const bytes = await readFile('app/img/logoformpng.png');
const body = new FormData(); body.append('file', new Blob([bytes],{type:'image/png'}),'catalog-test.png');
const upload = await fetch(`${base}/api/admin/upload`,{method:'POST',headers:{cookie},body});
assert.equal(upload.status,200); const {url} = await upload.json();
const image = await fetch(base+url); assert.equal(image.status,200);
assert.equal((await image.arrayBuffer()).byteLength,bytes.length);
if(process.env.CATALOG_TEST_UPLOAD_MANIFEST) await writeFile(process.env.CATALOG_TEST_UPLOAD_MANIFEST,JSON.stringify([url]));
console.log('PASS: upload and immediate retrieval of the full image');
