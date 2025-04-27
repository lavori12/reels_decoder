// index.js

import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing Instagram URL' });
  }

  try {
    const snapinstaUrl = `https://snapinsta.app/api/ajaxSearch?query=${encodeURIComponent(url)}`;
    const response = await fetch(snapinstaUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    const data = await response.json();

    res.status(200).json({ videoUrl: data?.medias?.[0]?.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
