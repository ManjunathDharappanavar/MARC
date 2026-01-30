# MARC Frontend - Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Node.js v14+
- Backend server running on `http://localhost:5000`

### Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Create environment file**:
Create a `.env` file in the frontend root directory:
```env
VITE_API_URL=http://localhost:5000/api
```

3. **Start development server**:
```bash
npm run dev
```

4. **Build for production**:
```bash
npm run build
```

## 📱 Application Routes

### Public Routes
- `/` - Landing page
- `/auth` - Login/Register page

### Protected Routes (Requires Authentication)
- `/dashboard` - Dashboard overview
- `/dashboard/assets` - Assets management
- `/dashboard/transactions` - Transactions history

## 🔐 Authentication

### First Time Setup
1. Visit `http://localhost:5173/`
2. Click "Launch Dashboard"
3. Click "Register" to create an account
4. Fill in your details and submit
5. You'll be automatically redirected to the dashboard

### Subsequent Logins
1. Visit `http://localhost:5173/auth`
2. Enter your email and password
3. Click "Login"
4. You'll be redirected to the dashboard

### Logout
- Click the logout icon in the top-right corner of the dashboard

## 🎯 Features

### Dashboard Overview
- View total net worth
- See top assets
- Track income and expenses
- View recent transactions
- Summary statistics

### Assets Management
- Create new assets (Bank, Investment, Real Estate, etc.)
- Edit existing assets
- Delete assets
- View all assets with values

### Transactions
- Create income/expense transactions
- Link transactions to assets
- Delete transactions
- View transaction history

## 🛠️ Troubleshooting

### Issue: "Cannot connect to backend"
**Solution**: Make sure the backend server is running on `http://localhost:5000`

### Issue: "Logged out after refresh"
**Solution**: This should not happen anymore. If it does:
1. Clear browser localStorage
2. Clear browser cache
3. Try logging in again

### Issue: "Blank screen after login"
**Solution**: This should not happen anymore. If it does:
1. Open browser console (F12)
2. Check for errors
3. Report the error

### Issue: "Navigation not working"
**Solution**: This should not happen anymore. The app now uses React Router v6 properly.

## 📝 Development Notes

### Code Structure
- `src/pages/` - Page components (route targets)
- `src/layouts/` - Layout components with `<Outlet />`
- `src/components/` - Reusable UI components
- `src/components/routes/` - Route guard components
- `src/hooks/` - Custom React hooks
- `src/services/` - API service functions
- `src/context/` - React Context providers

### Adding New Routes
1. Create a new page component in `src/pages/`
2. Add the route to `src/App.jsx`
3. Wrap with `<PrivateRoute>` if authentication is required
4. Add navigation link in `src/layouts/DashboardLayout.jsx`

### Adding New API Endpoints
1. Add service function in `src/services/`
2. Create custom hook in `src/hooks/` using React Query
3. Use the hook in your component

## 🎨 Styling

The app uses:
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for animations
- **Custom CSS** in `src/index.css` and `src/App.css`

### Color Scheme
- Primary: Purple (`#7000FF`)
- Secondary: Cyan (`#00F0FF`)
- Background: Dark (`#0A0A0F`)
- Surface: Dark with transparency

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📦 Dependencies

### Core
- React 19.2.0
- React Router DOM 7.13.0
- Vite (OXC compiler)

### UI & Animations
- Tailwind CSS 3.4.17
- Framer Motion 12.29.2
- Lucide React (icons)

### Data & State
- TanStack React Query 5.90.20
- Axios 1.13.4

### Utilities
- React Hot Toast (notifications)
- clsx & tailwind-merge (class utilities)

## 🎉 Success Indicators

You'll know everything is working when:
- ✅ Landing page loads with animations
- ✅ Can register a new account
- ✅ Automatically redirected to dashboard after registration
- ✅ Dashboard shows with sidebar navigation
- ✅ Can navigate between Overview, Assets, and Transactions
- ✅ Sidebar stays visible during navigation
- ✅ Can logout and login again
- ✅ Refreshing the page keeps you logged in
- ✅ Trying to access `/dashboard` while logged out redirects to `/auth`

## 🆘 Support

If you encounter any issues:
1. Check the browser console for errors
2. Check the network tab for failed API calls
3. Verify the backend is running
4. Clear localStorage and try again
5. Check `DEBUGGING_REPORT.md` for detailed fix information

---

**Happy coding!** 🚀
