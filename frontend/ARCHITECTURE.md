# MARC Frontend Architecture Diagram

## 🏗️ Application Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                           main.jsx                               │
│                    (Entry Point - React 19)                      │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                           App.jsx                                │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │              QueryClientProvider                        │    │
│  │  ┌──────────────────────────────────────────────────┐  │    │
│  │  │           AuthProvider                            │  │    │
│  │  │  ┌────────────────────────────────────────────┐  │  │    │
│  │  │  │        BrowserRouter                        │  │  │    │
│  │  │  │  ┌──────────────────────────────────────┐  │  │  │    │
│  │  │  │  │           Routes                      │  │  │  │    │
│  │  │  │  └──────────────────────────────────────┘  │  │  │    │
│  │  │  └────────────────────────────────────────────┘  │  │    │
│  │  └──────────────────────────────────────────────────┘  │    │
│  └────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Route Tree                                │
│                                                                  │
│  /                                                               │
│  └─→ LandingPage.jsx (Public)                                   │
│                                                                  │
│  /auth                                                           │
│  └─→ AuthPage.jsx (Public)                                      │
│      ├─→ Login.jsx                                              │
│      └─→ Register.jsx                                           │
│                                                                  │
│  /dashboard                                                      │
│  └─→ PrivateRoute (Guard)                                       │
│      └─→ DashboardLayout.jsx (Persistent)                       │
│          ├─→ Sidebar (Always visible)                           │
│          ├─→ TopBar (Always visible)                            │
│          └─→ <Outlet /> (Changes based on route)                │
│              ├─→ / → DashboardOverview.jsx                      │
│              ├─→ /assets → AssetsPage.jsx                       │
│              └─→ /transactions → TransactionsPage.jsx           │
│                                                                  │
│  /* (Catch all)                                                  │
│  └─→ Navigate to="/" (Redirect)                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 🔐 Authentication Flow

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
       │ 1. Visit /
       ▼
┌─────────────────┐
│  LandingPage    │
│                 │
│  [Launch]       │◄──── Not authenticated
└────────┬────────┘
         │
         │ 2. Click "Launch Dashboard"
         ▼
┌─────────────────┐
│   AuthPage      │
│                 │
│  ┌───────────┐  │
│  │  Login    │  │
│  └─────┬─────┘  │
│        │        │
│  ┌─────▼─────┐  │
│  │ Register  │  │
│  └─────┬─────┘  │
└────────┼────────┘
         │
         │ 3. Submit credentials
         ▼
┌─────────────────┐
│  AuthContext    │
│                 │
│  login() or     │
│  register()     │
│                 │
│  ├─→ authService.login()
│  │   └─→ API call
│  │       └─→ Save token & user to localStorage
│  │           └─→ setUser(response.user)
│  │
│  └─→ isAuthenticated = true
└────────┬────────┘
         │
         │ 4. Navigate to /dashboard
         ▼
┌─────────────────┐
│  PrivateRoute   │
│                 │
│  Check:         │
│  ✓ loading?     │──── Yes ──→ Show spinner
│  ✓ auth?        │──── No ───→ Redirect to /auth
│                 │
│  ✓ Authenticated│
└────────┬────────┘
         │
         │ 5. Render children
         ▼
┌─────────────────────────────────────┐
│      DashboardLayout                │
│                                     │
│  ┌─────────────┐  ┌──────────────┐ │
│  │   Sidebar   │  │   TopBar     │ │
│  │             │  │              │ │
│  │ • Overview  │  │  User Info   │ │
│  │ • Assets    │  │  [Logout]    │ │
│  │ • Trans...  │  │              │ │
│  └─────────────┘  └──────────────┘ │
│                                     │
│  ┌─────────────────────────────┐   │
│  │        <Outlet />           │   │
│  │                             │   │
│  │  Renders child route:       │   │
│  │  • DashboardOverview        │   │
│  │  • AssetsPage               │   │
│  │  • TransactionsPage         │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

## 🔄 Navigation Flow

```
User clicks "Assets" in sidebar
         │
         ▼
┌─────────────────┐
│  React Router   │
│                 │
│  Navigate to    │
│  /dashboard/    │
│  assets         │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ DashboardLayout │
│                 │
│ ✓ Sidebar stays │
│ ✓ TopBar stays  │
│                 │
│ <Outlet />      │◄──── Only this changes!
│   renders       │
│   AssetsPage    │
└─────────────────┘
```

## 📦 Component Hierarchy

```
App
├── QueryClientProvider
│   └── AuthProvider
│       └── BrowserRouter
│           ├── Routes
│           │   ├── Route: / → LandingPage
│           │   ├── Route: /auth → AuthPage
│           │   │   ├── Login
│           │   │   └── Register
│           │   └── Route: /dashboard → PrivateRoute
│           │       └── DashboardLayout
│           │           ├── Sidebar
│           │           ├── TopBar
│           │           └── Outlet
│           │               ├── DashboardOverview
│           │               │   └── DashboardView
│           │               ├── AssetsPage
│           │               │   └── AssetsView
│           │               └── TransactionsPage
│           │                   └── TransactionsView
│           └── Toaster
```

## 🎯 Data Flow

```
┌─────────────────┐
│  Component      │
│  (Page)         │
└────────┬────────┘
         │
         │ 1. Call custom hook
         ▼
┌─────────────────┐
│  useAssets()    │
│  useTransactions│
└────────┬────────┘
         │
         │ 2. React Query
         ▼
┌─────────────────┐
│  Service        │
│  (assetService) │
└────────┬────────┘
         │
         │ 3. Axios request
         ▼
┌─────────────────┐
│  API            │
│  (api.js)       │
└────────┬────────┘
         │
         │ 4. Add auth header
         ▼
┌─────────────────┐
│  Backend API    │
│  localhost:5000 │
└────────┬────────┘
         │
         │ 5. Response
         ▼
┌─────────────────┐
│  React Query    │
│  Cache          │
└────────┬────────┘
         │
         │ 6. Update UI
         ▼
┌─────────────────┐
│  Component      │
│  Re-renders     │
└─────────────────┘
```

## 🛡️ Route Protection

```
User tries to access /dashboard
         │
         ▼
┌─────────────────┐
│  PrivateRoute   │
│                 │
│  const { isAuth,│
│    loading }    │
│  = useAuth()    │
└────────┬────────┘
         │
         ├─→ loading === true
         │   └─→ Show loading spinner
         │
         ├─→ isAuth === false
         │   └─→ <Navigate to="/auth" />
         │
         └─→ isAuth === true
             └─→ Render children (DashboardLayout)
```

## 💾 State Management

```
┌─────────────────────────────────────┐
│         AuthContext                 │
│                                     │
│  State:                             │
│  ├─ user (from localStorage)        │
│  ├─ loading                         │
│  └─ error                           │
│                                     │
│  Methods:                           │
│  ├─ login()                         │
│  ├─ register()                      │
│  └─ logout()                        │
│                                     │
│  Computed:                          │
│  └─ isAuthenticated = !!user        │
└─────────────────────────────────────┘
         │
         │ Provides to all children
         ▼
┌─────────────────────────────────────┐
│         useAuth() hook              │
│                                     │
│  Used by:                           │
│  ├─ PrivateRoute                    │
│  ├─ AdminRoute                      │
│  ├─ Login                           │
│  ├─ Register                        │
│  ├─ DashboardLayout                 │
│  └─ Any component needing auth      │
└─────────────────────────────────────┘
```

## 🔄 Lifecycle

```
App Mount
    │
    ├─→ AuthContext initializes
    │   └─→ Check localStorage for token & user
    │       ├─→ Found: setUser(storedUser)
    │       └─→ Not found: user = null
    │
    ├─→ React Router initializes
    │   └─→ Match current URL to route
    │
    └─→ Render matched route
        ├─→ Public route: Render directly
        └─→ Protected route: Check auth first
            ├─→ Authenticated: Render
            └─→ Not authenticated: Redirect to /auth

User Login
    │
    ├─→ Submit form
    ├─→ authService.login()
    ├─→ Save token & user to localStorage
    ├─→ setUser(response.user)
    ├─→ isAuthenticated becomes true
    └─→ Navigate to /dashboard

User Refresh Page
    │
    ├─→ AuthContext re-initializes
    ├─→ Reads from localStorage
    ├─→ Restores user state
    └─→ User stays logged in ✓

User Logout
    │
    ├─→ Click logout button
    ├─→ authService.logout()
    ├─→ Clear localStorage
    ├─→ setUser(null)
    ├─→ isAuthenticated becomes false
    └─→ Navigate to /
```

---

This architecture ensures:
- ✅ Persistent authentication
- ✅ Proper route protection
- ✅ No redirect loops
- ✅ Clean separation of concerns
- ✅ Maintainable code structure
- ✅ Scalable for future features
