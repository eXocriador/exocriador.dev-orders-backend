const cors = require('cors');
const { getEnvVar } = require('../utils/env');

const corsMiddleware = cors({
  origin: getEnvVar('FRONTEND_URL', 'http://localhost:5173'),
  credentials: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
});

module.exports = { corsMiddleware };
