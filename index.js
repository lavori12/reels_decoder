import fetch from 'node-fetch';
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api', async (req, res) => {
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
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
