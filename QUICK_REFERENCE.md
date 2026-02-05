# MARC Frontend - Quick Reference Guide

## 🚀 Quick Start (30 seconds)

```bash
# 1. Navigate to frontend
cd frontend

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev

# 4. Open http://localhost:5173
```

---

## 📋 File Reference

### Services (API Layer)
- **api.js** - Axios configuration with JWT interceptors
- **authService.js** - Login, Register, Logout, Profile
- **assetService.js** - CRUD operations for assets
- **transactionService.js** - Create, Read, Delete transactions
- **reportService.js** - Fetch summary reports

### Hooks (Data Management)
- **useAuth()** - User authentication state
- **useAssets()** - Asset queries and mutations
- **useTransactions()** - Transaction queries and mutations
- **useReports()** - Report data fetching

### Components
- **App.jsx** - Main app with routing logic
- **Dashboard.jsx** - Main layout with sidebar and tabs
- **AuthPage.jsx** - Login/Register page wrapper
- **Login.jsx** - Login form component
- **Register.jsx** - Registration form component
- **DashboardView.jsx** - Overview/statistics dashboard
- **AssetsView.jsx** - Asset management interface
- **TransactionsView.jsx** - Transaction management interface

### Context
- **AuthContext.jsx** - Global authentication state

---

## 🔌 API Configuration

### Environment Variables
```bash
# .env.local
VITE_API_URL=http://localhost:5000/api
```

### Default Configuration
- Backend URL: `http://localhost:5000/api`
- API version: v1 (integrated into routes)
- Auth header: `Authorization: Bearer <token>`

---

## 🔑 Key Hooks Usage Examples

### Authentication
```javascript
import { useAuth } from '../hooks/useAuth';

const { user, isAuthenticated, login, register, logout } = useAuth();
```

### Assets
```javascript
import { useAssets, useCreateAsset, useUpdateAsset, useDeleteAsset } from '../hooks/useAssets';

const { data: assets } = useAssets();
const createAsset = useCreateAsset();
```

### Transactions
```javascript
import { useTransactions, useCreateTransaction } from '../hooks/useTransactions';

const { data: transactions } = useTransactions();
const createTx = useCreateTransaction();
```

---

## 🎯 Component Props

### DashboardView
```javascript
<DashboardView
  totalNetWorth={number}
  assets={array}
  transactions={array}
  assetsLoading={boolean}
  transactionsLoading={boolean}
/>
```

### AssetsView
```javascript
<AssetsView
  assets={array}
  isLoading={boolean}
/>
```

### TransactionsView
```javascript
<TransactionsView
  transactions={array}
  isLoading={boolean}
  assets={array}
/>
```

---

## 📝 Form Data Structures

### Asset Form
```javascript
{
  name: "Savings Account",      // string, required
  category: "Bank",              // enum: Bank, Investment, Real Estate, Vehicle, Cryptocurrency, Other
  value: 5000                    // number, required
}
```

### Transaction Form
```javascript
{
  assetId: "65b8e9...",         // string (MongoDB ID), required
  type: "expense",               // enum: "income" | "expense"
  amount: 200                    // number, required
}
```

### User Form (Register)
```javascript
{
  name: "John Doe",              // string, required
  email: "john@example.com",     // email, required
  password: "securepass123"      // string, min 6 chars, required
}
```

---

## 🎨 Styling Classes

### Utility Classes
```css
.glass-panel    /* Glassmorphism card style */
.text-gradient  /* Gradient text effect */
```

### Color Variables
```
primary:        #7000FF  (Cyber Purple)
secondary:      #00F0FF  (Electric Blue)
background:     #030014  (Deep Dark)
surface:        #0F0F1B  (Card Background)
```

### Common Tailwind Patterns
```jsx
// Gradient text
className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary"

// Glass panel
className="glass-panel p-6"

// Hover animation
className="hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]"
```

---

## 🔄 Data Flow

### Authentication Flow
```
User Input → Form → Service → API → localStorage → Context → Components Update
```

### Asset Management Flow
```
User Action → Hook Mutation → API Request → React Query Cache Update → UI Re-render
```

### Transaction Flow
```
Create Transaction → Update Asset Value → Invalidate Caches → UI Updates
```

---

## ⚙️ Common Tasks

### Add New Asset
```javascript
const { mutateAsync } = useCreateAsset();
await mutateAsync({ name, category, value });
```

### Create Transaction
```javascript
const { mutateAsync } = useCreateTransaction();
await mutateAsync({ assetId, type, amount });
```

### Delete Asset
```javascript
const { mutateAsync } = useDeleteAsset();
await mutateAsync(assetId);
```

### Get Current User
```javascript
const { user } = useAuth();
console.log(user.name, user.email);
```

---

## 🐛 Debugging

### Check Authentication
```javascript
// In browser console
localStorage.getItem('token');
localStorage.getItem('user');
```

### Check API Calls
1. Open DevTools → Network tab
2. Look for API requests to `/api/assets`, `/api/transactions`, etc.
3. Check response status and body

### Common Issues
| Issue | Solution |
|-------|----------|
| 401 Unauthorized | Clear localStorage, re-login |
| CORS errors | Check backend CORS config |
| 404 not found | Verify API URL in .env.local |
| Empty data | Check if backend returned data |

---

## 📦 Dependencies Overview

| Package | Purpose |
|---------|---------|
| react | UI framework |
| vite | Build tool |
| axios | HTTP client |
| @tanstack/react-query | Server state management |
| framer-motion | Animations |
| tailwindcss | Styling |
| react-hot-toast | Notifications |
| lucide-react | Icons |

---

## 🚢 Deployment Checklist

- [ ] Build: `npm run build`
- [ ] Test build: `npm run preview`
- [ ] Check dist/ folder created
- [ ] Update VITE_API_URL for production
- [ ] Upload dist/ to hosting
- [ ] Configure backend URL
- [ ] Test on production URL
- [ ] Monitor for errors

---

## 📞 Quick Help

**Port conflicts?**
```bash
npm run dev -- --port 3000
```

**Clear cache?**
```bash
rm -rf node_modules .vite dist
npm install
npm run dev
```

**Build errors?**
```bash
npm install
npm run build
```

---

## 🎓 Learning Path

1. **Understand Structure** → Read project structure
2. **Review Services** → Check API layer
3. **Study Hooks** → Understand data management
4. **Explore Components** → Review UI components
5. **Test Flows** → Try creating assets/transactions
6. **Customize** → Add features as needed

---

## 💡 Tips & Tricks

- Use `useAuth()` to check if user is logged in
- React Query automatically caches data
- Mutations automatically invalidate cache
- Framer Motion adds smooth animations
- Tailwind classes are fully available
- Toast notifications appear on all operations
- Mobile menu auto-closes when selecting tab

---

**Built with ❤️ for Financial Excellence**
