/**
 * Wiki module — Karpathy-style LLM Wiki for Bitcoin knowledge
 * 
 * Three layers:
 *   1. Raw sources (knowledge/sources/) — immutable, never modified
 *   2. Wiki (knowledge/wiki/) — LLM-maintained, admin-approved
 *   3. Schema (knowledge/wiki/schema.md) — conventions
 * 
 * Three operations:
 *   1. Ingest — process sources into wiki pages
 *   2. Query — search wiki, synthesize answers
 *   3. Lint — health-check for gaps, contradictions, orphans
 * 
 * KEY: The Rabbit proposes edits. Admin approves/rejects via diff review.
 */
const fs = require('fs');
const path = require('path');

const WIKI_DIR = path.join(__dirname, '..', 'knowledge', 'wiki');
const WIKI_INDEX = path.join(WIKI_DIR, 'index.md');
const WIKI_LOG = path.join(WIKI_DIR, 'log.md');

// In-memory index for fast lookups
let wikiPages = []; // [{path, title, type, tags, summary, updated}]

/**
 * Initialize wiki — ensure directory structure exists
 */
function initWiki() {
  const dirs = [
    WIKI_DIR,
    path.join(WIKI_DIR, 'concepts'),
    path.join(WIKI_DIR, 'entities'),
    path.join(WIKI_DIR, 'sources'),
    path.join(WIKI_DIR, 'queries'),
  ];
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }
  
  // Load index into memory
  loadWikiIndex();
  console.log(`Wiki initialized: ${wikiPages.length} pages`);
}

/**
 * Load wiki index from all markdown files
 */
function loadWikiIndex() {
  wikiPages = [];
  const subdirs = ['concepts', 'entities', 'sources', 'queries'];
  
  for (const subdir of subdirs) {
    const dirPath = path.join(WIKI_DIR, subdir);
    if (!fs.existsSync(dirPath)) continue;
    
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md'));
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const meta = parseFrontmatter(content);
      
      wikiPages.push({
        path: `${subdir}/${file}`,
        slug: file.replace('.md', ''),
        title: meta.title || file.replace('.md', '').replace(/-/g, ' '),
        type: meta.type || subdir.replace(/s$/, ''), // concepts→concept
        tags: meta.tags || [],
        summary: meta.summary || extractFirstSentence(content),
        updated: meta.updated || null,
        sources: meta.sources || [],
        related: meta.related || [],
      });
    }
  }
  
  // Also check top-level wiki files
  for (const file of ['overview.md']) {
    const filePath = path.join(WIKI_DIR, file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      const meta = parseFrontmatter(content);
      wikiPages.push({
        path: file,
        slug: file.replace('.md', ''),
        title: meta.title || 'Overview',
        type: 'overview',
        tags: meta.tags || [],
        summary: meta.summary || extractFirstSentence(content),
        updated: meta.updated || null,
        sources: [],
        related: [],
      });
    }
  }
}

/**
 * Parse YAML frontmatter from markdown
 */
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  
  const meta = {};
  const lines = match[1].split('\n');
  for (const line of lines) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();
    
    // Parse arrays
    if (value.startsWith('[') && value.endsWith(']')) {
      try { value = JSON.parse(value); } catch {}
    }
    // Strip quotes
    if (typeof value === 'string' && value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }
    meta[key] = value;
  }
  return meta;
}

/**
 * Extract first meaningful sentence from markdown content (skipping frontmatter)
 */
function extractFirstSentence(content) {
  const body = content.replace(/^---[\s\S]*?---\s*/, '').trim();
  const firstLine = body.split('\n').find(l => l.trim() && !l.startsWith('#'));
  if (!firstLine) return '';
  const sentence = firstLine.match(/^[^.!?]+[.!?]/);
  return sentence ? sentence[0].trim() : firstLine.slice(0, 120).trim();
}

/**
 * Get the full content of a wiki page
 */
function getPage(pagePath) {
  const fullPath = path.join(WIKI_DIR, pagePath);
  if (!fs.existsSync(fullPath)) return null;
  
  const content = fs.readFileSync(fullPath, 'utf8');
  const meta = parseFrontmatter(content);
  const body = content.replace(/^---[\s\S]*?---\s*/, '').trim();
  
  return {
    path: pagePath,
    ...meta,
    content: body,
  };
}

/**
 * Search wiki pages by query (text matching across title, tags, summary, content)
 */
function searchWiki(query, limit = 8) {
  const q = query.toLowerCase();
  const words = q.split(/\s+/).filter(w => w.length >= 2);
  
  const scored = wikiPages.map(page => {
    let score = 0;
    
    // Title match (highest weight)
    const titleLower = page.title.toLowerCase();
    if (titleLower.includes(q)) score += 15;
    for (const w of words) {
      if (titleLower.includes(w)) score += 5;
    }
    
    // Tag match
    for (const tag of page.tags) {
      if (tag.toLowerCase().includes(q)) score += 8;
      for (const w of words) {
        if (tag.toLowerCase().includes(w)) score += 3;
      }
    }
    
    // Slug match
    if (page.slug.includes(q.replace(/\s+/g, '-'))) score += 6;
    
    // Summary match
    const summaryLower = (page.summary || '').toLowerCase();
    for (const w of words) {
      if (summaryLower.includes(w)) score += 2;
    }
    
    // Type boost for concepts and entities
    if (page.type === 'concept' && score > 0) score += 1;
    
    return { ...page, score };
  });
  
  return scored
    .filter(p => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/**
 * Get the wiki index as a readable string for the LLM
 */
function getWikiIndex() {
  if (wikiPages.length === 0) return 'Wiki is empty — no pages yet.';
  
  const byType = {};
  for (const page of wikiPages) {
    const type = page.type || 'other';
    if (!byType[type]) byType[type] = [];
    byType[type].push(page);
  }
  
  let output = '';
  for (const [type, pages] of Object.entries(byType)) {
    output += `\n### ${type.charAt(0).toUpperCase() + type.slice(1)}s (${pages.length})\n`;
    for (const p of pages.sort((a, b) => a.title.localeCompare(b.title))) {
      output += `- [${p.title}](${p.path}) — ${p.summary || 'no summary'}`;
      if (p.tags.length) output += ` [${p.tags.join(', ')}]`;
      output += '\n';
    }
  }
  
  return output.trim();
}

/**
 * Get wiki overview page content
 */
function getOverview() {
  const overviewPath = path.join(WIKI_DIR, 'overview.md');
  if (!fs.existsSync(overviewPath)) return null;
  const content = fs.readFileSync(overviewPath, 'utf8');
  return content.replace(/^---[\s\S]*?---\s*/, '').trim();
}

/**
 * Get wiki stats for system prompt
 */
function getStats() {
  const byType = {};
  for (const page of wikiPages) {
    byType[page.type] = (byType[page.type] || 0) + 1;
  }
  return {
    totalPages: wikiPages.length,
    byType,
  };
}

/**
 * Get the recent log entries
 */
function getRecentLog(n = 10) {
  if (!fs.existsSync(WIKI_LOG)) return 'No log entries yet.';
  const content = fs.readFileSync(WIKI_LOG, 'utf8');
  const entries = content.match(/^## \[.+$/gm) || [];
  return entries.slice(-n).join('\n');
}

/**
 * Write a wiki page to disk (used by admin when approving edits)
 */
function writePage(pagePath, content) {
  const fullPath = path.join(WIKI_DIR, pagePath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(fullPath, content, 'utf8');
  
  // Reload index
  loadWikiIndex();
}

/**
 * Append to the wiki log
 */
function appendLog(entry) {
  const date = new Date().toISOString().split('T')[0];
  const line = `## [${date}] ${entry}\n\n`;
  
  if (!fs.existsSync(WIKI_LOG)) {
    fs.writeFileSync(WIKI_LOG, `# Wiki Log\n\nChronological record of wiki operations.\n\n${line}`, 'utf8');
  } else {
    fs.appendFileSync(WIKI_LOG, line, 'utf8');
  }
}

/**
 * Delete a wiki page (used by admin)
 */
function deletePage(pagePath) {
  const fullPath = path.join(WIKI_DIR, pagePath);
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
    loadWikiIndex();
    return true;
  }
  return false;
}

/**
 * Get all pages (for lint/health check)
 */
function getAllPages() {
  return wikiPages.map(p => ({
    ...p,
    content: getPage(p.path)?.content || '',
  }));
}

module.exports = {
  initWiki,
  loadWikiIndex,
  getPage,
  searchWiki,
  getWikiIndex,
  getOverview,
  getStats,
  getRecentLog,
  writePage,
  appendLog,
  deletePage,
  getAllPages,
  WIKI_DIR,
};
