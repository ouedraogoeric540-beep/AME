import crypto from 'node:crypto';

export function validateQuestionPayload(question) {
  if (!question || typeof question !== 'object') {
    return { valid: false, error: 'Données de la question invalides.' };
  }

  if (!question.question || typeof question.question !== 'string' || question.question.trim().length === 0) {
    return { valid: false, error: 'Le texte de la question est requis.' };
  }

  if (!Array.isArray(question.options) || question.options.length < 2 || question.options.length > 4) {
    return { valid: false, error: 'La question doit comporter entre 2 et 4 réponses.' };
  }

  let hasCorrectOption = false;
  for (let i = 0; i < question.options.length; i++) {
    const opt = question.options[i];
    if (!opt || typeof opt !== 'object') {
      return { valid: false, error: `Réponse #${i + 1} invalide.` };
    }
    if (!opt.text || typeof opt.text !== 'string' || opt.text.trim().length === 0) {
      return { valid: false, error: `Le texte de la réponse #${i + 1} est requis.` };
    }
    if (opt.isCorrect === true) {
      hasCorrectOption = true;
    }
  }

  if (!hasCorrectOption) {
    return { valid: false, error: 'Au moins une réponse correcte doit être sélectionnée.' };
  }

  // Format and clean question object
  const cleanedQuestion = {
    id: question.id || `q-${crypto.randomUUID().slice(0, 8)}`,
    question: question.question.trim(),
    active: typeof question.active === 'boolean' ? question.active : true,
    options: question.options.map((opt, idx) => ({
      id: opt.id || `opt-${crypto.randomUUID().slice(0, 8)}`,
      text: opt.text.trim(),
      isCorrect: Boolean(opt.isCorrect),
      feedback: opt.feedback ? opt.feedback.trim() : (opt.isCorrect ? 'Excellente réponse !' : 'Pas tout à fait.')
    }))
  };

  return { valid: true, question: cleanedQuestion };
}
