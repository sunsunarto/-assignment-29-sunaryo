export default async function handler(req, res) {
  const API_URL = 'https://course.summitglobal.id/students';

  try {
    const response = await fetch(API_URL, {
      method: req.method,
      headers: { 'Content-Type': 'application/json' },
      body: req.method === 'POST' || req.method === 'PUT' ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Proxy failed', details: error.message });
  }
}
