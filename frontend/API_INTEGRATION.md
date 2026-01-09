# MARC Frontend - API Integration Guide

## 🔗 Backend Integration Points

This guide shows how to integrate the frontend with your Node.js backend for authentication and data handling.

---

## 1️⃣ Login Form Integration

### Current Code Location: `src/pages/Login.jsx`

#### Before Integration (Current)
```jsx
// Current: Just logs to console
const handleSubmit = (e) => {
  e.preventDefault();
  const newErrors = validateForm();
  
  if (Object.keys(newErrors).length === 0) {
    console.log('Login form submitted:', formData);
    alert('Login form valid!');
  }
};
```

#### After Integration (Example)
```jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          
          // Store JWT token in localStorage
          localStorage.setItem('authToken', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          
          // Redirect to dashboard
          navigate('/dashboard');
        } else {
          const error = await response.json();
          setErrors({ submit: error.message });
        }
      } catch (error) {
        setErrors({ submit: 'Failed to connect to server' });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    // ... JSX with loading state
  );
}

export default Login;
```

---

## 2️⃣ Register Form Integration

### Current Code Location: `src/pages/Register.jsx`

#### Integration Points
```jsx
// API endpoint for registration
const API_BASE = 'http://localhost:5000/api';

const handleSubmit = async (e) => {
  e.preventDefault();
  const newErrors = validateForm();

  if (Object.keys(newErrors).length === 0) {
    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        navigate('/login'); // Redirect to login
      } else {
        const error = await response.json();
        setErrors({ submit: error.message });
      }
    } catch (error) {
      setErrors({ submit: 'Registration failed' });
    }
  }
};
```

---

## 3️⃣ Authentication Context (Recommended)

Create `src/context/AuthContext.jsx`:

```jsx
import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('authToken', data.token);
        return { success: true };
      }
      return { success: false, error: data.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

---

## 4️⃣ Protected Routes (Recommended)

Create `src/components/ProtectedRoute.jsx`:

```jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
```

Use in App.jsx:
```jsx
<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } 
/>
```

---

## 5️⃣ API Service Layer (Recommended)

Create `src/services/api.js`:

```javascript
const API_BASE = 'http://localhost:5000/api';

export const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('authToken');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  }

  return response;
};

export const auth = {
  login: (email, password) =>
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (email, password) =>
    apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  logout: () => {
    localStorage.removeItem('authToken');
  },
};
```

---

## 6️⃣ Environment Variables Setup

Create `.env.local` in frontend directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_API_TIMEOUT=5000
```

Use in code:
```javascript
const API_BASE = import.meta.env.VITE_API_BASE_URL;
```

Update `vite.config.js`:
```javascript
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env
  }
});
```

---

## 7️⃣ CORS Configuration (Backend)

In your backend Node.js/Express:

```javascript
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true,
  optionsSuccessStatus: 200,
}));
```

---

## 8️⃣ Example: Complete Login Integration

```jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/auth.css';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Valid email required';
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be 6+ characters';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          }
        );

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('authToken', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          navigate('/dashboard');
        } else {
          setErrors({ submit: data.message || 'Login failed' });
        }
      } catch (error) {
        setErrors({ submit: 'Connection error. Please try again.' });
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Login to MARC</h1>
        <p className="auth-subtitle">Access your account</p>

        {errors.submit && (
          <div className="error-message" style={{ marginBottom: '1rem', textAlign: 'center' }}>
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className={`form-input ${errors.email ? 'input-error' : ''}`}
              disabled={loading}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className={`form-input ${errors.password ? 'input-error' : ''}`}
              disabled={loading}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/register" className="auth-link">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
```

---

## 9️⃣ Expected Backend Endpoints

```
POST   /api/auth/login        - User login
POST   /api/auth/register     - User registration
POST   /api/auth/logout       - User logout
GET    /api/auth/me           - Get current user
POST   /api/auth/refresh      - Refresh token
```

---

## 🔟 Error Handling Best Practices

```javascript
const handleError = (error) => {
  if (error.response?.status === 401) {
    // Unauthorized - redirect to login
    navigate('/login');
  } else if (error.response?.status === 422) {
    // Validation error - show field errors
    return error.response.data.errors;
  } else if (error.response?.status === 500) {
    // Server error
    return { submit: 'Server error. Please try again.' };
  } else if (error.message === 'Network Error') {
    return { submit: 'Network error. Check your connection.' };
  }
  return { submit: 'An error occurred.' };
};
```

---

## 📦 Installation for Backend Integration

```bash
# No additional packages needed for basic integration
# Following packages are optional for enhanced functionality:

npm install axios          # Alternative to fetch
npm install redux          # State management
npm install @reduxjs/toolkit  # Redux toolkit
npm install react-query    # Data fetching
```

---

## 📝 Implementation Roadmap

1. **Phase 1**: Basic API integration (login/register)
2. **Phase 2**: Authentication context & protected routes
3. **Phase 3**: API service layer for all endpoints
4. **Phase 4**: State management (Redux/Context)
5. **Phase 5**: Advanced features (dashboard, admin panel)

---

## 🚀 Testing API Integration

Use tools to test your API:
- **Postman** - REST API testing
- **Insomnia** - API exploration
- **Thunder Client** - VS Code extension
- **curl** - Command line testing

```bash
# Example: Test login endpoint
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

---

**Ready to integrate with your backend!** 🎯
