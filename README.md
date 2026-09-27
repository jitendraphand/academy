# 💈 Salon Academy

Device-agnostic web app (Node.js + Express + EJS + SQLite) for salon training across **Hair Mastery**, **Skin Science & Facials**, and **Chemical Services** — each a **12-week, 2–3 hrs/week (~30 hr)** professional-standard course with 3D labs, interactive activities, quizzes and in-salon practicals.

## ✨ Features
- **Default admin login:** `admin@salon.academy` / `admin123` (override via `ADMIN_EMAIL` / `ADMIN_PASSWORD`)
- **Admin panel (`/admin`):** generate invite codes (per-course or ALL, max-uses, expiry, label), enable/disable codes, grant/revoke course access, view per-student progress (lesson ✓, quiz best, practical notes, % complete)
- **Student flow:** register with invite code + name/email/phone/password → auto-enrolled → dashboard → sequential modules (next unlocks when theory ✓ + quiz ≥60%)
- **Course content:** 36 modules total, each with objectives, theory, visual demo steps, 3D lab (Three.js: head/hair, skin layers, pH tower + colour wheel), interactive activity (checklist / flip-cards / mixer / scenario), 5-Q test with explanations, in-salon practical with outcome + mentor checklist
- **Highly visual, responsive:** mobile-first CSS, touch orbit 3D, sticky tabs, works phone → desktop
- **Progress tracking:** SQLite tables `progress` + `enrollments`; quiz best kept, practical notes visible to admin

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
# data persists in volume academy-data (/app/data/academy.db)
```
Override admin:
```bash
ADMIN_EMAIL=boss@salon.com ADMIN_PASSWORD=Strong123 docker compose up --build
```

## 🔑 Demo walkthrough
1. Login as admin (`admin@salon.academy` / `admin123`) → **Admin** → Generate code (e.g. ALL, 10 uses, label “Jan batch”)
2. Copy code (e.g. `SALON-AB12-CD34`), logout, **Register with code** as a student
3. Dashboard → open Hair/Skin/Chemical → Week 1 → Learn → 3D Lab → Activity → Test (≥60%) → Mark theory → Practical notes → Week 2 unlocks
4. Back as admin → expand student → see % + quiz + practicals; grant/revoke anytime

## 🎪 Demo mode
- **Admin → “Demo access” → Create Demo access**: generates a `DEMO-XXXX-XXXX` code for ALL courses. Anyone registering with it gets every module unlocked (no sequential lock) and a DEMO badge.
- Any student can also be switched to/from demo individually (Students list → turn demo mode on/off).

## 🖼️ Blender reference plates
Each 3D lab shows a studio-rendered tool plate above the interactive demo.
Regenerate with Blender 5.x (headless, EEVEE):
```bash
blender -b --python blender/make_plates.py
# → public/img/plates/*.png (9 shared plates mapped to all 36 demos)
```

## 🗂️ Structure
```
server.js            # routes, auth, admin, progress APIs
db.js                # SQLite init + default admin seed
content/hair.js      # 12 hair modules
content/skin.js      # 12 skin modules
content/chemical.js  # 12 chemical modules
content/index.js     # course registry (lives outside the DB volume so updates always deploy)
views/               # EJS: index, login, register, dashboard, course, module, admin
public/css/style.css # responsive device-agnostic UI
public/js/app.js     # tabs, quiz, activities, progress calls
public/js/three-visuals.js # procedural Three.js labs
Dockerfile / docker-compose.yml
```

## 🛡️ Notes
- Change `SESSION_SECRET`, admin password and `maxAge` cookies in production; put behind HTTPS.
- SQLite WAL at `data/academy.db` (or `$DB_PATH`); back up the volume.
- Three.js via CDN with graceful fallback if offline (theory/quiz still work).
