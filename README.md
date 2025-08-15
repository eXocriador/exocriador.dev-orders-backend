# eXocriador Backend API

Backend API для обробки контактної форми з eXocriador.dev

## 🚀 Швидкий старт

### Вимоги

- Node.js 18+
- MongoDB 5+
- npm або yarn

### Встановлення

1. Клонуйте репозиторій
2. Перейдіть в папку backend:

```bash
cd backend
```

3. Встановіть залежності:

```bash
npm install
```

4. Створіть файл `.env` на основі `env.example`:

```bash
cp env.example .env
```

5. Налаштуйте змінні середовища в `.env`:

```env
MONGODB_URI=mongodb://localhost:27017/exocriador_dev
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

6. Запустіть сервер:

```bash
# Розробка
npm run dev

# Продакшн
npm start
```

## 📊 API Endpoints

### Контактна форма

#### POST `/api/contact`

Створення нового контакту

**Body:**

```json
{
  "name": "Ім'я користувача",
  "email": "user@example.com",
  "message": "Текст повідомлення"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Повідомлення успішно відправлено!",
  "data": {
    "id": "64f1a2b3c4d5e6f7g8h9i0j1",
    "name": "Ім'я користувача",
    "email": "user@example.com",
    "createdAt": "2023-09-01T12:00:00.000Z"
  }
}
```

#### GET `/api/contact`

Отримання всіх контактів (з пагінацією)

**Query параметри:**

- `page` - номер сторінки (за замовчуванням: 1)
- `limit` - кількість елементів на сторінці (за замовчуванням: 10)
- `status` - фільтр за статусом (new, read, replied, archived)
- `sortBy` - поле для сортування (за замовчуванням: createdAt)
- `sortOrder` - порядок сортування (asc, desc)

#### GET `/api/contact/:id`

Отримання конкретного контакту за ID

#### PATCH `/api/contact/:id/status`

Оновлення статусу контакту

**Body:**

```json
{
  "status": "read"
}
```

#### DELETE `/api/contact/:id`

Видалення контакту

#### GET `/api/contact/stats`

Отримання статистики контактів

### Системні

#### GET `/api/health`

Перевірка стану сервера

## 🛡️ Безпека

- **Helmet** - заголовки безпеки
- **CORS** - налаштування cross-origin запитів
- **Rate Limiting** - обмеження швидкості запитів
- **Input Validation** - валідація вхідних даних
- **Data Sanitization** - очищення даних

## 📝 Валідація

Форма контакту має наступні правила валідації:

- **Ім'я**: 2-50 символів, тільки літери, пробіли, дефіси, апострофи
- **Email**: валідний email формат, 5-100 символів
- **Повідомлення**: 10-1000 символів, без HTML тегів

## 🗄️ База даних

### Модель Contact

```javascript
{
  name: String,        // Ім'я користувача
  email: String,       // Email адреса
  message: String,     // Текст повідомлення
  status: String,      // Статус (new, read, replied, archived)
  ipAddress: String,   // IP адреса
  userAgent: String,   // User-Agent браузера
  createdAt: Date,     // Дата створення
  updatedAt: Date      // Дата оновлення
}
```

### Індекси

- `email` + `createdAt` - для швидкого пошуку по email
- `status` + `createdAt` - для фільтрації за статусом
- `createdAt` - для сортування за датою

## 🔧 Налаштування

### Змінні середовища

| Змінна                    | Опис                       | За замовчуванням      |
| ------------------------- | -------------------------- | --------------------- |
| `MONGODB_URI`             | URI підключення до MongoDB | -                     |
| `PORT`                    | Порт сервера               | 3001                  |
| `NODE_ENV`                | Режим роботи               | development           |
| `FRONTEND_URL`            | URL фронтенду для CORS     | http://localhost:5173 |
| `RATE_LIMIT_WINDOW_MS`    | Вікно обмеження швидкості  | 900000 (15 хв)        |
| `RATE_LIMIT_MAX_REQUESTS` | Максимум запитів           | 100                   |

### Rate Limiting

- **Контактна форма**: 5 запитів за 15 хвилин
- **Загальні API**: 100 запитів за 15 хвилин

## 📁 Структура проекту

```
backend/
├── config/
│   └── database.js          # Підключення до MongoDB
├── controllers/
│   └── contactController.js # Логіка обробки запитів
├── middleware/
│   ├── validation.js        # Валідація та санітизація
│   └── security.js          # Безпека та обмеження
├── models/
│   └── Contact.js           # Модель MongoDB
├── routes/
│   └── contactRoutes.js     # API маршрути
├── .env.example             # Приклад конфігурації
├── package.json             # Залежності
├── README.md                # Документація
└── server.js                # Основний файл сервера
```

## 🚀 Розгортання

### Локальне розгортання

1. Встановіть MongoDB локально
2. Створіть базу даних `exocriador_dev`
3. Налаштуйте `.env` файл
4. Запустіть `npm run dev`

### Docker (опціонально)

```bash
# Запуск MongoDB
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Запуск додатку
npm run dev
```

## 📝 Логування

Сервер логує:

- Всі HTTP запити з IP та User-Agent
- Помилки підключення до бази даних
- Створення нових контактів
- Помилки валідації та обробки

## 🔍 Тестування

Для тестування API можна використовувати:

- **Postman** або **Insomnia**
- **curl** команди
- **Thunder Client** (VS Code extension)

### Приклад тестування

```bash
# Тест здоров'я сервера
curl http://localhost:3001/api/health

# Тест створення контакту
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Тестовий користувач",
    "email": "test@example.com",
    "message": "Це тестове повідомлення для перевірки API"
  }'
```

## 🤝 Внесок

1. Форкніть репозиторій
2. Створіть гілку для нової функції
3. Зробіть коміт змін
4. Створіть Pull Request

## 📄 Ліцензія

MIT License
