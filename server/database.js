/**
 * Database layer using sql.js (pure JS SQLite)
 * Stores visitors, users (LNURL-auth), conversations, and faucet state
 */
const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

const DB_PATH = process.env.DATABASE_PATH || path.join(__dirname, '..', 'data', 'tutor.db');

let db = null;

async function init() {
  const SQL = await initSqlJs();
  
  // Ensure data directory exists
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // Load existing DB or create new
  if (fs.existsSync(DB_PATH)) {
    const buffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(buffer);
    console.log('Loaded existing database');
  } else {
    db = new SQL.Database();
    console.log('Created new database');
  }
  
  // Create tables
  db.run(`
    CREATE TABLE IF NOT EXISTS visitors (
      visitor_id TEXT PRIMARY KEY,
      visit_count INTEGER DEFAULT 1,
      last_topics TEXT DEFAULT '[]',
      first_visit TEXT DEFAULT (datetime('now')),
      last_visit TEXT DEFAULT (datetime('now')),
      linked_user_id INTEGER,
      FOREIGN KEY (linked_user_id) REFERENCES users(id)
    )
  `);
  
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pubkey TEXT UNIQUE NOT NULL,
      display_name TEXT,
      notes TEXT DEFAULT '{}',
      created_at TEXT DEFAULT (datetime('now')),
      last_login TEXT DEFAULT (datetime('now')),
      sats_received INTEGER DEFAULT 0
    )
  `);
  
  // Migration: add notes column if missing
  try {
    db.exec("SELECT notes FROM users LIMIT 0");
  } catch (e) {
    db.run("ALTER TABLE users ADD COLUMN notes TEXT DEFAULT '{}'");
  }
  
  // Migration: add lightning_address column if missing
  try {
    db.exec("SELECT lightning_address FROM users LIMIT 0");
  } catch (e) {
    db.run("ALTER TABLE users ADD COLUMN lightning_address TEXT DEFAULT NULL");
    console.log('Migration: added lightning_address column');
  }
  
  db.run(`
    CREATE TABLE IF NOT EXISTS conversations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      visitor_id TEXT,
      messages TEXT DEFAULT '[]',
      knowledge_profile TEXT DEFAULT '{}',
      topics_covered TEXT DEFAULT '[]',
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);
  
  db.run(`
    CREATE TABLE IF NOT EXISTS auth_challenges (
      k1 TEXT PRIMARY KEY,
      created_at TEXT DEFAULT (datetime('now')),
      expires_at TEXT NOT NULL,
      used INTEGER DEFAULT 0,
      session_id TEXT,
      visitor_id TEXT
    )
  `);
  
  db.run(`
    CREATE TABLE IF NOT EXISTS faucet_tips (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      session_id TEXT,
      amount INTEGER NOT NULL,
      reason TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);
  
  saveDatabase();
  console.log('Database tables ready');
}

function saveDatabase() {
  if (!db) return;
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(DB_PATH, buffer);
}

// Auto-save every 30 seconds
setInterval(() => {
  if (db) saveDatabase();
}, 30000);

// === Visitors ===

function getVisitor(visitorId) {
  const stmt = db.prepare('SELECT * FROM visitors WHERE visitor_id = ?');
  stmt.bind([visitorId]);
  if (stmt.step()) {
    const row = stmt.getAsObject();
    stmt.free();
    return {
      ...row,
      last_topics: JSON.parse(row.last_topics || '[]'),
    };
  }
  stmt.free();
  return null;
}

function createOrUpdateVisitor(visitorId) {
  const existing = getVisitor(visitorId);
  if (existing) {
    db.run(`UPDATE visitors SET visit_count = visit_count + 1, last_visit = datetime('now') WHERE visitor_id = ?`, [visitorId]);
    saveDatabase();
    return { ...existing, visit_count: existing.visit_count + 1, isReturning: true };
  } else {
    db.run(`INSERT INTO visitors (visitor_id) VALUES (?)`, [visitorId]);
    saveDatabase();
    return { visitor_id: visitorId, visit_count: 1, last_topics: [], isReturning: false };
  }
}

function updateVisitorTopics(visitorId, topics) {
  db.run(`UPDATE visitors SET last_topics = ? WHERE visitor_id = ?`, [JSON.stringify(topics), visitorId]);
  saveDatabase();
}

function linkVisitorToUser(visitorId, userId) {
  db.run(`UPDATE visitors SET linked_user_id = ? WHERE visitor_id = ?`, [userId, visitorId]);
  saveDatabase();
}

// === Users (LNURL-auth) ===

function getUserByPubkey(pubkey) {
  const stmt = db.prepare('SELECT * FROM users WHERE pubkey = ?');
  stmt.bind([pubkey]);
  if (stmt.step()) {
    const row = stmt.getAsObject();
    stmt.free();
    return row;
  }
  stmt.free();
  return null;
}

function getUserById(id) {
  const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
  stmt.bind([id]);
  if (stmt.step()) {
    const row = stmt.getAsObject();
    stmt.free();
    return row;
  }
  stmt.free();
  return null;
}

function createUser(pubkey) {
  db.run(`INSERT INTO users (pubkey) VALUES (?)`, [pubkey]);
  const id = db.exec('SELECT last_insert_rowid()')[0].values[0][0];
  saveDatabase();
  return { id, pubkey };
}

function updateLastLogin(userId) {
  db.run(`UPDATE users SET last_login = datetime('now') WHERE id = ?`, [userId]);
  saveDatabase();
}

function getDeliveredPrompts(userId) {
  if (!userId) return [];
  const stmt = db.prepare('SELECT notes FROM users WHERE id = ?');
  stmt.bind([userId]);
  if (stmt.step()) {
    const row = stmt.getAsObject();
    stmt.free();
    try {
      const notes = JSON.parse(row.notes || '{}');
      return notes._delivered_prompts || [];
    } catch { return []; }
  }
  stmt.free();
  return [];
}

function markPromptDelivered(userId, promptId) {
  if (!userId) return;
  const notes = getUserNotes(userId);
  const delivered = notes._delivered_prompts || [];
  if (!delivered.includes(promptId)) {
    delivered.push(promptId);
    notes._delivered_prompts = delivered;
    updateUserNotes(userId, notes);
  }
}

function getUserNotes(userId) {
  if (!userId) return {};
  const stmt = db.prepare('SELECT notes FROM users WHERE id = ?');
  stmt.bind([userId]);
  if (stmt.step()) {
    const row = stmt.getAsObject();
    stmt.free();
    try { return JSON.parse(row.notes || '{}'); } catch { return {}; }
  }
  stmt.free();
  return {};
}

function updateUserNotes(userId, notes) {
  if (!userId) return;
  db.run(`UPDATE users SET notes = ? WHERE id = ?`, [JSON.stringify(notes), userId]);
  saveDatabase();
}

// === Auth Challenges ===

function createChallenge(k1, expiresAt, sessionId, visitorId) {
  db.run(`INSERT INTO auth_challenges (k1, expires_at, session_id, visitor_id) VALUES (?, ?, ?, ?)`,
    [k1, expiresAt, sessionId, visitorId]);
  saveDatabase();
}

function getValidChallenge(k1) {
  const stmt = db.prepare(`SELECT * FROM auth_challenges WHERE k1 = ? AND used = 0 AND expires_at > datetime('now')`);
  stmt.bind([k1]);
  if (stmt.step()) {
    const row = stmt.getAsObject();
    stmt.free();
    return row;
  }
  stmt.free();
  return null;
}

function markChallengeUsed(k1) {
  db.run(`UPDATE auth_challenges SET used = 1 WHERE k1 = ?`, [k1]);
  saveDatabase();
}

// === Conversations ===

function saveConversation(userId, visitorId, messages, knowledgeProfile, topicsCovered) {
  // Check if there's an existing conversation for this user/visitor
  let existing = null;
  if (userId) {
    const stmt = db.prepare('SELECT id FROM conversations WHERE user_id = ? ORDER BY updated_at DESC LIMIT 1');
    stmt.bind([userId]);
    if (stmt.step()) existing = stmt.getAsObject();
    stmt.free();
  }
  
  if (existing) {
    db.run(`UPDATE conversations SET messages = ?, knowledge_profile = ?, topics_covered = ?, updated_at = datetime('now') WHERE id = ?`,
      [JSON.stringify(messages), JSON.stringify(knowledgeProfile), JSON.stringify(topicsCovered), existing.id]);
  } else {
    db.run(`INSERT INTO conversations (user_id, visitor_id, messages, knowledge_profile, topics_covered) VALUES (?, ?, ?, ?, ?)`,
      [userId || null, visitorId, JSON.stringify(messages), JSON.stringify(knowledgeProfile), JSON.stringify(topicsCovered)]);
  }
  saveDatabase();
}

function getLastConversation(userId) {
  if (!userId) return null;
  const stmt = db.prepare('SELECT * FROM conversations WHERE user_id = ? ORDER BY updated_at DESC LIMIT 1');
  stmt.bind([userId]);
  if (stmt.step()) {
    const row = stmt.getAsObject();
    stmt.free();
    return {
      ...row,
      messages: JSON.parse(row.messages || '[]'),
      knowledge_profile: JSON.parse(row.knowledge_profile || '{}'),
      topics_covered: JSON.parse(row.topics_covered || '[]'),
    };
  }
  stmt.free();
  return null;
}

function setLightningAddress(userId, address) {
  db.run(`UPDATE users SET lightning_address = ? WHERE id = ?`, [address, userId]);
  saveDatabase();
}

function getLightningAddress(userId) {
  const user = getUserById(userId);
  return user?.lightning_address || null;
}

// === Faucet ===

function deductSatsFromUser(userId, amount) {
  db.run(`UPDATE users SET sats_received = MAX(0, sats_received - ?) WHERE id = ?`, [amount, userId]);
}

function recordTip(userId, sessionId, amount, reason) {
  db.run(`INSERT INTO faucet_tips (user_id, session_id, amount, reason) VALUES (?, ?, ?, ?)`,
    [userId, sessionId, amount, reason]);
  db.run(`UPDATE users SET sats_received = sats_received + ? WHERE id = ?`, [amount, userId]);
  saveDatabase();
}

function getTipsForSession(sessionId) {
  const results = db.exec(`SELECT SUM(amount) as total FROM faucet_tips WHERE session_id = ?`, [sessionId]);
  if (results.length > 0 && results[0].values[0][0] !== null) {
    return results[0].values[0][0];
  }
  return 0;
}

function getTotalTipsForUser(userId) {
  const results = db.exec(`SELECT SUM(amount) as total FROM faucet_tips WHERE user_id = ?`, [userId]);
  if (results.length > 0 && results[0].values[0][0] !== null) {
    return results[0].values[0][0];
  }
  return 0;
}

function getTotalTipsToday() {
  const results = db.exec(`SELECT SUM(amount) as total FROM faucet_tips WHERE date(created_at) = date('now')`);
  if (results.length > 0 && results[0].values[0][0] !== null) {
    return results[0].values[0][0];
  }
  return 0;
}

function getVisitorLinkedUser(visitorId) {
  const visitor = getVisitor(visitorId);
  if (visitor && visitor.linked_user_id) {
    return getUserById(visitor.linked_user_id);
  }
  return null;
}

module.exports = {
  init,
  saveDatabase,
  // Visitors
  getVisitor,
  createOrUpdateVisitor,
  updateVisitorTopics,
  linkVisitorToUser,
  getVisitorLinkedUser,
  // Users
  getUserByPubkey,
  getUserById,
  createUser,
  updateLastLogin,
  getUserNotes,
  updateUserNotes,
  getDeliveredPrompts,
  markPromptDelivered,
  setLightningAddress,
  getLightningAddress,
  // Auth
  createChallenge,
  getValidChallenge,
  markChallengeUsed,
  // Conversations
  saveConversation,
  getLastConversation,
  // Faucet
  recordTip,
  deductSatsFromUser,
  getTipsForSession,
  getTotalTipsForUser,
  getTotalTipsToday,
};
