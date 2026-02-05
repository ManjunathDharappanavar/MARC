# MARC Backend API Documentation

This document provides a comprehensive guide to the MARC Backend API endpoints, request structures, and testing instructions.

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v14+
- **MongoDB**: Local or Atlas URI

### Installation & Run
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   ADMIN_SECRET=optional_admin_secret_key
   ```
4. Start the server:
   ```bash
   npm run dev
   ```
   Server will run at: `http://localhost:5000`

---

## 🔐 Authentication
The API uses **JWT (JSON Web Token)** for authentication.
- All protected routes require a valid token in the **Authorization header**.
- Format: `Bearer <your_token>`

---

## 📡 API Endpoints

### 1. Authentication

#### **Register User**
Create a new account.
- **Endpoint**: `POST /api/auth/register`
- **Body (JSON)**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response (201)**: Returns user details and token.

#### **Login User**
Authenticate an existing user.
- **Endpoint**: `POST /api/auth/login`
- **Body (JSON)**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response (200)**: Returns user details and token.

#### **Get Profile** (Protected)
Get current user's profile.
- **Endpoint**: `GET /api/auth/profile`
- **Headers**: `Authorization: Bearer <token>`
- **Response (200)**: User profile object.

---

### 2. Assets (Protected)
Manage your personal assets. All data is scoped to the logged-in user.

#### **Get All Assets**
- **Endpoint**: `GET /api/assets`
- **Response (200)**: Array of asset objects.

#### **Create Asset**
- **Endpoint**: `POST /api/assets`
- **Body (JSON)**:
  ```json
  {
    "name": "Savings Account",
    "category": "Bank",
    "value": 5000
  }
  ```
- **Response (201)**: Created asset object.

#### **Get Single Asset**
- **Endpoint**: `GET /api/assets/:id`
- **Response (200)**: Asset object.

#### **Update Asset**
- **Endpoint**: `PUT /api/assets/:id`
- **Body (JSON)**: (Update any field)
  ```json
  {
    "value": 6000
  }
  ```
- **Response (200)**: Updated asset object.

#### **Delete Asset**
- **Endpoint**: `DELETE /api/assets/:id`
- **Response (200)**: Success message.

---

### 3. Transactions (Protected)
Log income or expenses against your assets. This automatically updates the asset's value.

#### **Create Transaction**
- **Endpoint**: `POST /api/transactions`
- **Body (JSON)**:
  - **type**: "income" (Adds to asset value) or "expense" (Subtracts from asset value).
  ```json
  {
    "assetId": "65b8e9...", 
    "type": "expense",
    "amount": 200
  }
  ```
- **Response (201)**: Created transaction object.
- **Note**: If the asset balance update fails, the transaction is automatically rolled back.

#### **Get All Transactions**
- **Endpoint**: `GET /api/transactions`
- **Response (200)**: Array of transactions (sorted by newest).

#### **Get Single Transaction**
- **Endpoint**: `GET /api/transactions/:id`
- **Response (200)**: Transaction object.

#### **Delete Transaction**
- **Endpoint**: `DELETE /api/transactions/:id`
- **Effect**: Deleting a transaction **reverses** the effect on the asset value (e.g., deleting an expense adds the money back to the asset).
- **Response (200)**: Success message.

---

### 4. Reports (Protected)

#### **Get Summary**
Get a high-level overview of your data.
- **Endpoint**: `GET /api/reports/summary`
- **Response (200)**:
  ```json
  {
    "assets": 5,
    "transactions": 12
  }
  ```

---

## 🧪 Postman Testing Guide

### Setting Up Environment
1. Open Postman.
2. Create a new Environment called **"MARC Backend"**.
3. Add the following variable:
   - `base_url`: `http://localhost:5000/api`
   - `token`: (Leave blank initially)

### Testing Workflow
1. **Register**: Send a POST request to `{{base_url}}/auth/register`.
2. **Login/Save Token**:
   - Send a POST request to `{{base_url}}/auth/login`.
   - Copy the `token` string from the response body.
   - Go to your Environment > paste it into the `token` variable > Save.
   - *Pro Tip*: In the "Tests" tab of the Login request, add this script to auto-save the token:
     ```javascript
     var jsonData = pm.response.json();
     pm.environment.set("token", jsonData.token);
     ```
3. **Authorized Requests**:
   - For all other requests (Assets/Transactions), go to the **Authorization** tab.
   - Select **Type**: `Bearer Token`.
   - Token field: `{{token}}`.
4. **Run Tests**:
   - Create an Asset -> Check response ID.
   - Create a Transaction linked to that Asset ID.
   - Check `GET /assets/:id` to verify the value updated correctly.

---

## ⚠️ Error Codes Reference

| Status Code | Meaning |
|---|---|
| **200** | OK (Success) |
| **201** | Created (Resource successfully made) |
| **400** | Bad Request (Missing fields, validation error) |
| **401** | Unauthorized (Invalid or missing token) |
| **403** | Forbidden (Role restrictions) |
| **404** | Not Found (Resource doesn't exist) |
| **500** | Internal Server Error (Something went wrong on our end) |
