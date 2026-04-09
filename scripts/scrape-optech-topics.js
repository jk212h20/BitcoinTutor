/**
 * Scrape each Bitcoin Optech topic page for its content.
 * Saves each topic as a separate markdown file in knowledge/sources/optech/
 * Rate-limited to be polite to the server.
 */
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const SOURCES_DIR = path.join(__dirname, '..', 'knowledge', 'sources', 'optech');
const INDEX_PATH = path.join(SOURCES_DIR, 'topics-index.json');

// Rate limit: wait between requests
const DELAY_MS = 500;
const sleep = ms => new Promise(r => setTimeout(r, ms));

function htmlToMarkdown($, el) {
  // Simple HTML to markdown conversion for topic content
  let md = '';
  
  $(el).children().each((i, child) => {
    const tag = child.tagName;
    const $child = $(child);
    
    if (tag === 'p') {
      md += $child.text().trim() + '\n\n';
    } else if (tag === 'h1' || tag === 'h2' || tag === 'h3' || tag === 'h4') {
      const level = parseInt(tag[1]);
      md += '#'.repeat(level) + ' ' + $child.text().trim() + '\n\n';
    } else if (tag === 'ul') {
      $child.children('li').each((j, li) => {
        md += '- ' + $(li).text().trim() + '\n';
      });
      md += '\n';
    } else if (tag === 'ol') {
      $child.children('li').each((j, li) => {
        md += `${j + 1}. ` + $(li).text().trim() + '\n';
      });
      md += '\n';
    } else if (tag === 'blockquote') {
      const lines = $child.text().trim().split('\n');
      md += lines.map(l => '> ' + l.trim()).join('\n') + '\n\n';
    } else if (tag === 'pre' || tag === 'code') {
      md += '```\n' + $child.text().trim() + '\n```\n\n';
    } else if (tag === 'table') {
      // Simple table extraction
      const rows = [];
      $child.find('tr').each((j, tr) => {
        const cells = [];
        $(tr).find('th, td').each((k, td) => {
          cells.push($(td).text().trim());
        });
        rows.push(cells);
      });
      if (rows.length > 0) {
        md += rows.map(r => '| ' + r.join(' | ') + ' |').join('\n') + '\n\n';
      }
    } else {
      // Fallback: just get text
      const text = $child.text().trim();
      if (text) md += text + '\n\n';
    }
  });
  
  return md.trim();
}

async function scrapeTopic(topic) {
  const outputPath = path.join(SOURCES_DIR, `${topic.slug}.md`);
  
  // Skip if already scraped
  if (fs.existsSync(outputPath)) {
    return { slug: topic.slug, status: 'skipped' };
  }
  
  try {
    const res = await fetch(topic.url);
    if (!res.ok) {
      return { slug: topic.slug, status: 'error', code: res.status };
    }
    
    const html = await res.text();
    const $ = cheerio.load(html);
    
    // Extract the main content - Optech uses a specific layout
    // The topic content is usually in the main article area
    const title = $('h1').first().text().trim() || topic.name;
    
    // Get the primary description/summary
    // Optech topic pages typically have the summary right after the title
    const content = $('article, .post-content, main .content, main').first();
    
    let markdown = `# ${title}\n\n`;
    
    if (content.length) {
      markdown += htmlToMarkdown($, content);
    } else {
      // Fallback: get all paragraphs from the page
      $('p').each((i, el) => {
        const text = $(el).text().trim();
        if (text && text.length > 30) {
          markdown += text + '\n\n';
        }
      });
    }
    
    // Also extract any "see also" or related links
    const seeAlso = [];
    $('a[href*="/en/topics/"]').each((i, el) => {
      const href = $(el).attr('href');
      const text = $(el).text().trim();
      if (href !== topic.url && text && !text.includes('Topics') && text.length > 2) {
        seeAlso.push({ name: text, slug: href.replace('/en/topics/', '').replace(/\/$/, '') });
      }
    });
    
    if (seeAlso.length > 0) {
      // Deduplicate
      const seen = new Set();
      const unique = seeAlso.filter(s => {
        if (seen.has(s.slug)) return false;
        seen.add(s.slug);
        return true;
      });
      markdown += '\n\n## Related Topics\n\n';
      unique.forEach(s => {
        markdown += `- ${s.name} (${s.slug})\n`;
      });
    }
    
    fs.writeFileSync(outputPath, markdown);
    return { slug: topic.slug, status: 'ok', size: markdown.length };
    
  } catch (err) {
    return { slug: topic.slug, status: 'error', message: err.message };
  }
}

async function main() {
  const topics = JSON.parse(fs.readFileSync(INDEX_PATH, 'utf8'));
  
  console.log(`Scraping ${topics.length} Optech topics...`);
  console.log(`Output: ${SOURCES_DIR}\n`);
  
  let ok = 0, skipped = 0, errors = 0;
  
  for (let i = 0; i < topics.length; i++) {
    const topic = topics[i];
    const result = await scrapeTopic(topic);
    
    if (result.status === 'ok') {
      ok++;
      console.log(`[${i + 1}/${topics.length}] ✓ ${topic.slug} (${result.size} chars)`);
    } else if (result.status === 'skipped') {
      skipped++;
      console.log(`[${i + 1}/${topics.length}] ⊘ ${topic.slug} (already exists)`);
    } else {
      errors++;
      console.log(`[${i + 1}/${topics.length}] ✗ ${topic.slug}: ${result.code || result.message}`);
    }
    
    if (result.status !== 'skipped') {
      await sleep(DELAY_MS);
    }
  }
  
  console.log(`\nDone! ${ok} scraped, ${skipped} skipped, ${errors} errors`);
}

main().catch(console.error);
