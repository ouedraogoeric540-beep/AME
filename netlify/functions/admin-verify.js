import { verifySessionToken, jsonResponse } from './utils/auth.js';

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return jsonResponse(200, {});
  }

  const authHeader = event.headers.authorization || event.headers.Authorization;

  if (!verifySessionToken(authHeader)) {
    return jsonResponse(401, {
      authenticated: false,
      error: 'Session invalide ou expirée.'
    });
  }

  return jsonResponse(200, {
    authenticated: true,
    message: 'Session valide.'
  });
}
