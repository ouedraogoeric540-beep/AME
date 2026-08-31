import { verifySessionToken, jsonResponse } from './utils/auth.js';
import { getQuestionsFromGitHub } from './utils/github.js';
import localQuestions from '../../src/data/questions.json' with { type: 'json' };

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return jsonResponse(200, {});
  }

  const authHeader = event.headers.authorization || event.headers.Authorization;
  if (!verifySessionToken(authHeader)) {
    return jsonResponse(401, { error: 'Session expirée ou non autorisée.' });
  }

  try {
    // Attempt fetching live version from GitHub
    const { questions, sha } = await getQuestionsFromGitHub();
    return jsonResponse(200, {
      questions,
      sha,
      source: 'github'
    });
  } catch (err) {
    // If GitHub is not yet configured (e.g. initial setup/local test), return local fallback with warning
    if (err.message?.includes('CONFIG_MISSING')) {
      return jsonResponse(200, {
        questions: localQuestions,
        sha: 'local-dev-sha',
        source: 'local',
        warning: 'Configuration GitHub manquante sur Netlify. Affichage des données locales.'
      });
    }

    return jsonResponse(500, {
      error: 'Impossible de charger les questions depuis GitHub.',
      details: err.message
    });
  }
}
