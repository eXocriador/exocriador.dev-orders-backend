require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const connectDB = require('./config/database');
const contactRoutes = require('./routes/contactRoutes');
const { corsMiddleware } = require('./middleware/cors');
const { errorHandler } = require('./middleware/errorHandler');
const { getEnvVar } = require('./utils/env');

const app = express();
const PORT = getEnvVar('PORT', 10000);

// Підключення до бази даних
connectDB();

// Middleware
app.use(helmet());
app.use(corsMiddleware);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API маршрути
app.use('/api/contact', contactRoutes);

// Тестовий маршрут
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: getEnvVar('NODE_ENV', 'development'),
  });
});

// Обробка помилок
app.use(errorHandler);

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
  console.log(`🌍 Environment: ${getEnvVar('NODE_ENV', 'development')}`);
  console.log(`🔗 API available at: http://localhost:${PORT}/api`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});

// Обробка необроблених помилок
process.on('unhandledRejection', (err) => {
  console.error('🔴 Unhandled Promise rejection:', err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('🔴 Uncaught Exception:', err);
  process.exit(1);
});
