const https = require('https');

/**
 * HTTP Cloud Function Proxy relaying RAG chatbot requests to Google Gemini
 */
exports.geminiRelay = async (req, res) => {
  // 1. Enable CORS headers
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle CORS preflight browser options
  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  // 2. Fetch the API Key from the function environment variables
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'GEMINI_API_KEY environment variable is not configured on the GCP Cloud Function.' });
    return;
  }

  try {
    const { action, text, prompt, model } = req.body || {};

    if (!action) {
      res.status(400).json({ error: 'Missing parameter: "action" must be specified.' });
      return;
    }

    if (action === 'embed') {
      if (!text) {
        res.status(400).json({ error: 'Missing parameter: "text" is required for embedding action.' });
        return;
      }

      // Proxy to Google text-embedding-004
      const googleUrl = `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${apiKey}`;
      const payload = JSON.stringify({
        model: "models/text-embedding-004",
        content: { parts: [{ text: text }] }
      });
      
      const result = await makeHttpsRequest(googleUrl, 'POST', payload);
      res.status(200).send(result);
    } 
    else if (action === 'generate') {
      if (!prompt) {
        res.status(400).json({ error: 'Missing parameter: "prompt" is required for text generation.' });
        return;
      }

      // Proxy to Google content generator
      const targetModel = model || 'gemini-2.5-flash';
      const googleUrl = `https://generativelanguage.googleapis.com/v1beta/models/${targetModel}:generateContent?key=${apiKey}`;
      const payload = JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }]
      });

      const result = await makeHttpsRequest(googleUrl, 'POST', payload);
      res.status(200).send(result);
    } 
    else {
      res.status(400).json({ error: `Unsupported action "${action}". Must be "embed" or "generate".` });
    }
  } catch (err) {
    console.error('Error proxying to Gemini:', err);
    res.status(500).json({ error: 'GCP Proxy error: ' + err.message });
  }
};

/**
 * Helper executing ultra-fast, native HTTPS post request
 */
function makeHttpsRequest(url, method, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data);
        } else {
          reject(new Error(`Google API returned status ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (err) => reject(err));
    req.write(body);
    req.end();
  });
}
