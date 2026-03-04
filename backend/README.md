# Backend API Documentation

This directory contains the backend codebase for the application, built with Node.js, Express, and MongoDB.

## Folder Structure

The backend follows a standard MVC (Model-View-Controller) architecture:

```text
backend/
├── config/           # Configuration files (e.g., database connection)
│   └── db.js         # MongoDB connection setup
├── controllers/          # Route handlers implementing the core logic
│   ├── authController.js # Handles registration and login logic
│   ├── userController.js # Handles user-related operations (e.g., fetching profile)
│   └── claimController.js # Handles claim-related operations
├── middlewares/          # Custom Express middlewares (e.g., authentication, error handling)
├── models/               # Mongoose schemas representing database collections
│   ├── userModel.js      # User schema definition
│   ├── itemModel.js      # Item schema (lost/found items)
│   └── claimModel.js     # Claim schema (claims on items)
├── routes/               # API route definitions mapping URLs to controllers
│   ├── auth.js           # Authentication routes (/api/auth)
│   ├── user.js           # User routes (/api/users)
│   └── claim.js          # Claim routes (/api/claims, /api/items/:id/claims)
├── package.json      # Project dependencies and scripts
└── server.js         # Application entry point and server configuration
```

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB running locally or a MongoDB Atlas URI

### Installation
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file (optional) and configure variables like `PORT` or `MONGO_URI`. By default, it connects to `mongodb://127.0.0.1:27017/uni_find`.

### Running the Server
Run the server in development mode (using nodemon):
```bash
npm run dev
```
Or start normally:
```bash
npm start
```
The server will run on `http://localhost:5000` by default.

---

## API Routes

### 1. Authentication Routes
**Base URL:** `/api/auth`

#### Register User
- **Endpoint:** `POST /register`
- **Description:** Registers a new user.
- **Request Body (JSON):**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```
- **Response (201 Created):** Returns user details and registration message.

#### Login User
- **Endpoint:** `POST /login`
- **Description:** Logs in an existing user.
- **Request Body (JSON):**
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```
- **Response (200 OK):** Returns user details and login success message.

---

### 2. User Routes
**Base URL:** `/api/users`

#### Get Current User Profile
- **Endpoint:** `GET /me`
- **Description:** Placeholder endpoint for retrieving the user profile. Currently under construction and will be fully implemented once JWT authentication is added.
- **Response (200 OK):**
  ```json
  {
    "message": "User profile endpoint - To be implemented with JWT"
  }
  ```

---

### 3. Claim Routes
**Base URL:** `/api`

> Note: These routes are intended to be protected with JWT authentication middleware once implemented.

#### Create Claim
- **Endpoint:** `POST /claims`
- **Description:** Create a new claim for a given item.
- **Request Body (JSON):**
  ```json
  {
    "item": "<itemId>",
    "proofDescription": "Details to prove ownership or possession"
  }
  ```
- **Behavior:**
  - Uses the authenticated user as the `claimer`.
  - Rejects duplicate claims for the same `(item, claimer)` combination.

#### Get Claims for an Item
- **Endpoint:** `GET /items/:id/claims`
- **Description:** Returns all claims for a specific item.

#### Update Claim Status
- **Endpoint:** `PATCH /claims/:id/status`
- **Description:** Update the status of a claim to `pending`, `approved`, or `rejected`. When a claim is approved, the related item's status is updated (e.g., to `claimed`).

