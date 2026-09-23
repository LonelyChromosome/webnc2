const fs = require("fs/promises");
const path = require("path");

const DATA_DIR = path.join(__dirname, "..", "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");

async function ensureUsersFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });

  try {
    await fs.access(USERS_FILE);
  } catch {
    await fs.writeFile(USERS_FILE, "[]\n", "utf8");
  }
}

async function readUsers() {
  await ensureUsersFile();

  try {
    const raw = await fs.readFile(USERS_FILE, "utf8");
    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (user) =>
        user &&
        typeof user === "object" &&
        typeof user.username === "string"
    );
  } catch (error) {
    if (error instanceof SyntaxError) {
      await fs.writeFile(USERS_FILE, "[]\n", "utf8");
      return [];
    }

    throw error;
  }
}

async function writeUsers(users) {
  await ensureUsersFile();

  await fs.writeFile(
    USERS_FILE,
    JSON.stringify(users, null, 2) + "\n",
    "utf8"
  );
}

async function findByUsername(username) {
  const normalizedUsername = String(username || "").trim().toLowerCase();

  if (!normalizedUsername) {
    return null;
  }

  const users = await readUsers();

  return (
    users.find(
      (user) =>
        String(user.username || "").trim().toLowerCase() === normalizedUsername
    ) || null
  );
}

async function createUser(user) {
  const users = await readUsers();

  const nextId =
    users.reduce(
      (maxId, item) => Math.max(maxId, Number(item.id) || 0),
      0
    ) + 1;

  const newUser = {
    id: nextId,
    username: String(user.username || "").trim(),
    salt: String(user.salt || ""),
    passwordHash: String(user.passwordHash || "")
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
