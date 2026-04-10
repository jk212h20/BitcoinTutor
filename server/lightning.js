/**
 * Lightning Network service
 * Connects to Voltage LND node via REST API
 * Adapted from 960Throne project
 */

const LND_REST_URL = process.env.LND_REST_URL;
const LND_MACAROON = process.env.LND_MACAROON;

/**
 * Make an authenticated request to the LND REST API
 */
async function lndRequest(path, method = 'GET', body = null) {
  if (!LND_REST_URL || !LND_MACAROON) {
    throw new Error('LND node not configured. Set LND_REST_URL and LND_MACAROON.');
  }

  const url = `${LND_REST_URL}${path}`;
  const options = {
    method,
    headers: {
      'Grpc-Metadata-macaroon': LND_MACAROON,
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  let response;
  try {
    response = await fetch(url, options);
  } catch (fetchErr) {
    throw new Error(`LND connection failed (${path}): ${fetchErr.message}`);
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`LND API error (${response.status} on ${path}): ${errorText}`);
  }

  return await response.json();
}

/**
 * Get node info (alias, pubkey, etc.)
 */
async function getNodeInfo() {
  return await lndRequest('/v1/getinfo');
}

/**
 * Get channel balance (outbound liquidity = what we can spend)
 */
async function getChannelBalance() {
  return await lndRequest('/v1/balance/channels');
}

/**
 * Pay a BOLT11 invoice
 * IMPORTANT: LND returns HTTP 200 even when payment fails — check payment_error field
 */
async function payInvoice(payReq, amountSats = null) {
  const body = {
    payment_request: payReq,
    fee_limit: {
      fixed: '50', // Max 50 sats fee for small tips
    },
  };

  if (amountSats) {
    body.amt = String(amountSats);
  }

  const result = await lndRequest('/v1/channels/transactions', 'POST', body);

  if (result.payment_error) {
    throw new Error(`LND payment failed: ${result.payment_error}`);
  }

  return result;
}

/**
 * Check if LND node is configured and reachable
 */
async function isConfigured() {
  if (!LND_REST_URL || !LND_MACAROON) {
    return { configured: false, reason: 'LND_REST_URL or LND_MACAROON not set' };
  }

  try {
    const info = await getNodeInfo();
    return {
      configured: true,
      alias: info.alias,
      pubkey: info.identity_pubkey,
      synced: info.synced_to_chain,
    };
  } catch (error) {
    return { configured: false, reason: error.message };
  }
}

/**
 * Resolve a Lightning Address to LNURL-pay metadata
 */
async function resolveLightningAddress(address) {
  if (!address || !address.includes('@')) {
    throw new Error('Invalid Lightning Address format');
  }
  const [user, domain] = address.split('@');
  const url = `https://${domain}/.well-known/lnurlp/${user}`;
  
  const response = await fetch(url, { signal: AbortSignal.timeout(10000) });
  if (!response.ok) throw new Error(`Failed to resolve ${address}: ${response.status}`);
  
  const data = await response.json();
  if (data.status === 'ERROR') throw new Error(`Lightning Address error: ${data.reason}`);
  if (data.tag !== 'payRequest') throw new Error(`Unexpected tag: ${data.tag}`);
  
  return {
    callback: data.callback,
    minSendable: data.minSendable,
    maxSendable: data.maxSendable,
  };
}

/**
 * Request an invoice from a Lightning Address LNURL-pay endpoint
 */
async function requestInvoice(callback, amountSats, comment = '') {
  const amountMsats = amountSats * 1000;
  let url = `${callback}${callback.includes('?') ? '&' : '?'}amount=${amountMsats}`;
  if (comment) url += `&comment=${encodeURIComponent(comment)}`;
  
  const response = await fetch(url, { signal: AbortSignal.timeout(10000) });
  if (!response.ok) throw new Error(`Invoice request failed: ${response.status}`);
  
  const data = await response.json();
  if (data.status === 'ERROR') throw new Error(`Invoice error: ${data.reason}`);
  
  return { pr: data.pr };
}

/**
 * Pay a Lightning Address a specific amount
 * Full flow: resolve → get invoice → pay invoice
 */
async function payLightningAddress(address, amountSats, comment = '') {
  const lnurlData = await resolveLightningAddress(address);
  
  const minSats = Math.ceil(lnurlData.minSendable / 1000);
  const maxSats = Math.floor(lnurlData.maxSendable / 1000);
  if (amountSats < minSats) throw new Error(`Amount ${amountSats} below minimum ${minSats}`);
  if (amountSats > maxSats) throw new Error(`Amount ${amountSats} exceeds maximum ${maxSats}`);
  
  const invoiceData = await requestInvoice(lnurlData.callback, amountSats, comment);
  const payResult = await payInvoice(invoiceData.pr);
  
  return {
    success: true,
    paymentHash: payResult.payment_hash,
  };
}

module.exports = {
  getNodeInfo,
  getChannelBalance,
  payInvoice,
  payLightningAddress,
  isConfigured,
};
