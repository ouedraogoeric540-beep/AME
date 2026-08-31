import { verifySessionToken, jsonResponse } from './utils/auth.js';
import { getQuestionsFromGitHub, saveQuestionsToGitHub } from './utils/github.js';
import { validateQuestionPayload } from './utils/validation.js';

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return jsonResponse(200, {});
  }

  if (event.httpMethod !== 'PUT' && event.httpMethod !== 'POST') {
    return jsonResponse(405, { error: 'Méthode non autorisée.' });
  }

  const authHeader = event.headers.authorization || event.headers.Authorization;
  if (!verifySessionToken(authHeader)) {
    return jsonResponse(401, { error: 'Session expirée ou non autorisée.' });
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { valid, error, question } = validateQuestionPayload(body.question);

    if (!valid) {
      return jsonResponse(400, { error });
    }

    if (!question.id) {
      return jsonResponse(400, { error: 'ID de question manquant.' });
    }

    // 1. Fetch current questions and SHA
    const { questions: currentQuestions, sha } = await getQuestionsFromGitHub();

    // 2. Find and update
    const index = currentQuestions.findIndex(q => q.id === question.id);
    if (index === -1) {
      return jsonResponse(404, { error: 'Question introuvable.' });
    }

    const updatedQuestions = [...currentQuestions];
    updatedQuestions[index] = question;

    // 3. Save to GitHub
    const result = await saveQuestionsToGitHub({
      questions: updatedQuestions,
      sha,
      commitMessage: `admin: mise à jour de la question "${question.question.slice(0, 40)}..."`
    });

    return jsonResponse(200, {
      success: true,
      message: 'Question mise à jour avec succès sur GitHub.',
      question,
      commitSha: result.commitSha
    });
  } catch (err) {
    return jsonResponse(500, {
      error: 'Impossible de mettre à jour la question.',
      details: err.message
    });
  }
}
