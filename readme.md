## Assignment 02 – Issue Tracker API
A TypeScript-based REST API built with Node.js, Express, and PostgreSQL (raw SQL only).
This project implements a secure issue tracking system with authentication, role-based access control, and modular architecture.

### Tech Stack
| Technology        | Purpose                       |
| ----------------- | ----------------------------- |
| Node.js (LTS)     | Runtime environment           |
| TypeScript        | Type-safe backend development |
| Express.js        | Web framework                 |
| PostgreSQL        | Relational database           |
| pg                | Native PostgreSQL driver      |
| bcrypt            | Password hashing              |
| jsonwebtoken      | Authentication (JWT)          |
| dotenv            | Environment config            |
| cors              | Cross-origin support          |
| cookie-parser     | Cookie handling               |
| http-status-codes | Standard HTTP responses       |
### User Roles
#### Contributor
* Register & login
* Create issues
* View all issues
* Update own open issues
#### Maintainer
* All contributor permissions
* Update any issue
* Delete any issue
* Manage issue workflow
* Access full system control

### Authentication System
This project uses JWT-based authentication.
#### Flow:
* User registers / logs in
* Server validates credentials
* Password is hashed using bcrypt
* JWT is generated and returned
* Client sends token in request headers:
```
Authorization: <JWT_TOKEN>
```

### Security Rules:
* Passwords are never returned in API responses
* JWT is required for protected routes
* Role validation is enforced before privileged actions

### Database
#### Users Table
* id (serial primary key)
* name
* email (unique)
* password (hashed)
* role (contributor | maintainer)
* created_at
* updated_at

#### Issues Table
* id (serial primary key)
* title (max 150 chars)
* description (min 20 chars)
* type (bug | feature_request)
* status (open | in_progress | resolved)
* reporter_id
* created_at
* updated_at

### API Endpoints
#### Authentication
##### Register User
```
POST /api/auth/signup
```
##### Login User
```
POST /api/auth/login
```

#### Issues
##### Create Issue
```
POST /api/issues
```
* Auth required
##### Get All Issues
```
GET /api/issues?sort=newest&type=bug&status=open
```
* Public

##### Get Single Issue
```
GET /api/issues/:id
```
* Public

##### Update Issue
```
PATCH /api/issues/:id
```
* Rules:
--- Maintainer: full access
--- Contributor: only own + status must be open

##### Delete Issue
```
DELETE /api/issues/:id
```
* Maintainer only

### Project Structure
src/
│
├── config/        # DB & environment config
├── modules/
│   ├── auth/      # authentication module
│   ├── issues/    # issue management module
│
├── middleware/    # auth, role, error handling
├── utils/         # helper functions (jwt, bcrypt, response)
├── app.ts         # express app setup
└── server.ts      # entry point

### Installation & Setup
1. Clone Repository
```
git clone https://github.com/helal366/B7Assignment2PostgreSQL-Auth.git
cd assignment_02
```

2. Install Dependencies
```
npm install
```

3. Setup Environment Variables
Create .env file: add necessary data

4. Run Development Server
```
npm run dev
```

5. Build Project
```
npm run build
```

### Security Features
* Password hashing with bcrypt (salt rounds 8–12)
* JWT authentication system
* Role-based authorization (RBAC)
* Protected routes middleware
* Input validation before DB operations

### Learning Outcomes
This project demonstrates:
* REST API design
* PostgreSQL raw SQL handling
* Authentication & authorization (JWT)
* Role-based access control
* Scalable TypeScript backend architecture
* Clean modular code structure

### Author
##### Assignment Project – Issue Tracker API
* Built with Node.js + TypeScript + PostgreSQL