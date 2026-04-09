/**
 * LNURL-auth Implementation
 * Passwordless login via Lightning wallet
 * 
 * Flow:
 * 1. Tutor suggests login → frontend calls /api/auth/challenge
 * 2. Server generates k1 hash, returns LNURL + QR data
 * 3. User scans QR with Lightning wallet
 * 4. Wallet calls /api/auth/callback with sig + key
 * 5. Server verifies signature, creates/finds user, links to session
 * 6. Frontend polls /api/auth/status/:k1 to detect login
 */
const crypto = require('crypto');
const secp256k1 = require('secp256k1');
const database = require('./database');

/**
 * Generate a new LNURL-auth challenge
 */
function generateChallenge(baseUrl, sessionId, visitorId) {
  // Random 32-byte challenge
  const k1 = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString(); // 5 minutes
  
  // Store challenge
  database.createChallenge(k1, expiresAt, sessionId, visitorId);
  
  // Build callback URL — this is what the wallet will call
  const callbackUrl = new URL('/api/auth/callback', baseUrl);
  callbackUrl.searchParams.set('tag', 'login');
  callbackUrl.searchParams.set('k1', k1);
  callbackUrl.searchParams.set('action', 'login');
  
  // Encode as LNURL (bech32)
  const lnurl = encodeLnurl(callbackUrl.toString());
  
  return {
    k1,
    lnurl,
    callback: callbackUrl.toString(),
    expiresAt,
  };
}

/**
 * Verify the callback from a Lightning wallet
 */
function verifyCallback(k1, sig, key) {
  if (!k1 || !sig || !key) {
    return { success: false, error: 'Missing required parameters' };
  }
  
  // Check challenge exists and is valid
  const challenge = database.getValidChallenge(k1);
  if (!challenge) {
    return { success: false, error: 'Invalid or expired challenge' };
  }
  
  // Verify the cryptographic signature
  try {
    const isValid = verifySignature(k1, sig, key);
    if (!isValid) {
      return { success: false, error: 'Invalid signature' };
    }
  } catch (error) {
    console.error('Signature verification error:', error);
    return { success: false, error: 'Signature verification failed' };
  }
  
  // Mark challenge as used
  database.markChallengeUsed(k1);
  
  // Find or create user by pubkey
  let user = database.getUserByPubkey(key);
  let isNewUser = false;
  if (!user) {
    user = database.createUser(key);
    isNewUser = true;
    console.log('New user created:', user.id, 'pubkey:', key.slice(0, 16) + '...');
  } else {
    database.updateLastLogin(user.id);
    console.log('User logged in:', user.id);
  }
  
  // Link visitor to user if we have a visitor ID
  if (challenge.visitor_id) {
    database.linkVisitorToUser(challenge.visitor_id, user.id);
  }
  
  return {
    success: true,
    userId: user.id,
    pubkey: key,
    isNewUser,
    sessionId: challenge.session_id,
    visitorId: challenge.visitor_id,
  };
}

/**
 * Verify secp256k1 signature (LNURL-auth standard)
 */
function verifySignature(k1, sigHex, pubkeyHex) {
  const k1Buffer = Buffer.from(k1, 'hex');
  const sigBuffer = Buffer.from(sigHex, 'hex');
  const pubkeyBuffer = Buffer.from(pubkeyHex, 'hex');
  
  // Hash the k1 challenge
  const messageHash = crypto.createHash('sha256').update(k1Buffer).digest();
  
  // The signature from LNURL-auth is DER encoded
  let sigCompact;
  try {
    sigCompact = secp256k1.signatureImport(sigBuffer);
  } catch {
    if (sigBuffer.length === 64) {
      sigCompact = sigBuffer;
    } else {
      throw new Error('Invalid signature format');
    }
  }
  
  return secp256k1.ecdsaVerify(sigCompact, messageHash, pubkeyBuffer);
}

// === Bech32/LNURL encoding ===

const BECH32_ALPHABET = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';

function encodeLnurl(url) {
  const words = bech32ConvertBits(Buffer.from(url, 'utf8'), 8, 5, true);
  return bech32Encode('lnurl', words).toUpperCase();
}

function bech32ConvertBits(data, fromBits, toBits, pad) {
  let acc = 0, bits = 0;
  const result = [];
  const maxv = (1 << toBits) - 1;
  for (let i = 0; i < data.length; i++) {
    acc = (acc << fromBits) | data[i];
    bits += fromBits;
    while (bits >= toBits) {
      bits -= toBits;
      result.push((acc >> bits) & maxv);
    }
  }
  if (pad && bits > 0) {
    result.push((acc << (toBits - bits)) & maxv);
  }
  return result;
}

function bech32Polymod(values) {
  const GEN = [0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3];
  let chk = 1;
  for (let i = 0; i < values.length; i++) {
    const top = chk >> 25;
    chk = ((chk & 0x1ffffff) << 5) ^ values[i];
    for (let j = 0; j < 5; j++) {
      if ((top >> j) & 1) chk ^= GEN[j];
    }
  }
  return chk;
}

function bech32HrpExpand(hrp) {
  const result = [];
  for (let i = 0; i < hrp.length; i++) result.push(hrp.charCodeAt(i) >> 5);
  result.push(0);
  for (let i = 0; i < hrp.length; i++) result.push(hrp.charCodeAt(i) & 31);
  return result;
}

function bech32Encode(hrp, data) {
  const values = bech32HrpExpand(hrp).concat(data).concat([0, 0, 0, 0, 0, 0]);
  const polymod = bech32Polymod(values) ^ 1;
  const checksum = [];
  for (let i = 0; i < 6; i++) checksum.push((polymod >> (5 * (5 - i))) & 31);
  const combined = data.concat(checksum);
  let result = hrp + '1';
  for (let i = 0; i < combined.length; i++) result += BECH32_ALPHABET[combined[i]];
  return result;
}

module.exports = {
  generateChallenge,
  verifyCallback,
};
