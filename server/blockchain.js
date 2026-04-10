/**
 * Live Blockchain Data Tools
 * Uses mempool.space and Blockchair APIs (free, no key required)
 * Gives the tutor access to real-time Bitcoin network data
 */
const fetch = require('node-fetch');

const MEMPOOL_BASE = 'https://mempool.space/api';
const BLOCKCHAIR_BASE = 'https://api.blockchair.com/bitcoin';

// Simple cache to avoid hammering APIs (cache for 60 seconds)
const cache = new Map();
function cached(key, ttlMs, fetcher) {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.time < ttlMs) return Promise.resolve(entry.data);
  return fetcher().then(data => {
    cache.set(key, { data, time: Date.now() });
    return data;
  });
}

// === Mempool.space API calls ===

/** Get latest block info */
async function getLatestBlock() {
  return cached('latest-block', 30000, async () => {
    const res = await fetch(`${MEMPOOL_BASE}/v1/blocks`);
    const blocks = await res.json();
    const b = blocks[0];
    const maxWeight = 4000000; // max block weight
    const fullness = ((b.weight / maxWeight) * 100).toFixed(1);
    return {
      height: b.height,
      hash: b.id,
      timestamp: new Date(b.timestamp * 1000).toISOString(),
      minutesAgo: Math.round((Date.now() / 1000 - b.timestamp) / 60),
      tx_count: b.tx_count,
      size_kb: Math.round(b.size / 1024),
      weight: b.weight,
      fullness_pct: parseFloat(fullness),
      fee_range_sat_vb: b.extras?.feeRange || null,
      miner: b.extras?.pool?.name || 'Unknown',
    };
  });
}

/** Get last N blocks summary */
async function getRecentBlocks(n = 5) {
  return cached(`recent-blocks-${n}`, 30000, async () => {
    const res = await fetch(`${MEMPOOL_BASE}/v1/blocks`);
    const blocks = await res.json();
    return blocks.slice(0, n).map(b => ({
      height: b.height,
      minutesAgo: Math.round((Date.now() / 1000 - b.timestamp) / 60),
      tx_count: b.tx_count,
      size_kb: Math.round(b.size / 1024),
      fullness_pct: parseFloat(((b.weight / 4000000) * 100).toFixed(1)),
      miner: b.extras?.pool?.name || 'Unknown',
    }));
  });
}

/** Get current mempool stats */
async function getMempoolStats() {
  return cached('mempool-stats', 30000, async () => {
    const res = await fetch(`${MEMPOOL_BASE}/mempool`);
    const m = await res.json();
    return {
      pending_tx_count: m.count,
      total_vsize_mb: (m.vsize / 1000000).toFixed(2),
      total_fees_btc: (m.total_fee / 100000000).toFixed(4),
      blocks_worth: Math.ceil(m.vsize / 1000000), // rough estimate
    };
  });
}

/** Get current fee estimates */
async function getFeeEstimates() {
  return cached('fee-estimates', 60000, async () => {
    const res = await fetch(`${MEMPOOL_BASE}/v1/fees/recommended`);
    const f = await res.json();
    return {
      next_block_sat_vb: f.fastestFee,
      thirty_min_sat_vb: f.halfHourFee,
      one_hour_sat_vb: f.hourFee,
      economy_sat_vb: f.economyFee,
      minimum_sat_vb: f.minimumFee,
      note: f.fastestFee <= 2 ? 'Fees are very low right now — great time to transact!' :
            f.fastestFee >= 50 ? 'Fees are quite high — mempool is congested.' :
            'Fees are moderate.',
    };
  });
}

/** Look up an address */
async function getAddress(address) {
  const res = await fetch(`${MEMPOOL_BASE}/address/${address}`);
  if (!res.ok) return { error: `Address not found or invalid: ${address}` };
  const a = await res.json();
  const stats = a.chain_stats;
  return {
    address: a.address,
    total_received_btc: (stats.funded_txo_sum / 100000000).toFixed(8),
    total_sent_btc: (stats.spent_txo_sum / 100000000).toFixed(8),
    balance_btc: ((stats.funded_txo_sum - stats.spent_txo_sum) / 100000000).toFixed(8),
    tx_count: stats.tx_count,
    funded_txo_count: stats.funded_txo_count,
    spent_txo_count: stats.spent_txo_count,
  };
}

/** Look up a transaction */
async function getTransaction(txid) {
  const res = await fetch(`${MEMPOOL_BASE}/tx/${txid}`);
  if (!res.ok) return { error: `Transaction not found: ${txid}` };
  const tx = await res.json();
  const totalInput = tx.vin.reduce((sum, v) => sum + (v.prevout?.value || 0), 0);
  const totalOutput = tx.vout.reduce((sum, v) => sum + v.value, 0);
  return {
    txid: tx.txid,
    confirmed: !!tx.status.confirmed,
    block_height: tx.status.block_height || null,
    block_time: tx.status.block_time ? new Date(tx.status.block_time * 1000).toISOString() : null,
    size_bytes: tx.size,
    weight: tx.weight,
    fee_sats: tx.fee,
    fee_rate_sat_vb: (tx.fee / (tx.weight / 4)).toFixed(1),
    input_count: tx.vin.length,
    output_count: tx.vout.length,
    total_input_btc: (totalInput / 100000000).toFixed(8),
    total_output_btc: (totalOutput / 100000000).toFixed(8),
  };
}

/** Get a specific block by height or hash */
async function getBlock(heightOrHash) {
  let hash = heightOrHash;
  // If it's a number, get the hash first
  if (/^\d+$/.test(String(heightOrHash))) {
    const hashRes = await fetch(`${MEMPOOL_BASE}/block-height/${heightOrHash}`);
    if (!hashRes.ok) return { error: `Block not found at height ${heightOrHash}` };
    hash = await hashRes.text();
  }
  const res = await fetch(`${MEMPOOL_BASE}/block/${hash}`);
  if (!res.ok) return { error: `Block not found: ${hash}` };
  const b = await res.json();
  return {
    height: b.height,
    hash: b.id,
    timestamp: new Date(b.timestamp * 1000).toISOString(),
    tx_count: b.tx_count,
    size_kb: Math.round(b.size / 1024),
    weight: b.weight,
    fullness_pct: parseFloat(((b.weight / 4000000) * 100).toFixed(1)),
    difficulty: b.difficulty,
    nonce: b.nonce,
    merkle_root: b.merkle_root,
    miner: b.extras?.pool?.name || 'Unknown',
    fee_range: b.extras?.feeRange || null,
    median_fee: b.extras?.medianFee || null,
    total_fees_btc: b.extras?.totalFees ? (b.extras.totalFees / 100000000).toFixed(8) : null,
    subsidy_btc: b.extras?.reward ? (b.extras.reward / 100000000).toFixed(8) : null,
  };
}

/** Get mining pool stats */
async function getMiningPools(period = '1w') {
  return cached(`mining-pools-${period}`, 300000, async () => {
    const res = await fetch(`${MEMPOOL_BASE}/v1/mining/pools/${period}`);
    const data = await res.json();
    return {
      period,
      total_blocks: data.blockCount,
      pools: data.pools.slice(0, 10).map(p => ({
        name: p.name,
        blocks: p.blockCount,
        share_pct: ((p.blockCount / data.blockCount) * 100).toFixed(1),
      })),
    };
  });
}

/** Get hashrate and difficulty */
async function getHashrateAndDifficulty() {
  return cached('hashrate', 300000, async () => {
    const res = await fetch(`${MEMPOOL_BASE}/v1/mining/hashrate/1m`);
    const data = await res.json();
    const hashrate = data.currentHashrate;
    // Format hashrate nicely
    let formatted;
    if (hashrate > 1e18) formatted = (hashrate / 1e18).toFixed(2) + ' EH/s';
    else if (hashrate > 1e15) formatted = (hashrate / 1e15).toFixed(2) + ' PH/s';
    else formatted = hashrate.toString() + ' H/s';
    
    return {
      hashrate_raw: hashrate,
      hashrate_formatted: formatted,
      difficulty: data.currentDifficulty,
      difficulty_formatted: (data.currentDifficulty / 1e12).toFixed(2) + ' T',
    };
  });
}

// === Blockchair API (for aggregate/stats queries) ===

/** Get Bitcoin network stats (price, supply, etc.) */
async function getNetworkStats() {
  return cached('network-stats', 120000, async () => {
    const res = await fetch(`${BLOCKCHAIR_BASE}/stats`);
    const data = await res.json();
    const s = data.data;
    return {
      blocks: s.blocks,
      total_transactions: s.transactions,
      market_price_usd: s.market_price_usd,
      market_cap_usd: s.market_cap_usd,
      circulation_btc: (s.circulation / 100000000).toFixed(2),
      supply_pct_mined: ((s.circulation / 2100000000000000) * 100).toFixed(2),
      next_halving_block: s.next_retarget_block || 'unknown',
      mempool_tx: s.mempool_transactions,
      mempool_size_mb: (s.mempool_size / 1000000).toFixed(2),
      suggested_fee_sat_vb: s.suggested_transaction_fee_per_byte_sat,
      hashrate_24h: s.hashrate_24h,
      difficulty: s.difficulty,
      inflation_rate_pct: s.inflation_rate ? (s.inflation_rate * 100).toFixed(4) : null,
    };
  });
}

// === Price ===

/** Get current Bitcoin price */
async function getPrice() {
  return cached('price', 120000, async () => {
    const res = await fetch(`${BLOCKCHAIR_BASE}/stats`);
    const data = await res.json();
    const s = data.data;
    return {
      price_usd: s.market_price_usd,
      market_cap_usd: s.market_cap_usd,
      note: 'Price data from Blockchair. Bitcoin is a volatile asset — this is a snapshot.',
    };
  });
}

// === Block transactions analysis ===

/** Get transactions from a specific block with analysis (largest, fees) */
async function getBlockTxs(heightOrHash) {
  let hash = heightOrHash;
  if (/^\d+$/.test(String(heightOrHash))) {
    const hashRes = await fetch(`${MEMPOOL_BASE}/block-height/${heightOrHash}`);
    if (!hashRes.ok) return { error: `Block not found at height ${heightOrHash}` };
    hash = await hashRes.text();
  }
  
  // Get block details
  const blockRes = await fetch(`${MEMPOOL_BASE}/block/${hash}`);
  if (!blockRes.ok) return { error: `Block not found: ${hash}` };
  const block = await blockRes.json();
  
  // Get txids list
  const txidsRes = await fetch(`${MEMPOOL_BASE}/block/${hash}/txids`);
  if (!txidsRes.ok) return { error: 'Could not fetch block transactions' };
  const txids = await txidsRes.json();
  
  // Fetch first 25 txs (to find notable ones — full block would be too many API calls)
  // But mempool.space has a bulk endpoint: /block/:hash/txs/:startIndex
  const txsRes = await fetch(`${MEMPOOL_BASE}/block/${hash}/txs/0`);
  const txs = await txsRes.json();
  
  // Sort by output value to find largest
  const analyzed = txs.map(tx => {
    const totalOutput = tx.vout.reduce((sum, v) => sum + v.value, 0);
    return {
      txid: tx.txid,
      total_output_btc: (totalOutput / 100000000).toFixed(8),
      total_output_sats: totalOutput,
      fee_sats: tx.fee,
      fee_rate_sat_vb: parseFloat((tx.fee / (tx.weight / 4)).toFixed(1)),
      input_count: tx.vin.length,
      output_count: tx.vout.length,
      size_bytes: tx.size,
      is_coinbase: tx.vin[0]?.is_coinbase || false,
    };
  });
  
  // Sort by value
  const byValue = [...analyzed].filter(t => !t.is_coinbase).sort((a, b) => b.total_output_sats - a.total_output_sats);
  const byFee = [...analyzed].filter(t => !t.is_coinbase).sort((a, b) => b.fee_sats - a.fee_sats);
  const byFeeRate = [...analyzed].filter(t => !t.is_coinbase).sort((a, b) => b.fee_rate_sat_vb - a.fee_rate_sat_vb);
  
  // Fee stats
  const fees = analyzed.filter(t => !t.is_coinbase).map(t => t.fee_rate_sat_vb);
  const avgFeeRate = fees.length > 0 ? (fees.reduce((a, b) => a + b, 0) / fees.length).toFixed(1) : 0;
  const medianFeeRate = fees.length > 0 ? fees.sort((a, b) => a - b)[Math.floor(fees.length / 2)].toFixed(1) : 0;
  const totalFees = analyzed.reduce((sum, t) => sum + t.fee_sats, 0);
  
  return {
    block_height: block.height,
    block_hash: block.id,
    total_txs: block.tx_count,
    analyzed_txs: analyzed.length,
    fee_summary: {
      total_fees_btc: (totalFees / 100000000).toFixed(8),
      total_fees_sats: totalFees,
      avg_fee_rate_sat_vb: parseFloat(avgFeeRate),
      median_fee_rate_sat_vb: parseFloat(medianFeeRate),
      min_fee_rate: fees.length > 0 ? Math.min(...fees) : 0,
      max_fee_rate: fees.length > 0 ? Math.max(...fees) : 0,
    },
    largest_by_value: byValue.slice(0, 5).map(t => ({
      txid: t.txid,
      btc: t.total_output_btc,
      fee_sats: t.fee_sats,
      inputs: t.input_count,
      outputs: t.output_count,
    })),
    highest_fee_txs: byFee.slice(0, 5).map(t => ({
      txid: t.txid,
      fee_sats: t.fee_sats,
      fee_rate: t.fee_rate_sat_vb,
      btc: t.total_output_btc,
    })),
    highest_fee_rate_txs: byFeeRate.slice(0, 3).map(t => ({
      txid: t.txid,
      fee_rate: t.fee_rate_sat_vb,
      fee_sats: t.fee_sats,
    })),
    miner: block.extras?.pool?.name || 'Unknown',
  };
}

// === Halving info (computed) ===

function getHalvingInfo() {
  // Halving happens every 210,000 blocks
  // Block 0: 50 BTC, Block 210000: 25 BTC, Block 420000: 12.5 BTC, 
  // Block 630000: 6.25 BTC, Block 840000: 3.125 BTC
  const halvings = [
    { block: 0, reward: 50, date: '2009-01-03' },
    { block: 210000, reward: 25, date: '2012-11-28' },
    { block: 420000, reward: 12.5, date: '2016-07-09' },
    { block: 630000, reward: 6.25, date: '2020-05-11' },
    { block: 840000, reward: 3.125, date: '2024-04-19' },
  ];
  const nextHalvingBlock = 1050000;
  const nextReward = 1.5625;
  
  return {
    halvings,
    next_halving_block: nextHalvingBlock,
    next_reward_btc: nextReward,
    halving_interval: 210000,
    total_possible_halvings: 33,
    note: 'Bitcoin halves the block reward every 210,000 blocks (~4 years). The reward will eventually round to 0 around year 2140.',
  };
}

/**
 * Execute a blockchain tool call from the LLM
 * Returns a string result that gets injected into the conversation
 */
async function executeBlockchainTool(call) {
  try {
    switch (call.action) {
      case 'latest_block':
        return JSON.stringify(await getLatestBlock(), null, 2);
      
      case 'recent_blocks':
        return JSON.stringify(await getRecentBlocks(call.count || 5), null, 2);
      
      case 'mempool':
        return JSON.stringify(await getMempoolStats(), null, 2);
      
      case 'fees':
        return JSON.stringify(await getFeeEstimates(), null, 2);
      
      case 'address':
        if (!call.address) return 'Error: address parameter required';
        return JSON.stringify(await getAddress(call.address), null, 2);
      
      case 'transaction':
        if (!call.txid) return 'Error: txid parameter required';
        return JSON.stringify(await getTransaction(call.txid), null, 2);
      
      case 'block':
        if (!call.height && !call.hash) return 'Error: height or hash parameter required';
        return JSON.stringify(await getBlock(call.height || call.hash), null, 2);
      
      case 'mining_pools':
        return JSON.stringify(await getMiningPools(call.period || '1w'), null, 2);
      
      case 'hashrate':
        return JSON.stringify(await getHashrateAndDifficulty(), null, 2);
      
      case 'network_stats':
        return JSON.stringify(await getNetworkStats(), null, 2);
      
      case 'halving_info':
        return JSON.stringify(getHalvingInfo(), null, 2);
      
      case 'price':
        return JSON.stringify(await getPrice(), null, 2);
      
      case 'block_txs':
        if (!call.height && !call.hash) return 'Error: height or hash parameter required';
        return JSON.stringify(await getBlockTxs(call.height || call.hash), null, 2);
      
      default:
        return `Unknown blockchain action: ${call.action}`;
    }
  } catch (err) {
    console.error(`Blockchain tool error (${call.action}):`, err.message);
    return `Error fetching blockchain data: ${err.message}`;
  }
}

module.exports = {
  executeBlockchainTool,
  // Export individual functions for direct use
  getLatestBlock,
  getRecentBlocks,
  getMempoolStats,
  getFeeEstimates,
  getAddress,
  getTransaction,
  getBlock,
  getMiningPools,
  getHashrateAndDifficulty,
  getNetworkStats,
  getHalvingInfo,
};
