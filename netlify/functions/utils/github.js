// Helper to interact with GitHub Contents API without any database

function getGitHubConfig() {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || 'main';
  const siteDataPath = 'src/data/siteData.json';
  const questionsPath = 'src/data/questions.json';

  return { token, owner, repo, branch, siteDataPath, questionsPath };
}

// Generic file fetcher from GitHub
export async function getFileFromGitHub(filePath) {
  const { token, owner, repo, branch } = getGitHubConfig();

  if (!token || !owner || !repo) {
    throw new Error('CONFIG_MISSING: GITHUB_TOKEN, GITHUB_OWNER ou GITHUB_REPO non configuré(s) dans Netlify.');
  }

  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`;
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github+json',
      'User-Agent': 'MalMe-Admin-Netlify-Function'
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erreur GitHub (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const rawContent = Buffer.from(data.content, 'base64').toString('utf-8');
  const parsedData = JSON.parse(rawContent);

  return {
    data: parsedData,
    sha: data.sha
  };
}

// Generic file saver & committer to GitHub
export async function saveFileToGitHub({ filePath, data, sha, commitMessage }) {
  const { token, owner, repo, branch } = getGitHubConfig();

  if (!token || !owner || !repo) {
    throw new Error('CONFIG_MISSING: GITHUB_TOKEN, GITHUB_OWNER ou GITHUB_REPO non configuré(s) dans Netlify.');
  }

  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
  const jsonContent = JSON.stringify(data, null, 2);
  const base64Content = Buffer.from(jsonContent, 'utf-8').toString('base64');

  const body = {
    message: commitMessage || 'admin: mise à jour des données',
    content: base64Content,
    sha,
    branch
  };

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github+json',
      'Content-Type': 'application/json',
      'User-Agent': 'MalMe-Admin-Netlify-Function'
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erreur lors du commit GitHub (${response.status}): ${errorText}`);
  }

  const resData = await response.json();
  return {
    success: true,
    commitSha: resData.commit?.sha,
    newFileSha: resData.content?.sha
  };
}

// Specialized helpers for siteData.json
export async function getSiteDataFromGitHub() {
  const { siteDataPath } = getGitHubConfig();
  const result = await getFileFromGitHub(siteDataPath);
  return {
    siteData: result.data,
    sha: result.sha
  };
}

export async function saveSiteDataToGitHub({ siteData, sha, commitMessage }) {
  const { siteDataPath } = getGitHubConfig();
  return saveFileToGitHub({
    filePath: siteDataPath,
    data: siteData,
    sha,
    commitMessage: commitMessage || 'admin: mise à jour globale du site MalMe'
  });
}

// Specialized helpers for questions.json (backwards compatibility)
export async function getQuestionsFromGitHub() {
  const { siteDataPath } = getGitHubConfig();
  try {
    const result = await getFileFromGitHub(siteDataPath);
    return {
      questions: result.data.quiz?.questions || [],
      sha: result.sha,
      fullSiteData: result.data
    };
  } catch {
    const { questionsPath } = getGitHubConfig();
    const result = await getFileFromGitHub(questionsPath);
    return {
      questions: result.data,
      sha: result.sha
    };
  }
}

export async function saveQuestionsToGitHub({ questions, sha, commitMessage }) {
  const { siteDataPath } = getGitHubConfig();
  try {
    const result = await getFileFromGitHub(siteDataPath);
    const updatedSiteData = {
      ...result.data,
      quiz: {
        ...(result.data.quiz || {}),
        questions
      }
    };
    return saveSiteDataToGitHub({
      siteData: updatedSiteData,
      sha: result.sha,
      commitMessage
    });
  } catch {
    const { questionsPath } = getGitHubConfig();
    return saveFileToGitHub({
      filePath: questionsPath,
      data: questions,
      sha,
      commitMessage
    });
  }
}
