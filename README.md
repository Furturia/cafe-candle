# Candle Cafe - SIT FESTIVAL 30th Anniversary

Web application for SIT alumni to submit their photos and memories.

## Features

- Alumni submission form with photo upload/camera capture
- Dual image upload options (file upload or camera)
- Smart graduation year system (2-digit format)
- Heartwarming messages based on years since graduation
- Responsive design
- Fully containerized with Docker

## Graduation Year System

The application uses a **2-digit year format** for graduation years:
- Input: 66 (2 digits)
- Represents: พ.ศ. 2566 (ค.ศ. 2023)
- Example: Student ID `66130500065` → Enter `66`

The system automatically:
- Converts to full Buddhist/Gregorian years
- Calculates years since graduation
- Generates personalized heartwarming messages

## Technology Stack

**Frontend:**
- Vue.js 3 (Composition API)
- Vue Router
- Axios
- Vite
- Tailwind CSS + DaisyUI

**Backend:**
- Express.js
- Sequelize ORM
- MySQL 8.0
- Multer (file upload)

**DevOps:**
- Docker & Docker Compose
- Nginx

## Prerequisites

- Docker & Docker Compose installed
- Node.js 20+ (for local development)

## Quick Start with Docker

1. Clone the repository:
```bash
git clone <repo-url>
cd cafe-candle-main
```

2. Create environment file:
```bash
cp backend/.env.example backend/.env
```

3. Start all services:
```bash
docker-compose up -d
```

4. Access the application:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- Database: localhost:3306

## Local Development

### Backend
```bash
cd backend
cp .env.example .env
# Edit .env: change DB_HOST=mysql to DB_HOST=localhost
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

### Submissions
- `POST /api/submissions` - Create new submission
  - Body: multipart/form-data
  - Fields: firstName, lastName, graduationYear (2-digit), email, phone (optional), description (optional)
  - File: image (max 5MB, JPG/PNG/WebP)

- `GET /api/submissions` - Get all submissions
  - Query params: limit (default 50), offset (default 0)

- `GET /api/submissions/:id` - Get submission by ID

### Health Check
- `GET /api/health` - Server health check

## Project Structure
```
cafe-candle-main/
├── frontend/               # Vue.js frontend
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── views/
│   │   │   ├── Home.vue
│   │   │   ├── FormPage.vue
│   │   │   └── Success.vue
│   │   ├── App.vue
│   │   └── main.js
│   ├── router/
│   │   └── index.js
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
│
├── backend/                # Express.js backend
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── models/
│   │   │   └── Submission.js
│   │   ├── routes/
│   │   │   └── submissions.js
│   │   ├── controllers/
│   │   │   └── submissionController.js
│   │   ├── middleware/
│   │   │   ├── upload.js
│   │   │   └── validator.js
│   │   ├── utils/
│   │   │   ├── graduationCalculator.js
│   │   │   └── messageGenerator.js
│   │   └── app.js
│   ├── uploads/
│   ├── Dockerfile
│   ├── .env.example
│   └── package.json
│
├── database/
│   └── init.sql
│
├── docker-compose.yml
└── README.md
```

## Environment Variables

See `backend/.env.example` for all available environment variables.

## Stopping the Application
```bash
docker-compose down
```

To remove volumes (delete database data):
```bash
docker-compose down -v
```

## Troubleshooting

**Database connection failed:**
- Wait for MySQL to be fully ready (health check)
- Check database credentials in .env

**File upload failed:**
- Check uploads directory permissions
- Verify MAX_FILE_SIZE setting

**Frontend can't reach backend:**
- Check FRONTEND_URL in backend .env
- Verify CORS configuration
