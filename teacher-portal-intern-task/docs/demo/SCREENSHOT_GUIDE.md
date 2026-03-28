# Screenshot + Video Guide

Assets already generated in this repo:

## Screenshots
- `docs/demo/screenshots/01-register-page.png`
- `docs/demo/screenshots/02-login-page.png`
- `docs/demo/screenshots/03-dashboard-create-form.png`
- `docs/demo/screenshots/04-users-table.png`
- `docs/demo/screenshots/05-teachers-table.png`

## Demo Video
- `docs/demo/gif/teacher-portal-demo.webm` (short walkthrough recording)

## Regenerate Assets (Automated)
Open three terminals:

1. Start local database
```powershell
cd backend
powershell -ExecutionPolicy Bypass -File .\scripts\start-local-mysql.ps1
```

2. Start backend API
```powershell
cd backend
php -S localhost:8080 -t public public/index.php
```

3. Start frontend
```powershell
cd frontend
npm run dev -- --host 127.0.0.1 --port 5173
```

Then run capture commands:
```powershell
cd frontend
npm run capture:screenshots
npm run capture:video
```

## Suggested Interview Flow
Register -> Dashboard create form -> Users table -> Teachers table -> Logout/Login.
