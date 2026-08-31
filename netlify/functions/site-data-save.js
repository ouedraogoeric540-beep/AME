import { verifySessionToken, jsonResponse } from './utils/auth.js';
import { getSiteDataFromGitHub, saveSiteDataToGitHub, saveFileToGitHub } from './utils/github.js';

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return jsonResponse(200, {});
  }

  if (event.httpMethod !== 'POST' && event.httpMethod !== 'PUT') {
    return jsonResponse(405, { error: 'Méthode non autorisée.' });
  }

  const authHeader = event.headers.authorization || event.headers.Authorization;
  if (!verifySessionToken(authHeader)) {
    return jsonResponse(401, { error: 'Session expirée ou non autorisée.' });
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { siteData, sectionName } = body;

    if (!siteData || typeof siteData !== 'object') {
      return jsonResponse(400, { error: 'Données du site invalides.' });
    }

    // 1. Fetch current SHA from GitHub
    const { sha: currentSha, siteData: existingData } = await getSiteDataFromGitHub();

    // 2. Merge data cleanly
    const updatedData = {
      ...existingData,
      ...siteData
    };

    const commitMessage = sectionName
      ? `admin: mise à jour de la section "${sectionName}"`
      : 'admin: mise à jour des paramètres du site';

    // 3. Save to GitHub
    const result = await saveSiteDataToGitHub({
      siteData: updatedData,
      sha: currentSha,
      commitMessage
    });

    // Also sync questions.json if quiz was modified
    if (updatedData.quiz?.questions) {
      try {
        const questionsRes = await getSiteDataFromGitHub();
        await saveFileToGitHub({
          filePath: 'src/data/questions.json',
          data: updatedData.quiz.questions,
          sha: questionsRes.sha,
          commitMessage: 'admin: sync questions.json'
        }).catch(() => {});
      } catch {
        // Ignore secondary sync error
      }
    }

    return jsonResponse(200, {
      success: true,
      message: 'Données enregistrées et commitées avec succès sur GitHub.',
      siteData: updatedData,
      commitSha: result.commitSha
    });
  } catch (err) {
    return jsonResponse(500, {
      error: 'Impossible d\'enregistrer les données du site.',
      details: err.message
    });
  }
}
