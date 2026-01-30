# MARC Frontend - Testing Checklist

Use this checklist to verify that all fixes are working correctly.

## 🚀 Pre-Testing Setup

- [ ] Backend server is running on `http://localhost:5000`
- [ ] Frontend `.env` file exists with `VITE_API_URL=http://localhost:5000/api`
- [ ] Run `npm install` to ensure all dependencies are installed
- [ ] Run `npm run build` to verify build succeeds

## ✅ Build Tests

### Build Verification
- [ ] Run `npm run build`
- [ ] Build completes successfully
- [ ] No compilation errors
- [ ] No JSX syntax errors
- [ ] All modules transformed successfully

**Expected Output:**
```
✓ 2218 modules transformed.
dist/index.html                 0.46 kB
dist/assets/index-*.css        21.75 kB
dist/assets/index-*.js        685.39 kB
✓ built in X.XXs
```

## 🌐 Runtime Tests

### 1. Landing Page
- [ ] Run `npm run dev`
- [ ] Visit `http://localhost:5173/`
- [ ] Landing page loads without errors
- [ ] Animations work (floating orbs, fade-ins)
- [ ] "Launch Dashboard" button is visible
- [ ] Click "Launch Dashboard"
- [ ] Redirects to `/auth`

### 2. Authentication - Registration
- [ ] On `/auth` page, click "Register" tab
- [ ] Fill in registration form:
  - Name: Test User
  - Email: test@example.com
  - Password: password123
  - Confirm Password: password123
- [ ] Click "Create Account"
- [ ] Toast notification shows "Registration successful!"
- [ ] **CRITICAL**: Automatically redirects to `/dashboard`
- [ ] Dashboard loads with sidebar and content
- [ ] User name appears in top-right corner

### 3. Authentication - Logout
- [ ] Click logout icon in top-right corner
- [ ] Toast notification shows "Logged out successfully"
- [ ] Redirects to landing page `/`
- [ ] User is logged out

### 4. Authentication - Login
- [ ] From landing page, click "Launch Dashboard"
- [ ] On `/auth` page, should be on "Login" tab
- [ ] Fill in login form:
  - Email: test@example.com
  - Password: password123
- [ ] Click "Login"
- [ ] Toast notification shows "Login successful!"
- [ ] **CRITICAL**: Automatically redirects to `/dashboard`
- [ ] Dashboard loads correctly

### 5. Route Protection
- [ ] While logged out, try to visit `http://localhost:5173/dashboard` directly
- [ ] **CRITICAL**: Should redirect to `/auth`
- [ ] Login
- [ ] **CRITICAL**: Should redirect back to `/dashboard`

### 6. Navigation Persistence
- [ ] Login to dashboard
- [ ] Verify sidebar is visible
- [ ] Click "Assets" in sidebar
- [ ] **CRITICAL**: URL changes to `/dashboard/assets`
- [ ] **CRITICAL**: Sidebar stays visible (doesn't disappear)
- [ ] Assets page content loads
- [ ] Click "Transactions" in sidebar
- [ ] **CRITICAL**: URL changes to `/dashboard/transactions`
- [ ] **CRITICAL**: Sidebar stays visible
- [ ] Transactions page content loads
- [ ] Click "Overview" in sidebar
- [ ] **CRITICAL**: URL changes to `/dashboard`
- [ ] **CRITICAL**: Sidebar stays visible
- [ ] Overview page content loads

### 7. Auth Persistence (Refresh)
- [ ] Login to dashboard
- [ ] Note the current page (e.g., `/dashboard/assets`)
- [ ] Press F5 to refresh the page
- [ ] **CRITICAL**: User stays logged in
- [ ] **CRITICAL**: Same page loads (not redirected to login)
- [ ] Dashboard content displays correctly

### 8. Browser Back/Forward
- [ ] Login to dashboard
- [ ] Navigate: Overview → Assets → Transactions
- [ ] Click browser back button
- [ ] **CRITICAL**: Goes back to Assets page
- [ ] Sidebar still visible
- [ ] Click browser back button again
- [ ] **CRITICAL**: Goes back to Overview page
- [ ] Click browser forward button
- [ ] **CRITICAL**: Goes forward to Assets page

### 9. Direct URL Access
- [ ] Login to dashboard
- [ ] Manually type in browser: `http://localhost:5173/dashboard/transactions`
- [ ] Press Enter
- [ ] **CRITICAL**: Transactions page loads
- [ ] User is still authenticated
- [ ] Sidebar is visible

### 10. Assets Management
- [ ] Navigate to Assets page
- [ ] Click "Create Asset" button
- [ ] Fill in form:
  - Name: Savings Account
  - Category: Bank
  - Value: 5000
- [ ] Click "Create Asset"
- [ ] Toast notification shows success
- [ ] New asset appears in the list
- [ ] Asset shows correct value: $5,000.00

### 11. Transactions Management
- [ ] Navigate to Transactions page
- [ ] Click "Create Transaction" button
- [ ] Fill in form:
  - Asset: Select "Savings Account"
  - Type: Income
  - Amount: 1000
- [ ] Click "Create Transaction"
- [ ] Toast notification shows success
- [ ] New transaction appears in the list
- [ ] Navigate to Assets page
- [ ] **CRITICAL**: Savings Account value updated to $6,000.00

### 12. Mobile Responsiveness
- [ ] Open browser DevTools (F12)
- [ ] Toggle device toolbar (Ctrl+Shift+M)
- [ ] Select mobile device (e.g., iPhone 12)
- [ ] Sidebar should be hidden by default
- [ ] Click hamburger menu icon
- [ ] Sidebar slides in
- [ ] Click a navigation item
- [ ] Sidebar closes automatically
- [ ] Content displays correctly on mobile

## 🐛 Error Scenarios

### Invalid Login
- [ ] Try to login with wrong password
- [ ] **CRITICAL**: Error toast appears
- [ ] **CRITICAL**: Stays on auth page (doesn't redirect)
- [ ] **CRITICAL**: No console errors

### Network Error
- [ ] Stop the backend server
- [ ] Try to login
- [ ] **CRITICAL**: Error toast appears
- [ ] **CRITICAL**: Doesn't crash
- [ ] Start backend server again
- [ ] Try to login again
- [ ] **CRITICAL**: Works correctly

### Empty Forms
- [ ] Try to submit login form with empty fields
- [ ] **CRITICAL**: Validation errors appear
- [ ] **CRITICAL**: Form doesn't submit
- [ ] **CRITICAL**: No console errors

## 🔍 Console Checks

### No Errors
- [ ] Open browser console (F12)
- [ ] Navigate through entire app
- [ ] **CRITICAL**: No red errors in console
- [ ] **CRITICAL**: No "Cannot read property" errors
- [ ] **CRITICAL**: No "undefined is not a function" errors

### Network Requests
- [ ] Open Network tab in DevTools
- [ ] Login
- [ ] Check POST request to `/api/auth/login`
- [ ] **CRITICAL**: Status 200 (success)
- [ ] **CRITICAL**: Response contains `token` and `user`
- [ ] Navigate to Assets page
- [ ] Check GET request to `/api/assets`
- [ ] **CRITICAL**: Status 200
- [ ] **CRITICAL**: Authorization header present: `Bearer <token>`

## 📊 Performance Checks

### Load Times
- [ ] Landing page loads in < 2 seconds
- [ ] Dashboard loads in < 3 seconds
- [ ] Navigation between pages is instant
- [ ] No visible lag or stuttering

### Animations
- [ ] All animations are smooth
- [ ] No janky transitions
- [ ] Hover effects work correctly
- [ ] Loading spinners appear when needed

## ✅ Final Verification

### Critical Success Criteria
- [ ] ✅ Login redirects to dashboard immediately
- [ ] ✅ Register redirects to dashboard immediately
- [ ] ✅ Sidebar never disappears during navigation
- [ ] ✅ Refresh doesn't log user out
- [ ] ✅ Protected routes redirect to auth when not logged in
- [ ] ✅ Zero build errors
- [ ] ✅ Zero console errors during normal use
- [ ] ✅ All CRUD operations work (Create, Read, Update, Delete)

### Sign-Off
- [ ] All tests passed
- [ ] No critical issues found
- [ ] Application is stable
- [ ] Ready for production

## 🆘 If Tests Fail

### Common Issues

**Issue: Build fails**
- Solution: Run `npm install` again
- Solution: Delete `node_modules` and `package-lock.json`, then `npm install`

**Issue: "Cannot connect to backend"**
- Solution: Ensure backend is running on port 5000
- Solution: Check `.env` file has correct `VITE_API_URL`

**Issue: Redirects not working**
- Solution: Clear browser cache and localStorage
- Solution: Hard refresh (Ctrl+Shift+R)

**Issue: Auth state lost on refresh**
- Solution: Check browser console for localStorage errors
- Solution: Ensure cookies/localStorage are enabled

**Issue: Sidebar disappears**
- Solution: This should NOT happen - check console for errors
- Solution: Verify `DashboardLayout.jsx` is being used

## 📝 Notes

- All tests should pass on first try
- If any test fails, check the console for errors
- Report any failures with:
  - What you were doing
  - What you expected
  - What actually happened
  - Console errors (if any)

---

**Testing Date**: _____________
**Tested By**: _____________
**Result**: ☐ PASS ☐ FAIL
**Notes**: _____________________________________________
