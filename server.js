const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
