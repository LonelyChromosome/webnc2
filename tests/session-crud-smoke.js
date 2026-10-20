// Integration smoke: run against a disposable CI checkout and its localhost:3000 server.
const assert = require("node:assert/strict");
const base = "http://localhost:3000";
async function request(path, options = {}) {
  const response = await fetch(base + path, options);
  const body = await response.json().catch(() => null);
  return { response, body };
}
async function main() {
  const username = "ci_lab_" + Date.now();
  const password = "ci-password-123";
  const createdUser = await fetch(base + "/users/create", {
    method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ username, password })
  });
  assert.equal(createdUser.status, 200, "Existing EJS create-user route must work");
  const denied = await request("/api/posts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: "x", description: "y" }) });
  assert.equal(denied.response.status, 401, "Unauthenticated writes must be rejected");
  const login = await request("/api/auth/login", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  assert.equal(login.response.status, 200);
  assert.equal(login.body.success, true);
  const cookie = login.response.headers.get("set-cookie")?.split(";")[0];
  assert.ok(cookie?.startsWith("connect.sid="), "Login must return cookie");
  const headers = { Cookie: cookie, "Content-Type": "application/json" };
  const me = await request("/api/auth/me", { headers });
  assert.equal(me.body.user.username, username);
  const create = await request("/api/posts", { method: "POST", headers, body: JSON.stringify({ title: "CI lab news", description: "Created by API" }) });
  assert.equal(create.response.status, 201);
  const id = create.body.data.id;
  const list = await request("/api/posts");
  assert.ok(list.body.data.some(post => post.id === id));
  const single = await request("/api/posts/" + id);
  assert.equal(single.body.data.id, id);
  const search = await request("/api/posts/search?keyword=ci%20lab");
  assert.ok(search.body.data.some(post => post.id === id));
  const update = await request("/api/posts/" + id, { method: "PUT", headers, body: JSON.stringify({ title: "CI updated", description: "Updated by API" }) });
  assert.equal(update.body.success, true);
  const remove = await request("/api/posts/" + id, { method: "DELETE", headers });
  assert.equal(remove.body.success, true);
  const missing = await request("/api/posts/" + id);
  assert.equal(missing.response.status, 404);
  const logout = await request("/api/auth/logout", { method: "POST", headers });
  assert.equal(logout.body.success, true);
  const after = await request("/api/auth/me", { headers });
  assert.equal(after.response.status, 401);
  console.log("Session + CRUD integration smoke passed");
}
main().catch(error => { console.error(error); process.exit(1); });
