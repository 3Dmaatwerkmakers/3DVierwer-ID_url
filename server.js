const express = require('express');
const cors = require('cors');  // Zorg ervoor dat je cors importeert na express
const { google } = require('googleapis');
const app = express();
const port = process.env.PORT || 3000;

// Zorg ervoor dat CORS voor de app wordt ingesteld vóór de routes
app.use(cors());  // Dit staat alle bronnen toe om toegang te krijgen tot je API

// Voeg de test route toe
app.get('/api/test', (req, res) => {
  res.json({ message: 'Test route is working!' });
});

// Maak de Google Drive API client
async function getFile(fileId) {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'path-to-your-service-account-key.json', // Voeg hier je Google Service Account Key toe
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  });
  const client = await auth.getClient();
  
  const drive = google.drive({ version: 'v3', auth: client });
  
  const res = await drive.files.get({
    fileId: fileId,
    alt: 'media',
  });

  return res.data;
}

// Stel een route in voor de Google Drive API
app.get('/file/:id', async (req, res) => {
  try {
    const fileId = req.params.id;
    const fileData = await getFile(fileId);
    res.send(fileData);
  } catch (error) {
    res.status(500).send('Error fetching file from Google Drive');
  }
});

// Start de server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
