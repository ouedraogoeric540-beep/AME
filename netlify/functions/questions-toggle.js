import { verifySessionToken, jsonResponse } from './utils/auth.js';
import { getQuestionsFromGitHub, saveQuestionsToGitHub } from './utils/github.js';

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return jsonResponse(200, {});
  }

  if (event.httpMethod !== 'PATCH' && event.httpMethod !== 'POST') {
    return jsonResponse(405, { error: 'Méthode non autorisée.' });
  }

  const authHeader = event.headers.authorization || event.headers.Authorization;
  if (!verifySessionToken(authHeader)) {
    return jsonResponse(401, { error: 'Session expirée ou non autorisée.' });
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { id, active } = body;

    if (!id) {
      return jsonResponse(400, { error: 'ID de question manquant.' });
    }

    // 1. Fetch current questions and SHA
    const { questions: currentQuestions, sha } = await getQuestionsFromGitHub();

    const index = currentQuestions.findIndex(q => q.id === id);
    if (index === -1) {
      return jsonResponse(404, { error: 'Question introuvable.' });
    }

    // Determine new state
    const newActiveState = typeof active === 'boolean' ? active : !currentQuestions[index].active;

    const updatedQuestions = [...currentQuestions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      active: newActiveState
    };

    const actionText = newActiveState ? 'activation' : 'suspension';

    // 2. Save to GitHub
    const result = await saveQuestionsToGitHub({
      questions: updatedQuestions,
      sha,
      commitMessage: `admin: ${actionText} de la question "${updatedQuestions[index].question.slice(0, 35)}..."`
    });

    return jsonResponse(200, {
      success: true,
      message: `Question ${newActiveState ? 'activée' : 'suspendue'} avec succès.`,
      id,
      active: newActiveState,
      commitSha: result.commitSha
    });
  } catch (err) {
    return jsonResponse(500, {
      error: 'Impossible de modifier l\'état de la question.',
      details: err.message
    });
  }
}
