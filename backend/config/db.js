const mysql = require("mysql2/promise");

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = Number(process.env.DB_PORT || 3306);
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_NAME = process.env.DB_NAME || "newsdb";

if (!/^[a-zA-Z0-9_]+$/.test(DB_NAME)) {
  throw new Error("DB_NAME khong hop le");
}

const db = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
});

async function initDatabase() {
  const connection = await mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD
  });

  try {
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`
       CHARACTER SET utf8mb4
       COLLATE utf8mb4_unicode_ci`
    );

    await connection.query(`USE \`${DB_NAME}\``);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        description TEXT
      )
    `);
  } finally {
    await connection.end();
  }

  await db.query("SELECT 1");
}

module.exports = {
  db,
  initDatabase
};
