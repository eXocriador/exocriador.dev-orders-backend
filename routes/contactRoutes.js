const express = require('express');
const router = express.Router();
const { createContact } = require('../controllers/contactController');
const { contactSchema } = require('../schemas/contactSchema');

// POST /api/contact - Створення нового контакту
router.post(
  '/',
  (req, res, next) => {
    try {
      const validatedData = contactSchema.parse(req.body);
      req.body = validatedData;
      next();
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      });
    }
  },
  createContact
);

module.exports = router;
