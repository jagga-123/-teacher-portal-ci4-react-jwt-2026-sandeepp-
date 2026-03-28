# Teacher Portal Intern Task

A full-stack assignment implementation using:
- `backend/` - CodeIgniter 4 REST API with JWT auth
- `frontend/` - React + Vite app
- `database/schema.sql` - MySQL schema export
- `docs/postman/` - import-ready Postman collection
- `docs/demo/` - interview demo script + screenshot/GIF checklist

## Tech Stack
- Backend: PHP 8.1+, CodeIgniter 4, `firebase/php-jwt`
- Frontend: React, React Router, Axios, Vite
- Database: MySQL

## Requirement Mapping
1. CodeIgniter application: implemented in `backend/`
2. Basic Auth APIs: `POST /api/auth/register`, `POST /api/auth/login`
3. Token-based authentication: JWT filter on protected routes
4. Database: MySQL with schema export included
5. Two tables with 1-1 relation: `auth_user` and `teachers` (`teachers.user_id` unique FK)
6. Single POST API for both tables: `POST /api/teachers` (transaction-based)
7. React app modules:
   - Register/Login auth screens
   - Protected dashboard (create user + teacher)
   - Separate datatable pages for `auth_user` and `teachers`

## Project Run (Quick Start)

### 1) Backend dependencies
```bash
cd backend
composer install
```

### 2) Start local isolated MySQL (recommended)
```powershell
cd backend
powershell -ExecutionPolicy Bypass -File .\scripts\start-local-mysql.ps1
```
- Runs project-local MySQL at `127.0.0.1:3307`
- Imports `database/schema.sql` only on first setup

To stop local MySQL:
```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\stop-local-mysql.ps1
```

### 3) Start backend API
```bash
cd backend
php -S localhost:8080 -t public public/index.php
```

### 4) Start frontend
```bash
cd frontend
npm install
npm run dev
```

### 5) Open in browser
- Frontend: `http://localhost:5173`
- Backend API base: `http://localhost:8080/api`

## API Endpoints

### Public
- `POST /api/auth/register`
- `POST /api/auth/login`

### Protected (Bearer JWT)
- `POST /api/teachers`
- `GET /api/users`
- `GET /api/teachers`

## Postman
Import collection:
- `docs/postman/Teacher-Portal.postman_collection.json`

Collection includes:
- Register
- Login (auto-saves token to collection variable)
- Create user + teacher
- Users list
- Teachers list
- Unauthorized check (missing token -> 401)

## Sample Requests + Responses

### Register
**Request**
```json
{
  "email": "admin@example.com",
  "first_name": "Admin",
  "last_name": "User",
  "password": "Password@123"
}
```

**Success (201)**
```json
{
  "message": "User registered successfully",
  "token": "<jwt>",
  "user": {
    "id": 1,
    "email": "admin@example.com",
    "first_name": "Admin",
    "last_name": "User"
  }
}
```

**Validation Error (422)**
```json
{
  "message": "Validation failed",
  "errors": {
    "email": "The email field must contain a unique value."
  }
}
```

### Login
**Request**
```json
{
  "email": "admin@example.com",
  "password": "Password@123"
}
```

**Success (200)**
```json
{
  "message": "Login successful",
  "token": "<jwt>",
  "user": {
    "id": 1,
    "email": "admin@example.com",
    "first_name": "Admin",
    "last_name": "User"
  }
}
```

### Create User + Teacher (Single POST)
**Request**
```json
{
  "email": "teacher1@example.com",
  "first_name": "Riya",
  "last_name": "Sharma",
  "password": "Password@123",
  "university_name": "Delhi University",
  "gender": "female",
  "year_joined": 2021
}
```

**Success (201)**
```json
{
  "message": "User and teacher created successfully",
  "data": {
    "user_id": 2,
    "teacher_id": 1
  }
}
```

### Unauthorized example
`GET /api/users` without token:
```json
{
  "message": "Unauthorized: Missing Bearer token"
}
```

## Test Users (for quick demo)
Create these via Register API/UI once, then reuse for login demos:
- `admin@example.com` / `Password@123`
- `demo.teacher1@example.com` / `Password@123`
- `demo.teacher2@example.com` / `Password@123`

Note: Registration requires unique email, so for repeated runs use a timestamp-based email.

## UI Highlights
- Redesigned non-boilerplate UI with expressive typography and atmospheric gradients
- Dedicated dashboard with API context cards
- Styled table panels and responsive layout for desktop/mobile

## Demo Assets
- Walkthrough script: `docs/demo/DEMO_SCRIPT.md`
- Screenshot checklist: `docs/demo/SCREENSHOT_GUIDE.md`
- Generated screenshots:
  - `docs/demo/screenshots/01-register-page.png`
  - `docs/demo/screenshots/02-login-page.png`
  - `docs/demo/screenshots/03-dashboard-create-form.png`
  - `docs/demo/screenshots/04-users-table.png`
  - `docs/demo/screenshots/05-teachers-table.png`
- Generated video:
  - `docs/demo/gif/teacher-portal-demo.webm`

### Regenerate Media (Automation)
After backend and frontend are running:
```bash
cd frontend
npm run capture:screenshots
npm run capture:video
```

## Submission Notes
- Keep repository public (if requested by interviewer)
- Include `database/schema.sql`
- Add screenshots + short GIF/video before final submission
