/**
 * ============================================================
 *  QAMASHI YOSHLAR PORTALI — Database Initializer
 *  Run: node init.js
 *  Purpose: Creates or resets the SQLite database tables.
 * ============================================================
 */

"use strict";

const sqlite3 = require("sqlite3").verbose();
const path    = require("path");

const DB_PATH = path.join(__dirname, "portal.db");

console.log("🔧  Initializing database at:", DB_PATH);

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error("❌  Failed to open database:", err.message);
    process.exit(1);
  }
  console.log("✅  Database opened successfully.");
});

db.serialize(() => {

  // ── Enable WAL mode ──────────────────────────────────────
  db.run("PRAGMA journal_mode=WAL", () => {
    console.log("✅  WAL mode enabled.");
  });

  // ── Drop existing table (clean reset) ────────────────────
  db.run("DROP TABLE IF EXISTS news", (err) => {
    if (err) {
      console.error("❌  Failed to drop table:", err.message);
    } else {
      console.log("🗑️   Dropped existing 'news' table (if existed).");
    }
  });

  // ── Create news table ─────────────────────────────────────
  db.run(`
    CREATE TABLE IF NOT EXISTS news (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      title_uz    TEXT    NOT NULL DEFAULT '',
      title_ru    TEXT    NOT NULL DEFAULT '',
      title_en    TEXT    NOT NULL DEFAULT '',
      desc_uz     TEXT    NOT NULL DEFAULT '',
      desc_ru     TEXT    NOT NULL DEFAULT '',
      desc_en     TEXT    NOT NULL DEFAULT '',
      date        TEXT    NOT NULL,
      image       TEXT    DEFAULT NULL,
      created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error("❌  Failed to create table:", err.message);
    } else {
      console.log("✅  'news' table created successfully.");
    }
  });

  // ── Seed sample data ──────────────────────────────────────
  const stmt = db.prepare(`
    INSERT INTO news (title_uz, title_ru, title_en, desc_uz, desc_ru, desc_en, date, image)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const seeds = [
    [
      "Qamashi yoshlari uchun stipendiya dasturi",
      "Программа стипендий для молодёжи Камаши",
      "Scholarship Program for Qamashi Youth",
      "Qamashi tumanida istiqbolli yoshlarga yangi stipendiya dasturi ishga tushirildi. Dastur doirasida 50 nafar talabaga moliyaviy yordam ko'rsatiladi. Ariza topshirish muddati 1-may gacha davom etadi.",
      "В Камашинском районе запущена новая программа стипендий для перспективной молодёжи. В рамках программы финансовая поддержка будет оказана 50 студентам. Срок подачи заявок — до 1 мая.",
      "A new scholarship program for promising youth has been launched in Qamashi district. 50 students will receive financial support under the program. Application deadline is May 1st.",
      "2025-04-15",
      null
    ],
    [
      "Yoshlar kuni: bayram tadbirlari",
      "День молодёжи: праздничные мероприятия",
      "Youth Day: Festive Events",
      "Qamashi markaziy maydonida yoshlar kuni munosabati bilan katta bayram tadbiri bo'lib o'tdi. 500 dan ortiq yoshlar ishtirok etdi. Sport musobaqalari, konsert dasturlari va ko'rgazmalar tashkil etildi.",
      "На центральной площади Камаши прошёл большой праздник по случаю Дня молодёжи. В нём приняли участие более 500 молодых людей. Были организованы спортивные соревнования, концертные программы и выставки.",
      "A grand celebration was held at Qamashi central square on the occasion of Youth Day. Over 500 young people participated. Sports competitions, concert programs and exhibitions were organized.",
      "2025-06-25",
      null
    ],
    [
      "IT-ko'nikmalar bo'yicha bepul kurslar",
      "Бесплатные курсы по IT-навыкам",
      "Free IT Skills Courses",
      "Qamashi yoshlar markazida bepul IT kurslari ro'yxatga olish boshlandi. Dasturlash, dizayn va raqamli marketing yo'nalishlarida ta'lim beriladi. Kurslar davomiyligi 3 oy.",
      "В молодёжном центре Камаши открылась регистрация на бесплатные IT-курсы. Обучение по направлениям: программирование, дизайн и digital-маркетинг. Продолжительность курсов — 3 месяца.",
      "Registration for free IT courses has opened at the Qamashi Youth Center. Training in programming, design, and digital marketing is offered. Course duration is 3 months.",
      "2025-09-01",
      null
    ],
    [
      "Yoshlar ishbilarmonlik inkubatori ochilmoqda",
      "Открывается молодёжный бизнес-инкубатор",
      "Youth Business Incubator Opening",
      "Qamashi tumanida yoshlar uchun ishbilarmonlik inkubatori tashkil etilmoqda. Startup loyihalari uchun mentorlik, moliyalash va ofis maydoni taqdim etiladi.",
      "В Камашинском районе создаётся бизнес-инкубатор для молодёжи. Для стартап-проектов будут предоставлены менторство, финансирование и офисные площади.",
      "A business incubator for youth is being established in Qamashi district. Mentorship, funding and office space will be provided for startup projects.",
      "2025-10-10",
      null
    ],
    [
      "Sport musobaqalari yakunlandi",
      "Завершились спортивные соревнования",
      "Sports Competition Concluded",
      "Tuman yoshlar sport musobaqalari muvaffaqiyatli yakunlandi. Futbol, voleybol va kurash bo'yicha g'oliblar aniqlandi. G'oliblar qimmatli sovg'alar bilan taqdirlandi.",
      "Успешно завершились районные молодёжные спортивные соревнования. Определились победители по футболу, волейболу и борьбе. Победители были награждены ценными призами.",
      "The district youth sports competitions have successfully concluded. Winners in football, volleyball, and wrestling were determined. Winners were awarded valuable prizes.",
      "2025-11-20",
      null
    ]
  ];

  seeds.forEach((row, i) => {
    stmt.run(...row, (err) => {
      if (err) console.error(`❌  Seed row ${i + 1} failed:`, err.message);
      else console.log(`🌱  Seeded row ${i + 1}: "${row[2]}"`);
    });
  });

  stmt.finalize(() => {
    console.log("\n🎉  Database initialization complete!");
    console.log(`📄  Database file: ${DB_PATH}`);
    console.log("🚀  You can now run: node server.js\n");
    db.close();
  });
});
