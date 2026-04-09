/**
 * Scrape Bitcoin Optech topics index page to get list of all topics with their URLs and summaries
 */
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://bitcoinops.org';
const TOPICS_URL = `${BASE_URL}/en/topics/`;

async function scrapeIndex() {
  console.log(`Fetching topics index: ${TOPICS_URL}`);
  const res = await fetch(TOPICS_URL);
  const html = await res.text();
  
  // Save raw HTML for reference
  fs.writeFileSync(
    path.join(__dirname, '..', 'knowledge', 'sources', 'optech', '_index.html'),
    html
  );
  
  const $ = cheerio.load(html);
  
  const topics = [];
  
  // Look for topic links - Optech topics page has a list of topics with descriptions
  // Let's first understand the page structure
  console.log('\n--- Page structure analysis ---');
  console.log('Title:', $('title').text());
  
  // Find all links that point to /en/topics/
  $('a[href*="/en/topics/"]').each((i, el) => {
    const href = $(el).attr('href');
    const text = $(el).text().trim();
    // Skip the index page itself and navigation links
    if (href === '/en/topics/' || href === TOPICS_URL) return;
    if (!text) return;
    
    // Get parent element for context/description
    const parent = $(el).parent();
    const parentText = parent.text().trim();
    
    topics.push({
      name: text,
      url: href.startsWith('http') ? href : `${BASE_URL}${href}`,
      slug: href.replace('/en/topics/', '').replace(/\/$/, ''),
    });
  });
  
  // Deduplicate by URL
  const seen = new Set();
  const unique = topics.filter(t => {
    if (seen.has(t.url)) return false;
    seen.add(t.url);
    return true;
  });
  
  console.log(`\nFound ${unique.length} unique topic links`);
  
  // Save index
  const outputPath = path.join(__dirname, '..', 'knowledge', 'sources', 'optech', 'topics-index.json');
  fs.writeFileSync(outputPath, JSON.stringify(unique, null, 2));
  console.log(`Saved to ${outputPath}`);
  
  // Print first 20 for inspection
  console.log('\nFirst 20 topics:');
  unique.slice(0, 20).forEach(t => console.log(`  ${t.name} → ${t.slug}`));
  console.log(`  ... and ${unique.length - 20} more`);
}

scrapeIndex().catch(console.error);
