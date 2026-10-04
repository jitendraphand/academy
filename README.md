# 💈 Salon Academy — Trainer Mode

Classroom-projection web app (Node.js + Express + EJS + SQLite) for salon training across **Hair Mastery**, **Skin Science & Facials**, and **Chemical Services** — each **12 weeks, ~30 hrs**, taught by a single trainer login on the big screen. All 36 modules are unlocked; pick any module in any order.

Aligned in depth + breadth to **CIDESCO / CIBTAC / VTCT & NVQ L2–L3 (HABIA NOS) / WHO IPC / EU 1223/2009 / ISO 22716 GMP / Fitzpatrick I–VI**.

## ✨ Features
- **Single trainer login:** `admin@salon.academy` / `admin123` (override via `ADMIN_EMAIL` / `ADMIN_PASSWORD`). No student accounts, no invite codes, no enrolments, no progress tracking.
- **Trainer panel (`/admin`):** course library, 55-min lesson flow, international standards table, safety golden rules.
- **Classroom flow per module:** Learn → 3D Lab → classroom activity (trainer-led) → oral knowledge check → salon application. 55-min plan on every page.
- **Course content:** 36 modules, each with objectives, theory, deep-dive (international professional standard), case study + debrief, visual demo steps, 3D lab (Three.js), classroom activity (demo / oral drill / match-and-defend / scenario clinic), full quiz bank revealed orally, salon practical + grading rubric.
- **All unlocked:** no sequential gating, no locks. Prev/Next jumps anywhere.
- **Highly visual, responsive:** mobile-first CSS, touch orbit 3D, sticky tabs, projector-friendly big text.

## 🚀 Run locally
```bash
npm install
npm start
# → http://localhost:3000
```

## 🐳 Run with Docker
```bash
docker compose up --build
# → http://localhost:3000
# data persists in volume academy-data (/app/data/academy.db — trainer login only)
```
Override trainer:
```bash
ADMIN_EMAIL=trainer@salon.com ADMIN_PASSWORD=Strong123 docker compose up --build
```

## 👩‍🏫 Classroom walkthrough
1. Login as trainer (`admin@salon.academy` / `admin123`) → **Courses**
2. Open Hair / Skin / Chemical → pick any of the 12 modules
3. Teach: Learn (theory + deep dive) → 3D Lab (project) → Classroom activity (demo / drill on screen) → Knowledge check (hands-up oral, reveal answers) → Salon application (assign practical + rubric)
4. Trainer panel shows standards + safety rules to read aloud.

## 🌍 Standards
`content/standards.js` — CIDESCO, CIBTAC, VTCT/NVQ-HABIA, WHO IPC, EU 1223/2009, ISO 22716, Fitzpatrick gating.
`content/trainer.js` — `toClassroom(activity)` converts checklist/cards/mixer/scenario into projector scripts (timing, materials, cold-call flow).

## 🖼️ Blender reference plates (dev reference)
`blender/make_plates.py` renders studio tool plates used while designing the
interactive 3D demos (deliberately not shown in UI).
```bash
blender -b --python blender/make_plates.py
# → public/img/plates/*.png
```

## 🗂️ Structure
```
server.js            # trainer-only routes + auth
db.js                # SQLite trainer login seed (users table only)
content/hair.js      # 12 hair modules
content/skin.js      # 12 skin modules
content/chemical.js  # 12 chemical modules
content/index.js     # course registry
content/standards.js # international frameworks + 55-min flow + safety rules
content/trainer.js   # classroom activity wrapper
views/               # EJS: index, login, dashboard, course, module, trainer
public/css/style.css # responsive projector-friendly UI
public/js/app.js     # tabs, activities, oral quiz reveal (no tracking)
public/js/three-visuals.js # procedural Three.js labs
Dockerfile / docker-compose.yml
```

## 🛡️ Notes
- Change `SESSION_SECRET` and trainer password in production; put behind HTTPS.
- SQLite at `data/academy.db` (or `$DB_PATH`); old student tables (if any) are unused.
- Three.js via CDN with graceful fallback if offline (theory/quiz still work).
