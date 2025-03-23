const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Stel een eenvoudige route in
app.get('/', (req, res) => {
  res.send('Hello from Node.js server!');
});

// Start de server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

