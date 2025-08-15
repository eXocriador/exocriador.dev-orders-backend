const { z } = require('zod');

const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be no more than 50 characters')
    .regex(
      /^[a-zA-Zа-яА-ЯіІїЇєЄ\s'-]+$/,
      'Name can only contain letters, spaces, hyphens and apostrophes'
    ),
  email: z
    .string()
    .email('Invalid email format')
    .min(5, 'Email must be at least 5 characters')
    .max(100, 'Email must be no more than 100 characters'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be no more than 1000 characters')
    .regex(
      /^[^<>{}]*$/,
      'Message cannot contain HTML tags or special characters'
    ),
});

module.exports = { contactSchema };
