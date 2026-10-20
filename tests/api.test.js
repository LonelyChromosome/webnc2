const { test } = require("node:test");
const assert = require("node:assert/strict");
const app = require("../backend/app");
test("Existing Express application and both Lab 11 route modules load", () => {
  assert.equal(typeof app, "function");
  assert.equal(typeof require("../backend/routes/api/postApiRoute"), "function");
  assert.equal(typeof require("../backend/routes/api/authApiRoute"), "function");
});
test("Post model exposes CRUD interface", () => {
  const model = require("../backend/models/postModel");
  for (const name of ["getAllPosts","getPostById","searchPosts","createPost","updatePost","deletePost"]) assert.equal(typeof model[name], "function");
});
