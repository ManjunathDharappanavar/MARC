# Frontend Development Specification for MARC

## 1. Project Overview
This document outlines the backend structure, API endpoints, and data models required to build the frontend application for MARC. The backend is a RESTful API built with Node.js, Express, and MongoDB.

## 2. Server Configuration
- **Base URL**: `http://localhost:5000/api`
- **Authentication**: JWT (JSON Web Token)
  - Token must be included in the `Authorization` header for all protected routes.
  - Format: `Bearer <your_token>`

## 3. Data Models (Schemas)

### User
```typescript
interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin"; // Default: "user"
  createdAt: string;
  updatedAt: string;
}
```

### Asset
```typescript
interface Asset {
  _id: string;
  name: string; // Required
  category?: string;
  value: number; // Required, Default: 0
  createdBy: string; // User ID
  createdAt: string;
  updatedAt: string;
}
```

### Transaction
```typescript
interface Transaction {
  _id: string;
  assetId: string | { _id: string, name: string }; // Populated with name on fetch
  type: "income" | "expense"; // Required
  amount: number; // Required
  createdBy: string; // User ID
  createdAt: string;
  updatedAt: string;
}
```

## 4. API Endpoints

### Authentication
- `POST /auth/register`
  - Body: `{ name, email, password }`
  - Response: `{ user: User, token: string }`
  - Status: 201 Created
- `POST /auth/login`
  - Body: `{ email, password }`
  - Response: `{ user: User, token: string }`
  - Status: 200 OK
- `GET /auth/profile`
  - Headers: `Authorization: Bearer <token>`
  - Response: `User` object

### Assets
- `GET /assets`
  - Returns list of assets created by the user.
- `POST /assets`
  - Body: `{ name, category, value }`
  - Note: `value` is optional (defaults to 0), but recommended.
- `GET /assets/:id`
  - Returns a single asset.
- `PUT /assets/:id`
  - Body: `{ name?, category?, value? }`
- `DELETE /assets/:id`
  - Removes the asset.

### Transactions
**Important Business Logic**: 
- Creating a transaction **automatically updates** the linked Asset's value on the server.
- Deleting a transaction **reverses** this update on the Asset's value.
- Frontend should reflect these changes (e.g., refetch Asset or optimistically update).

- `GET /transactions`
  - Returns list of transactions, sorted by `createdAt: -1` (newest first).
  - `assetId` field is populated with `{ _id, name }`.
- `POST /transactions`
  - Body: `{ assetId, type, amount }`
  - `type`: "income" (adds to asset value) or "expense" (subtracts).
- `GET /transactions/:id`
  - Returns single transaction.
- `DELETE /transactions/:id`
  - Deletes transaction and reverts asset value change.

### Reports
- `GET /reports/summary`
  - Response: `{ assets: number, transactions: number }`
  - Returns counts of user's assets and transactions.

## 5. Error Handling
- **400 Bad Request**: Validation errors or missing fields.
- **401 Unauthorized**: Missing or invalid token.
- **404 Not Found**: Resource does not exist.
- **500 Internal Server Error**: General backend failure.

## 6. Implementation Notes for Frontend
1. **State Management**: Store `token` in localStorage/sessionStorage after login.
2. **Dashboard Logic**: When a transaction is added, the "Total Value" of the relevant Asset changes. Ensure the Dashboard UI updates this, either by refetching the Asset list or by locally calculating the change.
3. **Dropdowns**: For "Create Transaction" forms, fetch the list of Assets first (`GET /assets`) to populate the `assetId` selector.
