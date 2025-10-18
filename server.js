require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

const config = {
  email: process.env.EMAIL,
  name: process.env.USER_NAME,
  stack: process.env.STACK
};

// Validate required config
if (!config.email || !config.name || !config.stack) {
  console.error('Missing required environment variables');
  process.exit(1);
}

async function fetchCatFact() {
  try {
    const response = await axios.get('https://catfact.ninja/fact', { timeout: 5000 });
    return response.data.fact;
  } catch (error) {
    console.error('Cat Facts API Error:', error.message);
    return 'Cats have over 20 vocalizations, including the purr, meow, and hiss!';
  }
}

app.get('/me', async (req, res) => {
  try {
    const catFact = await fetchCatFact();
    const timestamp = new Date().toISOString();

    const response = {
      status: 'success',
      user: {
        email: config.email,
        name: config.name,       
        stack: config.stack
      },
      timestamp: timestamp,
      fact: catFact
    };

    res.status(200)
       .set('Content-Type', 'application/json')
       .json(response);

  } catch (error) {
    console.error('Internal server error:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

app.use((req, res) => {
  res.status(404).json({ status: 'error', message: 'Endpoint not found' });
});

app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ status: 'error', message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});