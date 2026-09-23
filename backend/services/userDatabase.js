const fs = require("fs/promises");
const path = require("path");

const USERS_FILE = path.join(__dirname, "..", "data", "users.json");

async function readUsers() {
  try {
    const raw = await fs.readFile(USERS_FILE, "utf8");
    const users = JSON.parse(raw);
    return Array.isArray(users) ? users : [];
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.writeFile(USERS_FILE, "[]\n", "utf8");
      return [];
    }
    throw error;
  }
}

async function writeUsers(users) {
  await fs.writeFile(
    USERS_FILE,
    JSON.stringify(users, null, 2) + "\n",
    "utf8"
  );
}

async function findByUsername(username) {
  const users = await readUsers();
  return users.find(
    (user) => user.username.toLowerCase() === String(username).toLowerCase()
  ) || null;
}

async function createUser(user) {
  const users = await readUsers();
  const nextId = users.reduce(
    (maxId, item) => Math.max(maxId, Number(item.id) || 0),
    0
  ) + 1;

  const newUser = {
    id: nextId,
    ...user
  };

  users.push(newUser);
  await writeUsers(users);
  return newUser;
}

module.exports = {
  readUsers,
  findByUsername,
  createUser
};
