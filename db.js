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
  role TEXT NOT NULL DEFAULT 'student',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS invite_codes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT NOT NULL UNIQUE,
  course_id TEXT NOT NULL DEFAULT 'ALL',
  label TEXT DEFAULT '',
  max_uses INTEGER NOT NULL DEFAULT 1,
  used_count INTEGER NOT NULL DEFAULT 0,
  expires_at TEXT,
  active INTEGER NOT NULL DEFAULT 1,
  created_by INTEGER,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS enrollments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  course_id TEXT NOT NULL,
  granted_by INTEGER,
  granted_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(user_id, course_id),
  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS progress (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  course_id TEXT NOT NULL,
  module_idx INTEGER NOT NULL,
  lessons_done INTEGER NOT NULL DEFAULT 0,
  quiz_best INTEGER,
  quiz_total INTEGER,
  quiz_passed INTEGER NOT NULL DEFAULT 0,
  practical_notes TEXT DEFAULT '',
  practical_done INTEGER NOT NULL DEFAULT 0,
  completed INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(user_id, course_id, module_idx),
  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS code_redemptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  redeemed_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY(code_id) REFERENCES invite_codes(id) ON DELETE CASCADE,
  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);
`);

function ensureAdmin() {
  const email = process.env.ADMIN_EMAIL || 'admin@salon.academy';
  const pass = process.env.ADMIN_PASSWORD || 'admin123';
  const existing = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!existing) {
    const hash = bcrypt.hashSync(pass, 10);
    db.prepare(`INSERT INTO users (name, email, phone, password_hash, role) VALUES (?,?,?,?,?)`)
      .run('Administrator', email, '', hash, 'admin');
    console.log(`[db] Default admin created: ${email} / ${pass}`);
  } else if (existing.role !== 'admin') {
    db.prepare('UPDATE users SET role = ? WHERE id = ?').run('admin', existing.id);
  }
}
ensureAdmin();

// Lightweight migrations for existing DBs (ignore "duplicate column" errors)
function migrate(sql) {
  try { db.exec(sql); } catch (e) {
    if (!/duplicate column/i.test(e.message || '')) throw e;
  }
}
migrate(`ALTER TABLE users ADD COLUMN is_demo INTEGER NOT NULL DEFAULT 0;`);
migrate(`ALTER TABLE invite_codes ADD COLUMN is_demo INTEGER NOT NULL DEFAULT 0;`);

module.exports = db;
