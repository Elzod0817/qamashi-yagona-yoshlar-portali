# 🌿 Qamashi Yoshlar Portali

> Official Youth Information Portal for Qamashi District, Kashkadarya Region, Uzbekistan

---

## 📁 Project Structure

```
qamashi-portal/
├── server.js       ← Node.js/Express backend (REST API + SQLite)
├── init.js         ← Database initializer & seeder
├── index.html      ← Full frontend (Glassmorphism UI, 3 languages)
├── package.json    ← Node.js dependencies
├── portal.db       ← SQLite database (auto-created on first run)
└── README.md       ← This guide
```

---

## ⚙️ Prerequisites

Make sure you have these installed:

| Tool    | Version   | Check command       |
|---------|-----------|---------------------|
| Node.js | ≥ 16.0.0  | `node --version`    |
| npm     | ≥ 7.0.0   | `npm --version`     |

> **Download Node.js:** https://nodejs.org/en/download

---

## 🚀 Installation & Running

### Step 1 — Clone / Copy the files

Place all project files in a folder:
```
qamashi-portal/
  ├── server.js
  ├── init.js
  ├── index.html
  └── package.json
```

### Step 2 — Open terminal in the project folder

```bash
cd qamashi-portal
```

### Step 3 — Install dependencies

```bash
npm install
```

This installs: `express`, `sqlite3`, `jsonwebtoken`, `cors`, `body-parser`

> ⚠️ `sqlite3` compiles native bindings. On Windows, you may need:
> ```bash
> npm install --global windows-build-tools
> ```
> Or use [node-pre-gyp](https://github.com/mapbox/node-pre-gyp).

### Step 4 — Initialize the database (optional but recommended)

```bash
node init.js
```

This creates `portal.db` with the `news` table and 5 seed articles.

> **Note:** `server.js` also auto-creates the table and seeds 3 items if the DB is empty.
> Only run `init.js` if you want a clean reset with fresh seed data.

### Step 5 — Start the backend server

```bash
node server.js
```

You should see:
```
╔═══════════════════════════════════════════════╗
║       QAMASHI YOSHLAR PORTALI — BACKEND       ║
║  Server running at  http://localhost:3001     ║
║  Admin password: 2026                         ║
╚═══════════════════════════════════════════════╝
```

### Step 6 — Open the frontend

Open `index.html` in your browser:

**Option A — Direct file open:**
```
Double-click index.html
OR drag it into your browser
```

**Option B — Serve via Node (recommended):**
```bash
# While server is running, visit:
http://localhost:3001/index.html
```

**Option C — Any static server:**
```bash
npx serve .
# Then open http://localhost:3000
```

---

## 🔑 Admin Access

- Click the **"Kirish / Login"** button in the top-right navbar
- Enter password: **`2026`**
- Admin panel unlocks **Add / Edit / Delete** buttons on news cards
- Session persists via JWT stored in `localStorage` (valid 8 hours)
- Click **"Chiqish / Logout"** to end the admin session

---

## 🌐 API Reference

Base URL: `http://localhost:3001`

| Method   | Endpoint         | Auth Required | Description            |
|----------|------------------|---------------|------------------------|
| `GET`    | `/api/news`      | ❌ No          | Get all news articles  |
| `GET`    | `/api/news/:id`  | ❌ No          | Get single article     |
| `POST`   | `/api/login`     | ❌ No          | Admin login → JWT      |
| `POST`   | `/api/news`      | ✅ Yes (JWT)   | Create new article     |
| `PUT`    | `/api/news/:id`  | ✅ Yes (JWT)   | Update an article      |
| `DELETE` | `/api/news/:id`  | ✅ Yes (JWT)   | Delete an article      |

### Example: Login
```bash
curl -X POST http://localhost:3001/api/login \
  -H "Content-Type: application/json" \
  -d '{"password": "2026"}'
```

### Example: Add News
```bash
curl -X POST http://localhost:3001/api/news \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title_uz": "Yangi voqea",
    "title_en": "New Event",
    "desc_uz": "Tavsif...",
    "desc_en": "Description...",
    "date": "2025-12-01"
  }'
```

---

## 🎛️ Frontend Features

| Feature            | Details                                          |
|--------------------|--------------------------------------------------|
| **Dark/Light Mode**| Toggle in navbar, persists in `localStorage`     |
| **3 Languages**    | Uzbek 🇺🇿 · Russian 🇷🇺 · English 🇬🇧 (UI + news content) |
| **Responsive Grid**| 1 col mobile / 2 col tablet / 3 col desktop      |
| **Search**         | Live client-side filtering by title/description  |
| **AOS Animations** | Smooth scroll-triggered card reveals             |
| **Glassmorphism**  | Frosted glass cards with glow effects            |
| **Toast Alerts**   | Graceful error/success notifications             |
| **Skeleton Loaders**| Show while API data is loading                  |
| **Image Upload**   | Base64 encoded, stored in SQLite (max 5MB)       |
| **Admin Panel**    | JWT-protected Add/Edit/Delete with modals        |

---

## 🔧 Configuration

Edit these constants at the top of `server.js`:

```javascript
const PORT       = process.env.PORT || 3001;    // Server port
const ADMIN_PASS = process.env.ADMIN_PASS || "2026";  // Admin password
const JWT_SECRET = process.env.JWT_SECRET || "...";   // JWT signing key
```

Or use environment variables:
```bash
PORT=4000 ADMIN_PASS=mySecret node server.js
```

---

## 🛠️ Development Mode (with auto-reload)

```bash
npm run dev
```

This uses `nodemon` to restart the server on file changes.

---

## 🔒 Security Notes

- Change `ADMIN_PASS` and `JWT_SECRET` before deploying to production
- Use HTTPS in production (reverse proxy with Nginx + Let's Encrypt)
- For production, set `JWT_SECRET` via environment variable
- Consider rate-limiting the `/api/login` endpoint in production

---

## 📦 Production Deployment

```bash
# Using PM2 process manager
npm install -g pm2
pm2 start server.js --name "qamashi-portal"
pm2 save
pm2 startup
```

---

## 🧩 Troubleshooting

| Problem | Solution |
|---------|----------|
| `sqlite3` install fails | Install build tools: `npm i -g node-gyp` + C++ compiler |
| `CORS error` in browser | Ensure backend is running at `localhost:3001` |
| `JWT expired` error | Log out and log back in |
| `Cannot find module` | Run `npm install` again |
| Port in use | Change `PORT` in server.js or kill the existing process |

---

## 📜 License

MIT — Free to use and modify for Qamashi District community projects.
# Qamashi-yoshlar-portali
# qamashi-yagona-yoshlar-portali
