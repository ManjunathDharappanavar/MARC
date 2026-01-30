# 📘 Frontend Integration Guide & Developer Manual

This manual is designed to help frontend developers build a robust, error-free application using the MARC Backend API. It covers authentication patterns, error handling strategies, and critical business logic synchronization.

## 🛠️ API Configuration

- **Base URL**: `http://localhost:5000/api`
- **Content-Type**: `application/json`

### Recommended Axios Instance
Create a centralized Axios instance to handle configuration and interceptors automatically.

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to inject the token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

---

## 🔐 Authentication Flow

1.  **Login/Register**:
    - Upon success, the backend returns:
        ```json
        {
          "token": "eyJhbG...",
          "user": { "_id": "...", "name": "...", "email": "...", "role": "user" }
        }
        ```
    - **Action**: Save `token` to `localStorage` (or cookie) and `user` info to your global state (Redux/Context).
    - **Redirect**: Move user to the Dashboard.

2.  **Session Expiry (401 Handling)**:
    - The backend validates tokens on every protected request.
    - If you receive a **401 Unauthorized** error, it likely means the token is expired or invalid.
    - **Action**: Clear `localStorage` and strictly redirect the user to the Login page.

---

## 🚨 Error Handling Strategy

The backend uses a standardized error format. **Never** display generic "Something went wrong" messages if the backend provides specific feedback.

### Backend Error Response Structure
```json
{
  "status": "fail",      // or "error"
  "message": "User already exists"  // DISPLAY THIS TO USER
}
```

### Frontend Implementation (Example)
```javascript
try {
  await api.post('/auth/login', formData);
} catch (err) {
  // robust error extraction
  const errorMessage = err.response?.data?.message || "Connection failed";
  toast.error(errorMessage); 
}
```

---

## 🔄 Business Logic & State Synchronization

### ⚠️ Critical: Asset & Transaction dependency
The backend contains simpler logic than you might expect, but there is one **critical side-effect** you must handle in the frontend to avoid "Stale Data" bugs.

**The Rule**: Creating or Deleting a **Transaction** updates the **Asset Balance** on the server.

**Scenario**:
1. User creates a transaction: "Expense $50" on "Wallet".
2. Backend:
    - Creates Transaction record.
    - Decrements "Wallet" Asset value by $50.

**Frontend Implication**:
If you only add the new transaction to your local transaction list, your **Asset Balance display will be wrong** until you refresh.

**Recommended Pattern**:
When a transaction is successfully created or deleted, you MUST trigger a re-fetch of the impacted Asset (or all assets).

```javascript
/* React Query / TanStack Query Example */
const createTransactionMutation = useMutation({
  mutationFn: (newTx) => api.post('/transactions', newTx),
  onSuccess: () => {
    // 1. Refetch transactions to see the new one
    queryClient.invalidateQueries(['transactions']);
    
    // 2. CRITICAL: Refetch assets so the balance updates immediately
    queryClient.invalidateQueries(['assets']); 
  }
});
```

---

## 📦 Data Contracts (TypeScript Interfaces)

Use these exact field names to avoid `undefined` errors.

### User
```typescript
interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}
```

### Asset
```typescript
interface Asset {
  _id: string;
  name: string;      // e.g., "Chase Bank"
  category: string;  // e.g., "Savings"
  value: number;     // Current balance
  updatedAt: string; // ISO Date
}
```

### Transaction
```typescript
interface Transaction {
  _id: string;
  assetId: Asset | string; // Populated object on GET, ID string on POST
  type: 'income' | 'expense';
  amount: number;
  createdAt: string; // ISO Date used for sorting
}
```

---

## 🧪 Testing Checklist (Before merging PRs)

- [ ] **Auth**: Can I log in and does the token persist on refresh?
- [ ] **Logout**: Does valid logout clear the token and redirect to login?
- [ ] **Validation**: Do empty forms show the error message sent by the backend?
- [ ] **Assets**: Can I create an asset? Does it appear in the list immediately?
- [ ] **Transactions**: 
    - Create an Income ($100). Does the linked Asset balance increase by $100?
    - Delete that transaction. Does the Asset balance revert (decrease by $100)?
- [ ] **Privacy**: (If creating a 2nd test account) Can User A see User B's assets? (Should be NO).
