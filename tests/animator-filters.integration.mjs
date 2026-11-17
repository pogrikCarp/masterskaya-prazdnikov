import assert from "node:assert/strict";

const base = process.env.CATALOG_TEST_URL ?? "http://127.0.0.1:3002";
assert.ok(["localhost", "127.0.0.1"].includes(new URL(base).hostname), "Run against the isolated local database only");
const login = await fetch(`${base}/api/admin/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ username: process.env.CATALOG_TEST_USERNAME, password: process.env.CATALOG_TEST_PASSWORD }),
});
assert.equal(login.status, 200);
const cookie = login.headers.get("set-cookie").split(";")[0];
const request = (path, method = "GET", body, authorized = true) => fetch(base + path, {
  method,
  headers: { "Content-Type": "application/json", ...(authorized ? { cookie } : {}) },
  ...(body ? { body: JSON.stringify(body) } : {}),
});
const created = [];
try {
  assert.equal((await request("/api/admin/animators", "POST", { name: "Forbidden" }, false)).status, 401);
  for (const [audience, ageGroups] of [[undefined, undefined], ["BOYS", ["AGE_4_8"]], ["GIRLS", ["UP_TO_3", "AGE_9_PLUS"]]]) {
    const payload = {
      name: `Filter integration ${audience ?? "default"}`,
      description: "Keep this description", imageUrl: "/favicon.png", pricePerHour: 5500,
      audience, ageGroups, popular: true,
    };
    const response = await request("/api/admin/animators", "POST", payload);
    assert.equal(response.status, 200);
    const row = await response.json();
    created.push(row);
    assert.equal(row.audience, audience ?? "UNIVERSAL");
    assert.deepEqual(row.ageGroups, ageGroups ?? []);
  }
  const selectedIds = async query => (await (await request(`/api/animators?${query}`)).json()).map(row => row.id).filter(id => created.some(row => row.id === id));
  assert.deepEqual((await selectedIds("audience=UNIVERSAL")).sort(), [created[0].id]);
  assert.deepEqual((await selectedIds("audience=BOYS")).sort(), [created[0].id, created[1].id].sort());
  assert.deepEqual((await selectedIds("audience=GIRLS")).sort(), [created[0].id, created[2].id].sort());
  assert.deepEqual(await selectedIds("audience=BOYS&age=AGE_4_8"), [created[1].id]);
  assert.deepEqual(await selectedIds("audience=BOYS&age=UP_TO_3"), []);
  assert.equal((await request("/api/animators?audience=UNKNOWN")).status, 400);
  assert.equal((await request("/api/animators?age=UNKNOWN")).status, 400);

  const edited = await request("/api/admin/animators", "PUT", { id: created[1].id, pricePerHour: 6500 });
  assert.equal(edited.status, 200);
  const preserved = await edited.json();
  assert.equal(preserved.audience, "BOYS");
  assert.deepEqual(preserved.ageGroups, ["AGE_4_8"]);
  assert.equal(preserved.description, created[1].description);
  assert.equal(preserved.imageUrl, created[1].imageUrl);
  assert.equal(preserved.popular, true);

  for (const badFields of [{ audience: "UNKNOWN" }, { ageGroups: "AGE_4_8" }, { ageGroups: ["UNKNOWN"] }]) {
    assert.equal((await request("/api/admin/animators", "PUT", { id: created[1].id, ...badFields })).status, 400);
  }
  const cleared = await (await request("/api/admin/animators", "PUT", { id: created[1].id, audience: "UNIVERSAL", ageGroups: [] })).json();
  assert.equal(cleared.audience, "UNIVERSAL");
  assert.deepEqual(cleared.ageGroups, []);
  assert.equal((await request(`/animators/${created[0].id}`)).status, 200);
  await request("/api/admin/animators", "PUT", { id: created[0].id, active: false });
  assert.equal((await request(`/animators/${created[0].id}`)).status, 404);
  console.log("PASS: audience defaults, age combinations, universal inclusion, partial edits, invalid inputs, authentication and active-only details");
} finally {
  for (const row of created) {
    assert.equal((await request(`/api/admin/animators?id=${row.id}`, "DELETE")).status, 200);
  }
}
