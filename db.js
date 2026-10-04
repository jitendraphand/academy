// Trainer-only database — single login for classroom projection.
// Zero-native-dep SQLite via Node's built-in node:sqlite (Node 22.5+).
const { DatabaseSync } = require('node:sqlite');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'data', 'academy.db');
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

const db = new DatabaseSync(DB_PATH);
db.exec(`PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;`);

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT DEFAULT '',
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'trainer',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
`);

function ensureTrainer() {
  const email = (process.env.ADMIN_EMAIL || 'admin@salon.academy').trim().toLowerCase();
  const pass = process.env.ADMIN_PASSWORD || 'admin123';
  const existing = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!existing) {
    const hash = bcrypt.hashSync(pass, 10);
    db.prepare(`INSERT INTO users (name, email, phone, password_hash, role) VALUES (?,?,?,?,?)`)
      .run('Trainer', email, '', hash, 'admin');
    console.log(`[db] Trainer login created: ${email}`);
  } else {
    if (existing.role !== 'admin') {
      db.prepare('UPDATE users SET role = ? WHERE id = ?').run('admin', existing.id);
    }
  }
}
ensureTrainer();

module.exports = db;
