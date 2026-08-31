import crypto from 'node:crypto';

// Secret key for HMAC token signing
function getSecret() {
  return process.env.ADMIN_JWT_SECRET || process.env.ADMIN_PASSWORD || 'secret-love-key-change-in-env';
}

// Generate signed session token (valid 24h)
export function createSessionToken() {
  const payload = {
    role: 'admin',
    exp: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
  };
  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', getSecret())
    .update(payloadB64)
    .digest('base64url');
  return `${payloadB64}.${signature}`;
}

// Verify Bearer token from request
export function verifySessionToken(authHeader) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }
  const token = authHeader.replace('Bearer ', '').trim();
  const parts = token.split('.');
  if (parts.length !== 2) {
    return false;
  }

  const [payloadB64, signature] = parts;
  const expectedSig = crypto
    .createHmac('sha256', getSecret())
    .update(payloadB64)
    .digest('base64url');

  if (signature !== expectedSig) {
    return false;
  }

  try {
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf-8'));
    if (!payload.exp || payload.exp < Date.now()) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

// Standard JSON HTTP response helper with CORS headers
export function jsonResponse(statusCode, body, extraHeaders = {}) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      ...extraHeaders
    },
    body: JSON.stringify(body)
  };
}
