export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://www.penglogistics.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    // Handle preflight
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { pickup, dropoff, item_type, note } = req.body;
  const apiKey = process.env.DORA_API_KEY;

  try {
    const response = await fetch('https://api.usedora.com/v1/deliveries', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pickup,
        dropoff,
        item_type,
        note,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ message: 'Dora error', details: data });
    }

    return res.status(200).json({ message: 'Booking successful', data });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
}
