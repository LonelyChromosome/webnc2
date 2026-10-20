const crypto = require("crypto");
const users = require("../services/userDatabase");
async function findUserByUsernameAndPassword(username, password) {
  const user = await users.findByUsername(username);
  if (!user || !user.salt || !user.passwordHash) return null;
  const hash = crypto.scryptSync(String(password || ""), user.salt, 64);
  const expected = Buffer.from(user.passwordHash, "hex");
  return expected.length === hash.length && crypto.timingSafeEqual(hash, expected) ? user : null;
}
module.exports = { findUserByUsernameAndPassword };
