const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const path = require('path');
const db = require('./db');
const { courses, getCourse } = require('./content');
const { INTERNATIONAL_STANDARDS, COURSE_STANDARDS, SAFETY_GOLDEN_RULES, CLASSROOM_FLOW } = require('./content/standards');
const { toClassroom } = require('./content/trainer');

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

// Single profile: trainer only. res.locals.user is the trainer or null.
app.use((req, res, next) => {
  res.locals.user = null;
  if (req.session.userId) {
    const u = db.prepare('SELECT id, name, email, role, created_at FROM users WHERE id = ?').get(req.session.userId);
    if (u) { res.locals.user = u; req.user = u; }
    else delete req.session.userId;
  }
  next();
});

const requireTrainer = (req, res, next) => {
  if (!req.user) return res.redirect('/login');
  if (req.user.role !== 'admin') {
    req.session.destroy(() => res.redirect('/login'));
    return;
  }
  next();
};

// ---------- Public landing (projector-friendly catalogue) ----------
app.get('/', (req, res) => {
  const stats = {
    courses: courses.length,
    modules: courses.reduce((a, c) => a + c.modules.length, 0),
    quizzes: courses.reduce((a, c) => a + c.modules.reduce((x, m) => x + m.quiz.length + (m.quizMore || []).length, 0), 0),
    standards: INTERNATIONAL_STANDARDS.length,
  };
  res.render('index', { courses, stats, standards: INTERNATIONAL_STANDARDS, courseStandards: COURSE_STANDARDS });
});

// ---------- Trainer auth (single login) ----------
app.get('/login', (req, res) => {
  if (req.user) return res.redirect('/dashboard');
  res.render('login', { error: null });
});
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const u = db.prepare('SELECT * FROM users WHERE email = ?').get((email || '').trim().toLowerCase());
  if (!u || !bcrypt.compareSync(password || '', u.password_hash)) {
    return res.render('login', { error: 'Invalid trainer email or password.' });
  }
  req.session.userId = u.id;
  res.redirect('/dashboard');
});

app.get('/logout', (req, res) => { req.session.destroy(() => res.redirect('/')); });

// Legacy: /register no longer exists (trainer-only). Redirect to login.
app.get('/register', (req, res) => res.redirect('/login'));
app.post('/register', (req, res) => res.status(410).send('Student registration removed — trainer-only mode. <a href="/login">Trainer login</a>'));

// ---------- Trainer library (all courses, all modules open) ----------
app.get('/dashboard', requireTrainer, (req, res) => {
  res.render('dashboard', { courses, courseStandards: COURSE_STANDARDS });
});

// Back-compat: /admin is now the trainer panel
app.get('/admin', requireTrainer, (req, res) => {
  res.render('trainer', { courses, standards: INTERNATIONAL_STANDARDS, courseStandards: COURSE_STANDARDS, flow: CLASSROOM_FLOW, rules: SAFETY_GOLDEN_RULES });
});
app.get('/trainer', requireTrainer, (req, res) => res.redirect('/admin'));

app.get('/course/:id', requireTrainer, (req, res) => {
  const course = getCourse(req.params.id);
  if (!course) return res.status(404).send('Course not found');
  // Every module unlocked — trainer picks any module in any order.
  const unlocks = course.modules.map(() => true);
  res.render('course', { course, unlocks, standards: COURSE_STANDARDS[course.id] || [] });
});

app.get('/course/:id/module/:idx', requireTrainer, (req, res) => {
  const course = getCourse(req.params.id);
  if (!course) return res.status(404).send('Course not found');
  const idx = parseInt(req.params.idx, 10);
  if (isNaN(idx) || idx < 0 || idx >= course.modules.length) return res.status(404).send('Module not found');
  const mod = course.modules[idx];
  const questions = mod.quiz.concat(mod.quizMore || []);
  const classroom = toClassroom(mod.activity);
  res.render('module', {
    course, mod, idx, total: course.modules.length,
    questions, classroom,
    standards: COURSE_STANDARDS[course.id] || [],
    flow: CLASSROOM_FLOW,
    rules: SAFETY_GOLDEN_RULES,
  });
});

app.get('/health', (req, res) => res.json({ ok: true, mode: 'trainer-only' }));

app.use((req, res) => res.status(404).send('Not found. <a href="/">Home</a>'));

app.listen(PORT, '0.0.0.0', () => console.log(`[salon-academy] trainer mode listening on :${PORT}`));
