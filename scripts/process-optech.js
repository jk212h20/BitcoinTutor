/**
 * Process raw Optech topic files into clean knowledge base entries.
 * Extracts just the explanatory content, removes navigation/changelog noise.
 * Outputs clean markdown files with frontmatter metadata.
 */
const fs = require('fs');
const path = require('path');

const SOURCES_DIR = path.join(__dirname, '..', 'knowledge', 'sources', 'optech');
const OUTPUT_DIR = path.join(__dirname, '..', 'knowledge', 'topics');
const INDEX_PATH = path.join(SOURCES_DIR, 'topics-index.json');

// Domain classification based on keywords in the topic and content
const DOMAIN_RULES = [
  { domain: 'lightning', keywords: ['lightning', 'ln ', 'channel', 'htlc', 'payment channel', 'routing', 'bolt', 'invoice', 'onion', 'trampoline', 'splicing', 'watchtower', 'submarine swap', 'lsp', 'ptlc', 'keysend', 'spontaneous payment', 'async payment', 'hold invoice', 'amp ', 'multipath', 'blinded path', 'rendez-vous', 'offers', 'lnurl'] },
  { domain: 'transactions', keywords: ['transaction', 'utxo', 'fee', 'rbf', 'cpfp', 'replace-by-fee', 'batching', 'coin selection', 'output', 'input', 'psbt', 'mempool', 'relay', 'package', 'pinning', 'anchor', 'dust', 'uneconomical'] },
  { domain: 'mining', keywords: ['mining', 'miner', 'proof of work', 'pow', 'difficulty', 'block reward', 'halving', 'asicboost', 'selfish mining', 'block withholding', 'pool', 'stratum', 'compact block', 'template'] },
  { domain: 'cryptography', keywords: ['schnorr', 'ecdsa', 'signature', 'hash', 'musig', 'multisig', 'threshold', 'key', 'pubkey', 'private key', 'adaptor', 'bls', 'nonce', 'entropy', 'random'] },
  { domain: 'script', keywords: ['script', 'opcode', 'op_', 'taproot', 'tapscript', 'segwit', 'witness', 'p2pkh', 'p2sh', 'p2wsh', 'p2tr', 'miniscript', 'descriptor', 'covenant', 'ctv', 'mast', 'timelock', 'cltv', 'csv'] },
  { domain: 'privacy', keywords: ['privacy', 'coinjoin', 'payjoin', 'coin swap', 'anonymous', 'dandelion', 'tor', 'onion', 'output linking', 'address reuse', 'silent payment', 'bip47'] },
  { domain: 'network', keywords: ['network', 'node', 'peer', 'p2p', 'relay', 'propagation', 'erlay', 'addr', 'dns', 'eclipse', 'signet', 'testnet', 'bloom filter', 'compact filter', 'v2 transport'] },
  { domain: 'wallets', keywords: ['wallet', 'seed', 'bip39', 'hd ', 'derivation', 'backup', 'hardware wallet', 'descriptor', 'psbt', 'gap limit', 'label', 'codex32'] },
  { domain: 'scalability', keywords: ['scalability', 'sidechain', 'statechain', 'rollup', 'channel factory', 'ark', 'validity proof', 'utreexo', 'assumeutxo'] },
  { domain: 'consensus', keywords: ['consensus', 'soft fork', 'activation', 'bip9', 'bip8', 'speedy trial', 'fork', 'vulnerability', 'cve', 'time warp', 'duplicate transaction'] },
];

function classifyDomain(slug, content) {
  const text = (slug + ' ' + content).toLowerCase();
  const scores = {};
  
  for (const rule of DOMAIN_RULES) {
    scores[rule.domain] = 0;
    for (const kw of rule.keywords) {
      if (text.includes(kw)) {
        scores[rule.domain]++;
      }
    }
  }
  
  // Get top domain
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  if (sorted[0][1] > 0) {
    return sorted[0][0];
  }
  return 'general';
}

function classifyDifficulty(content) {
  // Rough heuristic based on content complexity
  const text = content.toLowerCase();
  const advancedKeywords = ['cryptographic', 'protocol', 'vulnerability', 'malleability', 'sighash', 'commitment scheme', 'zero knowledge', 'proof', 'aggregation', 'threshold', 'discreet log', 'quantum'];
  const intermediateKeywords = ['transaction', 'script', 'signature', 'channel', 'routing', 'mempool', 'feerate', 'witness', 'descriptor'];
  
  let advancedScore = 0;
  let intermediateScore = 0;
  
  for (const kw of advancedKeywords) {
    if (text.includes(kw)) advancedScore++;
  }
  for (const kw of intermediateKeywords) {
    if (text.includes(kw)) intermediateScore++;
  }
  
  if (advancedScore >= 3) return 5;
  if (advancedScore >= 2) return 4;
  if (intermediateScore >= 3) return 3;
  if (intermediateScore >= 1) return 2;
  return 1;
}

function extractCleanContent(raw) {
  const lines = raw.split('\n');
  
  // Extract title
  let title = '';
  let alsoCovers = [];
  let explanation = [];
  let relatedTopics = [];
  let inExplanation = false;
  let hitNoise = false;
  let foundRealContent = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    // Skip navigation breadcrumbs and HTML-like structure
    if (trimmed === '/ home / topics /') continue;
    if (trimmed === '' && !foundRealContent) continue;
    
    // Title
    if (trimmed.startsWith('# ') && !title) {
      title = trimmed.replace(/^# /, '');
      inExplanation = true;
      continue;
    }
    
    // "Also covering" line
    if (trimmed.startsWith('Also covering ')) {
      alsoCovers = trimmed.replace('Also covering ', '').split(/,\s*and\s*|\s*,\s*/).map(s => s.trim());
      continue;
    }
    
    // Stop at noise sections
    if (trimmed === 'Primary code and documentation' || 
        trimmed.startsWith('Optech newsletter') ||
        trimmed.match(/^\d{4}$/) ||  // Year headers
        trimmed === 'See also' ||
        trimmed.startsWith('Previous Topic:') ||
        trimmed.startsWith('Next Topic:') ||
        trimmed === 'Edit page' ||
        trimmed === 'Report Issue') {
      hitNoise = true;
    }
    
    // Related topics section
    if (trimmed === '## Related Topics') {
      // Read remaining related topics
      for (let j = i + 1; j < lines.length; j++) {
        const rl = lines[j].trim();
        const match = rl.match(/^- (.+?) \(([^)]+)\)$/);
        if (match && match[2] !== '') {
          relatedTopics.push({ name: match[1], slug: match[2] });
        }
      }
      break;
    }
    
    // Collect explanation paragraphs (before the noise starts)
    if (inExplanation && !hitNoise) {
      // Skip navigation/HTML cruft that appears before the real content
      // Real content starts with a sentence (capital letter or quote), not with HTML-like markup
      if (!foundRealContent) {
        // Skip empty lines, lines that look like HTML/navigation remnants
        if (trimmed === '') continue;
        if (trimmed.match(/^\s*$/)) continue;
        if (trimmed.match(/^[\/\s]*home/i)) continue;
        // Detect title repetition in the HTML structure
        if (trimmed === title) continue;
        // Skip lines that are just the title with extra whitespace
        if (trimmed.replace(/\s+/g, ' ') === title) continue;
        // Skip very short lines that look like HTML artifacts (not sentences)
        if (trimmed.length < 20 && !trimmed.match(/[.!?]$/)) continue;
        
        // This looks like real content - a sentence
        foundRealContent = true;
      }
      
      explanation.push(line);
    }
  }
  
  // Clean up explanation - trim trailing empty lines
  while (explanation.length > 0 && explanation[explanation.length - 1].trim() === '') {
    explanation.pop();
  }
  
  // Final cleanup: remove any remaining HTML-like artifacts
  let cleanExplanation = explanation.join('\n').trim();
  // Remove leading empty lines
  cleanExplanation = cleanExplanation.replace(/^\s*\n+/, '');
  
  return {
    title,
    alsoCovers,
    explanation: cleanExplanation,
    relatedTopics,
  };
}

function main() {
  const index = JSON.parse(fs.readFileSync(INDEX_PATH, 'utf8'));
  
  console.log(`Processing ${index.length} Optech topics...\n`);
  
  const processedIndex = [];
  let domainCounts = {};
  
  for (const topic of index) {
    const sourcePath = path.join(SOURCES_DIR, `${topic.slug}.md`);
    if (!fs.existsSync(sourcePath)) {
      console.log(`⊘ ${topic.slug} — source file not found`);
      continue;
    }
    
    const raw = fs.readFileSync(sourcePath, 'utf8');
    const { title, alsoCovers, explanation, relatedTopics } = extractCleanContent(raw);
    
    if (!explanation || explanation.length < 50) {
      console.log(`⊘ ${topic.slug} — no useful explanation found (${explanation.length} chars)`);
      continue;
    }
    
    const domain = classifyDomain(topic.slug, explanation);
    const difficulty = classifyDifficulty(explanation);
    
    domainCounts[domain] = (domainCounts[domain] || 0) + 1;
    
    // Build frontmatter
    const frontmatter = [
      '---',
      `title: "${title}"`,
      `slug: "${topic.slug}"`,
      `domain: ${domain}`,
      `difficulty: ${difficulty}`,
      `source: optech`,
    ];
    
    if (alsoCovers.length > 0) {
      frontmatter.push(`aliases: [${alsoCovers.map(a => `"${a}"`).join(', ')}]`);
    }
    
    if (relatedTopics.length > 0) {
      frontmatter.push(`related: [${relatedTopics.map(r => `"${r.slug}"`).join(', ')}]`);
    }
    
    frontmatter.push('---');
    
    const output = frontmatter.join('\n') + '\n\n' + explanation + '\n';
    
    // Save to domain subdirectory
    const domainDir = path.join(OUTPUT_DIR, domain);
    if (!fs.existsSync(domainDir)) {
      fs.mkdirSync(domainDir, { recursive: true });
    }
    
    const outputPath = path.join(domainDir, `${topic.slug}.md`);
    fs.writeFileSync(outputPath, output);
    
    processedIndex.push({
      slug: topic.slug,
      title,
      domain,
      difficulty,
      alsoCovers,
      related: relatedTopics.map(r => r.slug),
      charCount: explanation.length,
    });
    
    console.log(`✓ ${topic.slug} → ${domain} (difficulty ${difficulty}, ${explanation.length} chars)`);
  }
  
  // Save processed index
  const indexOutputPath = path.join(OUTPUT_DIR, 'index.json');
  fs.writeFileSync(indexOutputPath, JSON.stringify(processedIndex, null, 2));
  
  console.log(`\n--- Summary ---`);
  console.log(`Total processed: ${processedIndex.length}`);
  console.log(`Domain breakdown:`);
  for (const [domain, count] of Object.entries(domainCounts).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${domain}: ${count}`);
  }
  console.log(`\nIndex saved to ${indexOutputPath}`);
}

main();
