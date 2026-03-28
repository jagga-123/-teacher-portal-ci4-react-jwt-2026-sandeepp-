🚀 Teacher Portal (CI4 + React + JWT)

A full-stack web application built as part of an intern task. It demonstrates secure authentication, REST APIs, and modern frontend integration.

✨ Features
🔐 JWT-based Authentication (Register/Login)
🧑‍🏫 Create Teacher + User (Single API)
📊 Dashboard with protected routes
📋 Separate data tables (Users & Teachers)
⚡ Fast frontend with React + Vite
🗄️ MySQL database with schema export
🛠️ Tech Stack

Backend

PHP 8.1+
CodeIgniter 4
JWT (firebase/php-jwt)

Frontend

React (Vite)
React Router
Axios

Database

MySQL
📁 Project Structure
teacher-portal/
│── backend/          # CI4 REST API
│── frontend/         # React App
│── database/         # schema.sql
│── docs/             # Postman + Demo files
🔑 API Endpoints
Public APIs
POST /api/auth/register
POST /api/auth/login
Protected APIs (JWT Required)
POST /api/teachers
GET /api/users
GET /api/teachers
⚙️ Setup & Run
1️⃣ Backend Setup
cd backend
composer install
php -S localhost:8080 -t public
2️⃣ Database Setup
Import database/schema.sql into MySQL
Update .env with DB credentials
3️⃣ Frontend Setup
cd frontend
npm install
npm run dev
🌐 Access
Frontend → http://localhost:5173
Backend → http://localhost:8080/api
🧪 Demo Credentials
Email	Password
admin@example.com
	Password@123
demo.teacher1@example.com
	Password@123
📸 Screenshots
Register Page
Login Page
Dashboard
Users Table
Teachers Table

📁 Available in: docs/demo/screenshots/

🎥 Demo Video

📁 docs/demo/gif/teacher-portal-demo.webm

📬 Postman Collection

Import:

docs/postman/Teacher-Portal.postman_collection.json

Includes:

Register
Login
Create Teacher
Fetch Users/Teachers
💡 Key Highlights
Clean MVC architecture (CI4)
Secure JWT middleware
Transaction-based API (User + Teacher)
Responsive UI design
Production-ready structure
📌 Submission Notes
✔️ Public GitHub repository
✔️ Includes database schema
✔️ Includes demo screenshots & video
👨‍💻 Author

Sandeep Kumar
🔗 LinkedIn: www.linkedin.com/in/sandeeppal9815

⭐ Final Note

This project demonstrates full-stack development skills, API security, and real-world architecture, making it suitable for internships and interviews.
