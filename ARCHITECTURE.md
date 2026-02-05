# MARC Application Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                      Browser / Frontend                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              React Application (Vite)                    │  │
│  │                                                          │  │
│  │  ┌─────────────────────────────────────────────────┐   │  │
│  │  │  App.jsx (Root with Auth Context + React Query)│   │  │
│  │  └──────────────────┬──────────────────────────────┘   │  │
│  │                     │                                   │  │
│  │     ┌───────────────┼───────────────┐                  │  │
│  │     │               │               │                  │  │
│  │  ┌──▼──┐      ┌──────▼────┐   ┌───▼──┐               │  │
│  │  │Hero │      │Dashboard  │   │Auth  │               │  │
│  │  │Page │      │Component  │   │Page  │               │  │
│  │  └─────┘      └─────┬─────┘   └──────┘               │  │
│  │                     │                                   │  │
│  │         ┌───────────┼───────────┐                      │  │
│  │         │           │           │                      │  │
│  │    ┌────▼────┐  ┌───▼────┐  ┌──▼──────┐              │  │
│  │    │Overview │  │Assets  │  │Transact │              │  │
│  │    │View     │  │View    │  │ions     │              │  │
│  │    └─────────┘  └────────┘  └─────────┘              │  │
│  │                                                        │  │
│  └──────────────────────────────────────────────────────┘  │
│                         ▲                                    │
│                         │                                    │
│              ┌──────────┴──────────┐                        │
│              │                     │                        │
│         ┌────▼─────┐         ┌────▼──────┐               │
│         │AuthContext│         │Customs    │               │
│         │Provider   │         │Hooks      │               │
│         └──────────┘         └───────────┘               │
│                                                            │
└────────────────────────────┬───────────────────────────────┘
                             │
                    ┌────────▼────────┐
                    │  Axios + JWT    │
                    │  Interceptors   │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  HTTP Requests  │
                    │  + Token Auth   │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │ Backend API     │
                    │ (Node.js +      │
                    │  Express +      │
                    │  MongoDB)       │
                    └─────────────────┘
```

---

## Component Architecture

### Component Hierarchy

```
App (Root)
├── AuthProvider
│   ├── QueryClientProvider
│   │   ├── LandingHero
│   │   │   └── AuthPage
│   │   │       ├── Login Form
│   │   │       └── Register Form
│   │   │
│   │   └── Dashboard (Protected)
│   │       ├── Header (with Logout)
│   │       ├── Sidebar (Navigation)
│   │       │   ├── Overview Tab
│   │       │   ├── Assets Tab
│   │       │   └── Transactions Tab
│   │       │
│   │       └── Content Area
│   │           ├── DashboardView
│   │           │   ├── Net Worth Card
│   │           │   ├── Top Assets
│   │           │   ├── Income/Expense Cards
│   │           │   ├── Recent Activity
│   │           │   └── Summary Stats
│   │           │
│   │           ├── AssetsView
│   │           │   ├── Asset Grid
│   │           │   └── Asset Forms (Modal)
│   │           │
│   │           └── TransactionsView
│   │               ├── Summary Cards
│   │               ├── Transaction Table
│   │               └── Transaction Form (Modal)
│   │
│   └── Toast Notifications
```

---

## Data Flow Architecture

### Authentication Flow

```
┌─────────────┐
│  User Input │
│  (Email/PW) │
└──────┬──────┘
       │
       ▼
┌──────────────────┐
│ Validate Form    │
│ (Frontend)       │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│ Call authService │
│ .login()         │
└──────┬───────────┘
       │
       ▼
┌──────────────────────────┐
│ POST /api/auth/login     │
│ (Axios Request)          │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────┐
│ Backend Validation   │
│ + JWT Token Gen      │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Response with Token  │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Save Token to        │
│ localStorage +       │
│ Update AuthContext   │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Redirect to          │
│ Dashboard            │
└──────────────────────┘
```

### Asset Management Flow

```
┌──────────────┐
│ User Action  │
│ (Create/Edit)│
└──────┬───────┘
       │
       ▼
┌────────────────────┐
│ Form Submission    │
│ with Validation    │
└──────┬─────────────┘
       │
       ▼
┌──────────────────────────┐
│ Call assetService or     │
│ useAsset Hook Mutation   │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│ Axios POST/PUT/DELETE    │
│ /api/assets              │
│ with JWT Token           │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│ Backend Processing       │
│ (CRUD Operations)        │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│ Database Operation       │
│ (MongoDB)                │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│ Return Response          │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│ React Query:             │
│ - Cache Update           │
│ - Invalidate Related     │
│ - Trigger Refetch        │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│ Component Re-render      │
│ with New Data            │
└──────────────────────────┘
```

---

## State Management Architecture

### Context API (Authentication)

```
AuthContext
├── State:
│   ├── user (object)
│   ├── loading (boolean)
│   └── error (string)
│
├── Methods:
│   ├── register(name, email, password)
│   ├── login(email, password)
│   ├── logout()
│   └── isAuthenticated (computed)
│
└── Provides:
    ├── useAuth() hook
    └── All protected routes
```

### React Query (Server State)

```
React Query
├── Assets Query:
│   ├── Key: ['assets']
│   ├── Function: assetService.getAllAssets()
│   ├── Cache: 5 minutes
│   └── Mutations:
│       ├── create (invalidates assets)
│       ├── update (invalidates assets)
│       └── delete (invalidates assets)
│
├── Transactions Query:
│   ├── Key: ['transactions']
│   ├── Function: transactionService.getAllTransactions()
│   ├── Cache: 2 minutes
│   └── Mutations:
│       ├── create (invalidates assets + transactions)
│       └── delete (invalidates assets + transactions)
│
└── Reports Query:
    ├── Key: ['reports', 'summary']
    ├── Function: reportService.getSummary()
    └── Cache: 10 minutes
```

---

## API Integration Layer

### Service Architecture

```
Application Layer
        ↓
┌───────────────────────────┐
│   Custom Hooks Layer      │
│  (useAssets, useAuth...)  │
└────────────┬──────────────┘
             ↓
┌───────────────────────────┐
│  Service Layer            │
│  (authService, assets...) │
└────────────┬──────────────┘
             ↓
┌───────────────────────────┐
│  Axios Instance (api.js)  │
│  - JWT Interceptor        │
│  - Error Handler          │
│  - Base URL Config        │
└────────────┬──────────────┘
             ↓
┌───────────────────────────┐
│  HTTP Requests            │
│  (axios.get/post/put...)  │
└────────────┬──────────────┘
             ↓
Backend API (REST)
```

---

## Database/Backend Integration

### Asset & Transaction Relationship

```
User (MongoDB)
│
├─ Assets Collection
│  ├─ _id: ObjectId
│  ├─ userId: ObjectId (reference)
│  ├─ name: String
│  ├─ category: String
│  ├─ value: Number
│  ├─ createdAt: Date
│  └─ updatedAt: Date
│
└─ Transactions Collection
   ├─ _id: ObjectId
   ├─ userId: ObjectId (reference)
   ├─ assetId: ObjectId (reference to Asset)
   ├─ type: String (income/expense)
   ├─ amount: Number
   ├─ createdAt: Date
   └─ updatedAt: Date
```

---

## Frontend File Dependencies

```
App.jsx
├── imports AuthContext → AuthContext.jsx
├── imports useAuth hook → hooks/useAuth.js
├── imports Dashboard → components/Dashboard.jsx
├── imports LandingHero → components/LandingHero.jsx
└── imports Toaster → react-hot-toast

Dashboard.jsx
├── imports useAuth → hooks/useAuth.js
├── imports useAssets → hooks/useAssets.js
├── imports useTransactions → hooks/useTransactions.js
├── imports DashboardView → dashboard/DashboardView.jsx
├── imports AssetsView → dashboard/AssetsView.jsx
└── imports TransactionsView → dashboard/TransactionsView.jsx

DashboardView.jsx
├── imports useAssets, useTransactions
└── displays assets and transaction data

AssetsView.jsx
├── imports useAssets, useCreateAsset, etc.
├── imports assetService
└── handles asset CRUD

TransactionsView.jsx
├── imports useTransactions, useCreateTransaction
├── imports transactionService
└── handles transaction management

useAssets.js
└── imports assetService

assetService.js
└── imports api from api.js

api.js
└── configures axios with interceptors
```

---

## Request/Response Flow Example

### Create Asset

```
Frontend Form
      ↓
Form Data: { name, category, value }
      ↓
useCreateAsset() mutation triggered
      ↓
assetService.createAsset(data)
      ↓
api.post('/assets', data)
      ↓
Axios adds header: { Authorization: Bearer token }
      ↓
HTTP POST request to backend
      ↓
Backend processes request
      ↓
Saves to MongoDB
      ↓
Returns: { _id, userId, name, category, value, createdAt... }
      ↓
React Query caches response
      ↓
Invalidates ['assets'] query
      ↓
Components refetch data
      ↓
UI updates with new asset
      ↓
Toast notification: "Asset created successfully"
```

---

## Error Handling Flow

```
API Request Fails
      ↓
Axios Interceptor catches error
      ↓
┌─ Status 401? (Unauthorized)
│  └─ Clear localStorage
│  └─ Redirect to login
│
└─ Other error?
   └─ Return error object
   └─ Component catches error
   └─ Display Toast notification
   └─ Show error message
```

---

## Performance Optimizations

```
Browser Rendering
      ↓
React Query Cache
├─ Prevents duplicate API calls
├─ Background refetching
└─ Automatic invalidation

Component Rendering
├─ Suspense boundaries
├─ Lazy component loading
└─ Memoization

CSS/Animations
├─ Framer Motion (optimized)
├─ Tailwind (minimal CSS)
└─ GPU acceleration
```

---

## Deployment Architecture

```
Development
├─ npm run dev
├─ Vite dev server (localhost:5173)
└─ Backend (localhost:5000)

Production
├─ npm run build → Creates dist/
├─ Host dist/ files
├─ Configure API URL
├─ Monitor performance
└─ Error tracking
```

---

## Summary

This architecture provides:
- ✅ Clean separation of concerns
- ✅ Reusable hooks and services
- ✅ Automatic state synchronization
- ✅ Scalable structure
- ✅ Performance optimizations
- ✅ Error handling
- ✅ Authentication security
- ✅ Type-safe operations
