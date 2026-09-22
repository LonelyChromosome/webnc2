const fs = require("fs/promises");
const path = require("path");

const DB_FILE = path.join(__dirname, "..", "data", "db.json");

async function readPosts() {
  const raw = await fs.readFile(DB_FILE, "utf8");
  const posts = JSON.parse(raw);
  return Array.isArray(posts) ? posts : [];
}

async function writePosts(posts) {
  await fs.writeFile(DB_FILE, JSON.stringify(posts, null, 2) + "\n", "utf8");
}

async function getLatest(limit = 10) {
  const posts = await readPosts();
  return posts
    .slice()
    .sort((a, b) => Number(b.id) - Number(a.id))
    .slice(0, limit);
}

async function findById(id) {
  const posts = await readPosts();
  return posts.find((post) => String(post.id) === String(id)) || null;
}

async function search(keyword) {
  const normalized = String(keyword || "").trim().toLowerCase();
  if (!normalized) return [];

  const posts = await readPosts();
  return posts.filter((post) => {
    const title = String(post.title || "").toLowerCase();
    const description = String(post.description || "").toLowerCase();
    return title.includes(normalized) || description.includes(normalized);
  });
}

async function createPost(title, description) {
  const posts = await readPosts();
  const nextId = posts.reduce(
    (maxId, post) => Math.max(maxId, Number(post.id) || 0),
    0
  ) + 1;

  const post = {
    id: nextId,
    title: String(title || ""),
    description: String(description || "")
  };

  posts.push(post);
  await writePosts(posts);
  return post;
}

async function updatePost(id, title, description) {
  const posts = await readPosts();
  const index = posts.findIndex((post) => String(post.id) === String(id));

  if (index === -1) return null;

  posts[index] = {
    ...posts[index],
    title: String(title || ""),
    description: String(description || "")
  };

  await writePosts(posts);
  return posts[index];
}

async function deletePost(id) {
  const posts = await readPosts();
  const filtered = posts.filter((post) => String(post.id) !== String(id));

  if (filtered.length === posts.length) return false;

  await writePosts(filtered);
  return true;
}

module.exports = {
  readPosts,
  getLatest,
  findById,
  search,
  createPost,
  updatePost,
  deletePost
};
