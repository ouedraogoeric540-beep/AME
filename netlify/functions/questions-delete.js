import { verifySessionToken, jsonResponse } from './utils/auth.js';
import { getQuestionsFromGitHub, saveQuestionsToGitHub } from './utils/github.js';

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return jsonResponse(200, {});
  }

  if (event.httpMethod !== 'DELETE' && event.httpMethod !== 'POST') {
    return jsonResponse(405, { error: 'Méthode non autorisée.' });
  }

  const authHeader = event.headers.authorization || event.headers.Authorization;
  if (!verifySessionToken(authHeader)) {
    return jsonResponse(401, { error: 'Session expirée ou non autorisée.' });
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const id = body.id || event.queryStringParameters?.id;

    if (!id) {
      return jsonResponse(400, { error: 'ID de la question à supprimer requis.' });
    }

    // 1. Fetch current questions and SHA
    const { questions: currentQuestions, sha } = await getQuestionsFromGitHub();

    const target = currentQuestions.find(q => q.id === id);
    if (!target) {
      return jsonResponse(404, { error: 'Question introuvable.' });
    }

    // 2. Filter out question
    const updatedQuestions = currentQuestions.filter(q => q.id !== id);

    // 3. Save to GitHub
    const result = await saveQuestionsToGitHub({
      questions: updatedQuestions,
      sha,
      commitMessage: `admin: suppression de la question "${target.question.slice(0, 40)}..."`
    });

    return jsonResponse(200, {
      success: true,
      message: 'Question supprimée avec succès sur GitHub.',
      id,
      commitSha: result.commitSha
    });
  } catch (err) {
    return jsonResponse(500, {
      error: 'Impossible de supprimer cette question.',
      details: err.message
    });
  }
}
