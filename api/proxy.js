export default async function handler(req, res) {
  // On récupère l'URL complète demandée par ton Google Script
  const targetUrl = 'https://testnet.binance.vision' + req.url;

  try {
    let bodyData = undefined;
    if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
      bodyData = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    }

    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'Content-Type': req.headers['content-type'] || 'application/json',
        'X-MBX-APIKEY': req.headers['x-mbx-apikey'] || '',
      },
      body: bodyData,
    });

    const data = await response.text();
    res.status(response.status).send(data);
  } catch (error) {
    res.status(500).json({ error: 'Erreur proxy Vercel: ' + error.message });
  }
}
