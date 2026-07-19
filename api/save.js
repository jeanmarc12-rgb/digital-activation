const SITE_CONFIGS = {
  'casa-santiago': {
    envKey: 'ADMIN_KEY_CASA_SANTIAGO',
    files: [
      'demos/casa-santiago/_data/content.json',
      'demos/casa-santiago/_data/menu.json',
    ],
  },
  'o-batareo': {
    envKey: 'ADMIN_KEY_O_BATAREO',
    files: [
      'demos/o-batareo/_data/content.json',
      'demos/o-batareo/_data/menu.json',
    ],
  },
  'barber-studio': {
    envKey: 'ADMIN_KEY_BARBER_STUDIO',
    files: [
      'demos/barber-studio/_data/content.json',
      'demos/barber-studio/_data/servicos.json',
    ],
  },
  'tradicoes': {
    envKey: 'ADMIN_KEY_TRADICOES',
    files: [
      'demos/tradicoes/_data/content.json',
    ],
  },
  'marias-maneis': {
    envKey: 'ADMIN_KEY_MARIAS_MANEIS',
    files: [
      'demos/marias-maneis/_data/content.json',
    ],
  },
};

const REPO = 'jeanmarc12-rgb/digital-activation';

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido' });

  const { site, file, content, key } = req.body;

  const config = SITE_CONFIGS[site];
  if (!config) return res.status(400).json({ error: 'Site inválido' });

  const validKey = process.env[config.envKey];
  if (!validKey || key !== validKey) return res.status(401).json({ error: 'Link de acesso inválido' });

  if (!config.files.includes(file)) return res.status(400).json({ error: 'Ficheiro não permitido' });

  const pat = process.env.GITHUB_PAT;
  if (!pat) return res.status(500).json({ error: 'Configuração incompleta no servidor' });

  const ghHeaders = {
    'Authorization': `Bearer ${pat}`,
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  // Get current file SHA (required by GitHub API to update)
  const getRes = await fetch(`https://api.github.com/repos/${REPO}/contents/${file}`, {
    headers: ghHeaders,
  });

  if (!getRes.ok) {
    return res.status(500).json({ error: 'Erro ao ler ficheiro no GitHub' });
  }

  const { sha } = await getRes.json();

  const body = JSON.stringify(content, null, 2) + '\n';
  const encoded = Buffer.from(body).toString('base64');

  const updateRes = await fetch(`https://api.github.com/repos/${REPO}/contents/${file}`, {
    method: 'PUT',
    headers: { ...ghHeaders, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: `[admin] actualiza ${file.split('/').pop()}`,
      content: encoded,
      sha,
      branch: 'main',
    }),
  });

  if (!updateRes.ok) {
    const err = await updateRes.json();
    return res.status(500).json({ error: 'Erro ao guardar no GitHub', detail: err.message });
  }

  return res.status(200).json({ ok: true });
};
