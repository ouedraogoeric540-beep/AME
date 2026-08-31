import { verifySessionToken, jsonResponse } from './utils/auth.js';
import { getSiteDataFromGitHub } from './utils/github.js';
import localSiteData from '../../src/data/siteData.json' with { type: 'json' };

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return jsonResponse(200, {});
  }

  const authHeader = event.headers.authorization || event.headers.Authorization;
  if (!verifySessionToken(authHeader)) {
    return jsonResponse(401, { error: 'Session expirée ou non autorisée.' });
  }

  try {
    const { siteData, sha } = await getSiteDataFromGitHub();
    return jsonResponse(200, {
      siteData,
      sha,
      source: 'github'
    });
  } catch (err) {
    if (err.message?.includes('CONFIG_MISSING')) {
      return jsonResponse(200, {
        siteData: localSiteData,
        sha: 'local-dev-sha',
        source: 'local',
        warning: 'Configuration GitHub manquante sur Netlify. Affichage des données locales.'
      });
    }

    return jsonResponse(500, {
      error: 'Impossible de charger les données du site depuis GitHub.',
      details: err.message
    });
  }
}
