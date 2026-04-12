# 🎬 Movie WatchList API

A professional and robust backend API built with **Node.js**, **Express**, **Prisma ORM**, and **PostgreSQL** (hosted on Neon). This system allows users to manage a collection of movies and maintain a personalized watchlist with statuses like *Planned*, *Watching*, *Completed*, or *Dropped*.

---

## 🚀 Features

-   **User Authentication**: Secure registration and login using **JWT** (JSON Web Tokens) and password hashing with **bcryptjs**.
-   **Movie Management**: 
    -   Create, read, update, and delete movie records.
    -   Role-based access control: Only the creator of a movie can update or delete it.
-   **Watchlist System**:
    -   Add movies to a personal watchlist.
    -   Update watch status (PLANNED, WATCHING, COMPLETED, DROPPED), ratings, and personal notes.
    -   Prevent duplicate entries for the same movie in a user's watchlist.
-   **Data Validation**: Strict request validation using **Zod** schemas.
-   **Database**: Managed through **Prisma ORM** with automated migrations and a seeding script for initial movie data.
-   **Error Handling**: Centralized logging with **Morgan** and robust process-level exception handling.

---

## 🛠️ Tech Stack

-   **Backend**: Node.js, Express.js (v5)
-   **Database**: PostgreSQL
-   **ORM**: Prisma
-   **Authentication**: JWT, bcryptjs
-   **Validation**: Zod
-   **Logging**: Morgan
-   **Deployment/Database Hosting**: Neon Postgres

---

## 📂 Project Structure

```text
src/
├── config/             # Database connection configuration
├── Controllers/        # Business logic for Auth, Movies, and Watchlist
├── middlewares/        # Authentication and Validation middlewares
├── Routes/             # Express API route definitions
├── utils/              # Helper functions (e.g., token generation)
├── validators/         # Zod validation schemas
└── server.js           # Main entry point
prisma/
├── migrations/         # SQL migration history
├── schema.prisma       # Prisma database schema
└── seed.js             # Initial database seeding script
```

---

## ⚙️ Setup Instructions

### 1. Prerequisites
-   Node.js (v18+)
-   PostgreSQL database (or a Neon account)

### 2. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory and add the following:
```env
DATABASE_URL="postgresql://user:password@host:port/dbname?sslmode=require"
JWT_SECRET="your_jwt_secret_here"
JWT_EXPIRES_IN="7d"
NODE_ENV="development"
```

### 4. Database Setup
Run Prisma migrations to set up your database schema:
```bash
npx prisma migrate dev --name init
```

(Optional) Seed the database with initial movie data:
```bash
npm run seed:movies
```

### 5. Running the App
Start the development server:
```bash
npm run dev
```
The server will be running at `http://localhost:8080`.

---

## 📡 API Documentation

### **Authentication**
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/auth/register` | Register a new user |
| `POST` | `/auth/login` | Login and receive a JWT |
| `POST` | `/auth/logout` | Logout user |

### **Movies** (Requires Auth)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/movies` | Get all movies |
| `POST` | `/movies` | Add a new movie |
| `PUT` | `/movies/:id` | Update a movie (Creator only) |
| `DELETE` | `/movies/:id` | Delete a movie (Creator only) |

### **Watchlist** (Requires Auth)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/watchlist` | Get current user's watchlist |
| `POST` | `/watchlist` | Add a movie to watchlist |
| `PUT` | `/watchlist/:id` | Update status/rating/notes for an item |
| `DELETE` | `/watchlist/:id` | Remove an item from watchlist |

---

## 📝 License
This project is licensed under the **ISC License**.

## 👤 Author
**mohamed khaled**
**khaled25256@gmail.com**
**https://github.com/mohamedkhaledmk/**
