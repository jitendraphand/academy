const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const path = require('path');
const db = require('./db');
const { courses, getCourse } = require('./data');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET || 'salon-academy-secret-change-me',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }
}));

app.use((req, res, next) => {
  res.locals.user = null;
  if (req.session.userId) {
    const u = db.prepare('SELECT id, name, email, phone, role, is_demo, created_at FROM users WHERE id = ?').get(req.session.userId);
    if (u) { res.locals.user = u; req.user = u; }
    else delete req.session.userId;
  }
  next();
});

const requireLogin = (req, res, next) => { if (!req.user) return res.redirect('/login'); next(); };
const requireAdmin = (req, res, next) => {
  if (!req.user) return res.redirect('/login');
  if (req.user.role !== 'admin') return res.status(403).send('Admins only. <a href="/dashboard">Back</a>');
  next();
};

function enrollmentsFor(userId) {
  return db.prepare('SELECT course_id FROM enrollments WHERE user_id = ?').all(userId).map(r => r.course_id);
}
function progressFor(userId, courseId) {
  const course = getCourse(courseId);
  if (!course) return { pct: 0, completed: 0, total: 0, rows: [] };
  const rows = db.prepare('SELECT * FROM progress WHERE user_id = ? AND course_id = ?').all(userId, courseId);
  const byIdx = Object.fromEntries(rows.map(r => [r.module_idx, r]));
  let completed = 0;
  rows.forEach(r => { if (r.completed) completed++; });
  return { pct: course.modules.length ? Math.round(completed / course.modules.length * 100) : 0, completed, total: course.modules.length, byIdx, rows };
}
function isUnlocked(userId, courseId, idx) {
  if (idx === 0) return true;
  try {
    const u = db.prepare('SELECT is_demo FROM users WHERE id = ?').get(userId);
    if (u && u.is_demo) return true; // demo users: every module open
  } catch (e) { /* pre-migration DB: fall through to sequential */ }
  const prev = db.prepare('SELECT completed FROM progress WHERE user_id = ? AND course_id = ? AND module_idx = ?').get(userId, courseId, idx - 1);
  return !!(prev && prev.completed);
}
function genCode(prefix) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let s = '';
  for (let i = 0; i < 8; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return (prefix || 'SALON') + '-' + s.slice(0, 4) + '-' + s.slice(4);
}

// ---------- Public ----------
app.get('/', (req, res) => {
  const stats = {
    courses: courses.length,
    modules: courses.reduce((a, c) => a + c.modules.length, 0),
    quizzes: courses.reduce((a, c) => a + c.modules.reduce((x, m) => x + m.quiz.length, 0), 0),
    students: db.prepare("SELECT COUNT(*) c FROM users WHERE role='student'").get().c
  };
  res.render('index', { courses, stats });
});

// ---------- Auth ----------
app.get('/login', (req, res) => {
  if (req.user) return res.redirect(req.user.role === 'admin' ? '/admin' : '/dashboard');
  res.render('login', { error: null });
});
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const u = db.prepare('SELECT * FROM users WHERE email = ?').get((email || '').trim().toLowerCase());
  if (!u || !bcrypt.compareSync(password || '', u.password_hash)) {
    return res.render('login', { error: 'Invalid email or password.' });
  }
  req.session.userId = u.id;
  res.redirect(u.role === 'admin' ? '/admin' : '/dashboard');
});

app.get('/register', (req, res) => {
  if (req.user) return res.redirect('/dashboard');
  res.render('register', { error: null, prefill: { code: req.query.code || '' }, courses });
});
app.post('/register', (req, res) => {
  const { name, email, phone, password, code } = req.body;
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanCode = (code || '').trim().toUpperCase();
  if (!name || !cleanEmail || !password || !cleanCode) {
    return res.render('register', { error: 'All fields + invite code are required.', prefill: req.body, courses });
  }
  if (db.prepare('SELECT id FROM users WHERE email = ?').get(cleanEmail)) {
    return res.render('register', { error: 'Email already registered. Please log in.', prefill: req.body, courses });
  }
  const inv = db.prepare('SELECT * FROM invite_codes WHERE code = ?').get(cleanCode);
  if (!inv || !inv.active) return res.render('register', { error: 'Invalid or deactivated invite code.', prefill: req.body, courses });
  if (inv.expires_at && new Date(inv.expires_at) < new Date()) return res.render('register', { error: 'This invite code has expired.', prefill: req.body, courses });
  if (inv.used_count >= inv.max_uses) return res.render('register', { error: 'This invite code has reached its usage limit.', prefill: req.body, courses });

  const hash = bcrypt.hashSync(password, 10);
  const info = db.prepare('INSERT INTO users (name, email, phone, password_hash, role, is_demo) VALUES (?,?,?,?,?,?)')
    .run(name.trim(), cleanEmail, (phone || '').trim(), hash, 'student', inv.is_demo ? 1 : 0);
  const userId = Number(info.lastInsertRowid);

  const targetCourses = inv.course_id === 'ALL' ? courses.map(c => c.id) : [inv.course_id];
  targetCourses.forEach(cid => {
    db.prepare('INSERT OR IGNORE INTO enrollments (user_id, course_id, granted_by) VALUES (?,?,?)').run(userId, cid, inv.created_by || null);
  });
  db.prepare('UPDATE invite_codes SET used_count = used_count + 1 WHERE id = ?').run(inv.id);
  db.prepare('INSERT INTO code_redemptions (code_id, user_id) VALUES (?,?)').run(inv.id, userId);

  req.session.userId = userId;
  res.redirect('/dashboard');
});

app.get('/logout', (req, res) => { req.session.destroy(() => res.redirect('/')); });

// ---------- Student ----------
app.get('/dashboard', requireLogin, (req, res) => {
  if (req.user.role === 'admin') return res.redirect('/admin');
  const enrolled = enrollmentsFor(req.user.id);
  const cards = enrolled.map(cid => {
    const course = getCourse(cid);
    if (!course) return null;
    const p = progressFor(req.user.id, cid);
    return { course, progress: p };
  }).filter(Boolean);
  res.render('dashboard', { cards, enrolled, courses });
});

app.get('/course/:id', requireLogin, (req, res) => {
  const course = getCourse(req.params.id);
  if (!course) return res.status(404).send('Course not found');
  const enrolled = enrollmentsFor(req.user.id);
  if (req.user.role !== 'admin' && !enrolled.includes(course.id)) return res.status(403).send('No access. Ask admin to grant this course. <a href="/dashboard">Back</a>');
  const p = req.user.role === 'admin' ? { pct: 0, byIdx: {} } : progressFor(req.user.id, course.id);
  const unlocks = course.modules.map((_, i) => req.user.role === 'admin' ? true : isUnlocked(req.user.id, course.id, i));
  res.render('course', { course, progress: p, unlocks });
});

app.get('/course/:id/module/:idx', requireLogin, (req, res) => {
  const course = getCourse(req.params.id);
  if (!course) return res.status(404).send('Course not found');
  const idx = parseInt(req.params.idx, 10);
  if (isNaN(idx) || idx < 0 || idx >= course.modules.length) return res.status(404).send('Module not found');
  const enrolled = enrollmentsFor(req.user.id);
  if (req.user.role !== 'admin' && !enrolled.includes(course.id)) return res.status(403).send('No access.');
  if (req.user.role !== 'admin' && !isUnlocked(req.user.id, course.id, idx)) return res.status(403).send('Complete the previous module first. <a href="/course/' + course.id + '">Back</a>');
  const mod = course.modules[idx];
  let prow = req.user.role === 'admin' ? null : db.prepare('SELECT * FROM progress WHERE user_id=? AND course_id=? AND module_idx=?').get(req.user.id, course.id, idx);
  const questions = mod.quiz.concat(mod.quizMore || []);
  res.render('module', { course, mod, idx, total: course.modules.length, prow, questions });
});

// APIs (student)
app.post('/api/lesson-done', requireLogin, (req, res) => {
  const { courseId, idx } = req.body;
  const course = getCourse(courseId);
  if (!course || idx == null || idx < 0 || idx >= course.modules.length) return res.json({ ok: false });
  db.prepare(`INSERT INTO progress (user_id, course_id, module_idx, lessons_done, updated_at)
    VALUES (?,?,?,1,datetime('now'))
    ON CONFLICT(user_id, course_id, module_idx) DO UPDATE SET lessons_done=1, updated_at=datetime('now')`)
    .run(req.user.id, courseId, idx);
  checkComplete(req.user.id, courseId, idx);
  res.json({ ok: true });
});

app.post('/api/quiz', requireLogin, (req, res) => {
  const { courseId, idx, answers } = req.body;
  const course = getCourse(courseId);
  if (!course) return res.json({ ok: false });
  const mod = course.modules[idx];
  if (!mod) return res.json({ ok: false });
  const questions = mod.quiz.concat(mod.quizMore || []);
  let score = 0;
  questions.forEach((q, i) => { if (answers && parseInt(answers[i], 10) === q.answer) score++; });
  const total = questions.length;
  const passMark = mod.passMark || 0.6;
  const passed = score / total >= passMark;
  db.prepare(`INSERT INTO progress (user_id, course_id, module_idx, quiz_best, quiz_total, quiz_passed, updated_at)
    VALUES (?,?,?, ?,?, ?, datetime('now'))
    ON CONFLICT(user_id, course_id, module_idx) DO UPDATE SET
      quiz_best = max(COALESCE(quiz_best,0), excluded.quiz_best),
      quiz_total = excluded.quiz_total,
      quiz_passed = max(quiz_passed, excluded.quiz_passed),
      updated_at=datetime('now')`)
    .run(req.user.id, courseId, idx, score, total, passed ? 1 : 0);
  checkComplete(req.user.id, courseId, idx);
  res.json({ ok: true, score, total, passed, passMark, explanations: questions.map(q => q.explain) });
});

app.post('/api/practical', requireLogin, (req, res) => {
  const { courseId, idx, notes } = req.body;
  const course = getCourse(courseId);
  if (!course || !course.modules[idx]) return res.json({ ok: false });
  db.prepare(`INSERT INTO progress (user_id, course_id, module_idx, practical_notes, practical_done, updated_at)
    VALUES (?,?,?, ?,1, datetime('now'))
    ON CONFLICT(user_id, course_id, module_idx) DO UPDATE SET practical_notes=excluded.practical_notes, practical_done=1, updated_at=datetime('now')`)
    .run(req.user.id, courseId, idx, (notes || '').slice(0, 4000));
  checkComplete(req.user.id, courseId, idx);
  res.json({ ok: true });
});

function checkComplete(userId, courseId, idx) {
  const r = db.prepare('SELECT * FROM progress WHERE user_id=? AND course_id=? AND module_idx=?').get(userId, courseId, idx);
  if (r && r.lessons_done && r.quiz_passed) {
    db.prepare('UPDATE progress SET completed=1 WHERE id=?').run(r.id);
  }
}

// ---------- Admin ----------
app.get('/admin', requireAdmin, (req, res) => {
  const users = db.prepare("SELECT * FROM users ORDER BY created_at DESC LIMIT 200").all();
  const codes = db.prepare('SELECT * FROM invite_codes ORDER BY created_at DESC LIMIT 100').all();
  const enrollments = db.prepare(`SELECT e.*, u.name as uname, u.email as uemail FROM enrollments e JOIN users u ON u.id=e.user_id ORDER BY e.granted_at DESC LIMIT 200`).all();
  const stats = {
    students: db.prepare("SELECT COUNT(*) c FROM users WHERE role='student'").get().c,
    codesActive: db.prepare('SELECT COUNT(*) c FROM invite_codes WHERE active=1').get().c,
    enrollments: db.prepare('SELECT COUNT(*) c FROM enrollments').get().c,
    completed: db.prepare('SELECT COUNT(*) c FROM progress WHERE completed=1').get().c
  };
  // progress overview per user/course
  const overview = users.filter(u => u.role === 'student').slice(0, 50).map(u => {
    const en = enrollmentsFor(u.id);
    const per = en.map(cid => ({ cid, ...(progressFor(u.id, cid)) }));
    return { user: u, per };
  });
  res.render('admin', { users, codes, enrollments, stats, courses, overview, query: req.query });
});

app.post('/admin/code', requireAdmin, (req, res) => {
  const { course_id, max_uses, days, label } = req.body;
  let code = genCode();
  while (db.prepare('SELECT id FROM invite_codes WHERE code=?').get(code)) code = genCode();
  let expires = null;
  if (days && parseInt(days, 10) > 0) {
    const d = new Date(); d.setDate(d.getDate() + parseInt(days, 10));
    expires = d.toISOString();
  }
  db.prepare('INSERT INTO invite_codes (code, course_id, label, max_uses, expires_at, created_by) VALUES (?,?,?,?,?,?)')
    .run(code, course_id || 'ALL', (label || '').slice(0, 80), Math.max(1, parseInt(max_uses, 10) || 1), expires, req.user.id);
  res.redirect('/admin?msg=code');
});

app.post('/admin/code-toggle', requireAdmin, (req, res) => {
  const { id } = req.body;
  const c = db.prepare('SELECT * FROM invite_codes WHERE id=?').get(id);
  if (c) db.prepare('UPDATE invite_codes SET active=? WHERE id=?').run(c.active ? 0 : 1, id);
  res.redirect('/admin');
});

// One-click demo access: code for ALL courses that unlocks every module
app.post('/admin/demo-code', requireAdmin, (req, res) => {
  let code = genCode('DEMO');
  while (db.prepare('SELECT id FROM invite_codes WHERE code=?').get(code)) code = genCode('DEMO');
  db.prepare('INSERT INTO invite_codes (code, course_id, label, max_uses, expires_at, created_by, is_demo) VALUES (?,?,?,?,?,?,1)')
    .run(code, 'ALL', (req.body.label || 'Demo access — all courses, all modules open').slice(0, 80), Math.max(1, parseInt(req.body.max_uses, 10) || 50), null, req.user.id);
  res.redirect('/admin?msg=demo');
});

// Toggle demo (all-modules-open) for any student
app.post('/admin/demo-toggle', requireAdmin, (req, res) => {
  const u = db.prepare('SELECT * FROM users WHERE id=?').get(req.body.user_id);
  if (u && u.role === 'student') db.prepare('UPDATE users SET is_demo=? WHERE id=?').run(u.is_demo ? 0 : 1, u.id);
  res.redirect('/admin?msg=demo-user');
});

app.post('/admin/grant', requireAdmin, (req, res) => {
  const { user_id, course_id } = req.body;
  if (!user_id || !course_id) return res.redirect('/admin');
  const targets = course_id === 'ALL' ? courses.map(c => c.id) : [course_id];
  targets.forEach(cid => {
    db.prepare('INSERT OR IGNORE INTO enrollments (user_id, course_id, granted_by) VALUES (?,?,?)').run(user_id, cid, req.user.id);
  });
  res.redirect('/admin?msg=grant');
});

app.post('/admin/revoke', requireAdmin, (req, res) => {
  const { user_id, course_id } = req.body;
  db.prepare('DELETE FROM enrollments WHERE user_id=? AND course_id=?').run(user_id, course_id);
  res.redirect('/admin?msg=revoke');
});

app.get('/health', (req, res) => res.json({ ok: true }));

app.use((req, res) => res.status(404).send('Not found. <a href="/">Home</a>'));

app.listen(PORT, '0.0.0.0', () => console.log(`[salon-academy] listening on :${PORT}`));
