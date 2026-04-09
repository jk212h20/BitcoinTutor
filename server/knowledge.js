/**
 * Knowledge base module — loads and indexes Bitcoin knowledge for retrieval.
 * The LLM gets "tools" that call these functions to ground its questions/explanations.
 */
const fs = require('fs');
const path = require('path');

const TOPICS_DIR = path.join(__dirname, '..', 'knowledge', 'topics');
const INDEX_PATH = path.join(TOPICS_DIR, 'index.json');

let topicsIndex = [];
let topicsBySlug = {};
let topicsByDomain = {};

function loadKnowledge() {
  // Load the index
  topicsIndex = JSON.parse(fs.readFileSync(INDEX_PATH, 'utf8'));
  
  // Build lookup maps
  topicsBySlug = {};
  topicsByDomain = {};
  
  for (const entry of topicsIndex) {
    topicsBySlug[entry.slug] = entry;
    
    if (!topicsByDomain[entry.domain]) {
      topicsByDomain[entry.domain] = [];
    }
    topicsByDomain[entry.domain].push(entry);
  }
  
  console.log(`Loaded ${topicsIndex.length} topics across ${Object.keys(topicsByDomain).length} domains`);
  return topicsIndex;
}

/**
 * Get full content of a specific topic by slug
 */
function getTopic(slug) {
  const entry = topicsBySlug[slug];
  if (!entry) return null;
  
  const filePath = path.join(TOPICS_DIR, entry.domain, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  
  const content = fs.readFileSync(filePath, 'utf8');
  // Strip frontmatter
  const stripped = content.replace(/^---[\s\S]*?---\s*/, '');
  
  return {
    ...entry,
    content: stripped.trim(),
  };
}

/**
 * Search topics by keyword query (simple text matching)
 */
function searchTopics(query, limit = 5) {
  const q = query.toLowerCase();
  const scored = topicsIndex.map(entry => {
    let score = 0;
    
    // Title match (highest weight)
    if (entry.title.toLowerCase().includes(q)) score += 10;
    
    // Slug match
    if (entry.slug.includes(q)) score += 5;
    
    // Alias match
    if (entry.alsoCovers) {
      for (const alias of entry.alsoCovers) {
        if (alias.toLowerCase().includes(q)) score += 8;
      }
    }
    
    // Domain match
    if (entry.domain.includes(q)) score += 3;
    
    // Keyword matching in the query
    const words = q.split(/\s+/);
    for (const word of words) {
      if (word.length < 3) continue;
      if (entry.title.toLowerCase().includes(word)) score += 2;
      if (entry.slug.includes(word)) score += 1;
    }
    
    return { ...entry, score };
  });
  
  return scored
    .filter(e => e.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/**
 * Get topics in a specific domain, optionally filtered by difficulty
 */
function getTopicsByDomain(domain, maxDifficulty = 5) {
  const domainTopics = topicsByDomain[domain] || [];
  return domainTopics.filter(t => t.difficulty <= maxDifficulty);
}

/**
 * Get related topics for a given topic slug
 */
function getRelatedTopics(slug) {
  const entry = topicsBySlug[slug];
  if (!entry || !entry.related) return [];
  
  return entry.related
    .map(r => topicsBySlug[r])
    .filter(Boolean);
}

/**
 * Get all available domains with topic counts
 */
function getDomains() {
  return Object.entries(topicsByDomain).map(([domain, topics]) => ({
    domain,
    count: topics.length,
    difficulties: {
      easy: topics.filter(t => t.difficulty <= 2).length,
      medium: topics.filter(t => t.difficulty === 3).length,
      hard: topics.filter(t => t.difficulty >= 4).length,
    },
  }));
}

/**
 * Get a random topic, optionally filtered
 */
function getRandomTopic(options = {}) {
  let candidates = [...topicsIndex];
  
  if (options.domain) {
    candidates = candidates.filter(t => t.domain === options.domain);
  }
  if (options.maxDifficulty) {
    candidates = candidates.filter(t => t.difficulty <= options.maxDifficulty);
  }
  if (options.minDifficulty) {
    candidates = candidates.filter(t => t.difficulty >= options.minDifficulty);
  }
  if (options.exclude) {
    candidates = candidates.filter(t => !options.exclude.includes(t.slug));
  }
  
  if (candidates.length === 0) return null;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

/**
 * Build a compact topic list for the system prompt (just titles and slugs)
 */
function getTopicList() {
  return topicsIndex.map(t => `${t.title} [${t.domain}:${t.difficulty}] (${t.slug})`).join('\n');
}

module.exports = {
  loadKnowledge,
  getTopic,
  searchTopics,
  getTopicsByDomain,
  getRelatedTopics,
  getDomains,
  getRandomTopic,
  getTopicList,
};
