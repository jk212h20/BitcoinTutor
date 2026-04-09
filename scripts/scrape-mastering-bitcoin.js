/**
 * Download Mastering Bitcoin (3rd edition) chapters from GitHub.
 * These are .adoc (AsciiDoc) files — we'll convert them to readable markdown.
 */
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const SOURCES_DIR = path.join(__dirname, '..', 'knowledge', 'sources', 'mastering-bitcoin');
const BASE_URL = 'https://raw.githubusercontent.com/bitcoinbook/bitcoinbook/develop/';

const CHAPTERS = [
  'ch01_intro.adoc',
  'ch02_overview.adoc',
  'ch03_bitcoin-core.adoc',
  'ch04_keys.adoc',
  'ch05_wallets.adoc',
  'ch06_transactions.adoc',
  'ch07_authorization-authentication.adoc',
  'ch08_signatures.adoc',
  'ch09_fees.adoc',
  'ch10_network.adoc',
  'ch11_blockchain.adoc',
  'ch12_mining.adoc',
  'ch13_security.adoc',
  'ch14_applications.adoc',
  'glossary.asciidoc',
  'appa_whitepaper.adoc',
];

const sleep = ms => new Promise(r => setTimeout(r, ms));

function adocToMarkdown(adoc) {
  // Simple AsciiDoc to Markdown conversion
  let md = adoc;
  
  // Remove image includes (we don't need them)
  md = md.replace(/^image::.*$/gm, '');
  
  // Convert headers: == Title → ## Title
  md = md.replace(/^={5}\s+(.+)$/gm, '##### $1');
  md = md.replace(/^={4}\s+(.+)$/gm, '#### $1');
  md = md.replace(/^={3}\s+(.+)$/gm, '### $1');
  md = md.replace(/^={2}\s+(.+)$/gm, '## $1');
  md = md.replace(/^=\s+(.+)$/gm, '# $1');
  
  // Convert bold: *text* → **text** (AsciiDoc uses single *, md uses double)
  // But be careful not to break list items
  // AsciiDoc bold is actually **text** or *text* at word boundaries
  
  // Convert code blocks: ---- → ```
  md = md.replace(/^----$/gm, '```');
  
  // Convert admonitions: NOTE: → **Note:**
  md = md.replace(/^NOTE:\s*/gm, '**Note:** ');
  md = md.replace(/^TIP:\s*/gm, '**Tip:** ');
  md = md.replace(/^WARNING:\s*/gm, '**Warning:** ');
  md = md.replace(/^IMPORTANT:\s*/gm, '**Important:** ');
  
  // Remove AsciiDoc attributes/metadata lines
  md = md.replace(/^:.*:.*$/gm, '');
  
  // Remove include directives
  md = md.replace(/^include::.*$/gm, '');
  
  // Remove anchor references [[...]]
  md = md.replace(/^\[\[.*?\]\]$/gm, '');
  
  // Convert AsciiDoc links
  md = md.replace(/link:([^\[]+)\[([^\]]+)\]/g, '[$2]($1)');
  
  // Remove role/class markers [.someclass]
  md = md.replace(/^\[\..*?\]$/gm, '');
  
  // Remove empty lines clusters (more than 2 blank lines → 2)
  md = md.replace(/\n{4,}/g, '\n\n\n');
  
  return md.trim();
}

async function downloadChapter(filename) {
  const outputName = filename.replace('.adoc', '.md').replace('.asciidoc', '.md');
  const outputPath = path.join(SOURCES_DIR, outputName);
  
  if (fs.existsSync(outputPath)) {
    return { file: filename, status: 'skipped' };
  }
  
  try {
    const url = BASE_URL + filename;
    const res = await fetch(url);
    if (!res.ok) {
      return { file: filename, status: 'error', code: res.status };
    }
    
    const adoc = await res.text();
    const md = adocToMarkdown(adoc);
    
    fs.writeFileSync(outputPath, md);
    return { file: filename, status: 'ok', size: md.length };
  } catch (err) {
    return { file: filename, status: 'error', message: err.message };
  }
}

async function main() {
  console.log(`Downloading ${CHAPTERS.length} Mastering Bitcoin chapters...`);
  console.log(`Output: ${SOURCES_DIR}\n`);
  
  for (const chapter of CHAPTERS) {
    const result = await downloadChapter(chapter);
    if (result.status === 'ok') {
      console.log(`✓ ${chapter} (${result.size} chars)`);
    } else if (result.status === 'skipped') {
      console.log(`⊘ ${chapter} (already exists)`);
    } else {
      console.log(`✗ ${chapter}: ${result.code || result.message}`);
    }
    await sleep(300);
  }
  
  console.log('\nDone!');
}

main().catch(console.error);
