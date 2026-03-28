# Demo Walkthrough Script (2-3 Minutes)

## 1) Quick Intro (20s)
- "This is a full-stack Teacher Portal built with CodeIgniter + React."
- "It includes JWT auth, relational schema, and protected CRUD-style listing endpoints."

## 2) Auth Flow (40s)
- Open `/register`, create a new account with a unique email.
- Mention server-side validation (`is_unique`) and password hashing.
- Login and show successful redirect to protected dashboard.

## 3) Token Security (30s)
- Open Postman collection and run `Auth - Login`.
- Show token auto-saved in collection variable.
- Run `Auth Check - Missing Token (Expected 401)` to prove endpoint protection.

## 4) Single POST, Two Tables (45s)
- Use dashboard form (`POST /api/teachers`) to create user + teacher.
- Mention transaction-based insert and 1-1 relationship (`teachers.user_id`).

## 5) Data Table Pages (30s)
- Show `Auth Users Table` page.
- Show `Teachers Table` page.
- Highlight that data is fetched from separate protected APIs.

## 6) Close (15s)
- "Repository includes schema export, Postman collection, run steps, and demo assets folder."
