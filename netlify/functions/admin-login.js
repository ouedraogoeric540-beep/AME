import { createSessionToken, jsonResponse } from './utils/auth.js';

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return jsonResponse(200, {});
  }

  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { error: 'Méthode non autorisée.' });
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { password } = body;

    const expectedPassword = process.env.ADMIN_PASSWORD;

    if (!expectedPassword) {
      return jsonResponse(500, {
        error: 'ADMIN_PASSWORD non configuré dans les variables d\'environnement Netlify.'
      });
    }

    if (!password || password !== expectedPassword) {
      return jsonResponse(401, {
        error: 'Mot de passe incorrect.'
      });
    }

    // Generate secure token
    const token = createSessionToken();

    return jsonResponse(200, {
      success: true,
      token,
      message: 'Connexion réussie.'
    });
  } catch {
    return jsonResponse(400, {
      error: 'Requête invalide.'
    });
  }
}
