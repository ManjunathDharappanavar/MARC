# MARC - Management of Assets, Resources, and Controlling

A production-ready React frontend application for comprehensive asset management, resource allocation, and operational control.

## 🚀 Tech Stack

- **React 19.2.0** - UI library with functional components and hooks
- **Vite** - Modern build tool and dev server
- **React Router DOM 6.22.0** - Client-side routing
- **CSS3** - Responsive styling with modern features
- **JavaScript ES6+** - Modern JavaScript features

## 📁 Project Structure

```
src/
├── main.jsx                 # Application entry point
├── App.jsx                  # Main app component with routing
├── App.css                  # App layout styles
├── index.css                # Global styles
│
├── components/
│   ├── Navbar.jsx          # Navigation bar with hamburger menu
│   └── Footer.jsx          # Footer with contact information
│
├── pages/
│   ├── Home.jsx            # Hero section landing page
│   ├── About.jsx           # About MARC page
│   ├── Login.jsx           # Login page with form validation
│   └── Register.jsx        # Registration page with form validation
│
├── styles/
│   ├── navbar.css          # Navbar responsive styles
│   ├── footer.css          # Footer styles
│   ├── home.css            # Home and About page styles
│   └── auth.css            # Login and Register page styles
│
└── assets/
    └── (optional assets)
```

## 🎨 Design System

### Color Palette
- **Primary Color**: `#0066cc` (Blue)
- **Secondary Color**: `#00a8e8` (Teal)
- **Accent**: `#667eea` - `#764ba2` (Gradient)
- **Dark Background**: `#1a1a2e`
- **Light Background**: `#f5f5f5`
- **Text Dark**: `#222222`
- **Text Light**: `#666666`
- **Border Color**: `#e0e0e0`

### Responsive Breakpoints
- **Desktop**: > 768px
- **Tablet**: 481px - 768px
- **Mobile**: ≤ 480px

## 🛠️ Setup & Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation Steps

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

6. **Run linter**
   ```bash
   npm run lint
   ```

## 📋 Features

### 1. **Navbar Component** ✅
- Responsive horizontal menu (desktop)
- Hamburger menu (mobile, < 768px)
- Logo text: "MARC"
- Active route highlighting with smooth underline animation
- Smooth open/close menu animation
- Navigation links: Home, About, Login, Register

### 2. **Footer Component** ✅
- Professional minimal design
- Contact information:
  - Email: contact@marc.com
  - Phone: +91 90000 00000
- Gradient background
- Responsive layout

### 3. **Home Page** ✅
- Hero section with centered layout
- Main title: "MARC"
- Subtitle and description
- "Get Started" CTA button
- Animated gradient background
- Responsive design

### 4. **About Page** ✅
- "About MARC" title
- Professional description in card layout
- Mission statement
- Key features list
- Why Choose MARC section
- Hover animations on cards

### 5. **Login Page** ✅
- Clean card-based UI
- Email and password inputs
- Form validation:
  - Valid email format
  - Minimum 6 characters password
  - Required field checks
- Real-time error messages
- Link to registration page
- Smooth animations

### 6. **Register Page** ✅
- Clean card-based UI
- Email, password, and confirm password inputs
- Comprehensive form validation:
  - Valid email format
  - Minimum 6 characters password
  - Password confirmation matching
  - Required field checks
- Real-time error messages
- Link to login page
- Smooth animations

### 7. **Routing** ✅
- React Router DOM v6 implementation
- Routes configured in App.jsx:
  - `/` → Home
  - `/about` → About
  - `/login` → Login
  - `/register` → Register
  - `*` → 404 Not Found
- BrowserRouter wrapper

### 8. **Responsiveness** ✅
- Mobile-first approach
- Hamburger menu activates at < 768px
- All layouts adapt to screen sizes
- Touch-friendly inputs (16px font for iOS)
- Proper spacing and typography

## 🎯 Component Details

### Navbar.jsx
**Props**: None (uses hooks internally)

**State**:
- `isMenuOpen` - Controls hamburger menu visibility

**Features**:
- Active route detection using `useLocation()`
- Smooth hamburger animation
- Menu auto-closes on link click
- Accessible navigation with proper ARIA labels

### Footer.jsx
**Props**: None

**Features**:
- Dynamic copyright year
- Email and phone links
- Professional gradient design
- Responsive grid layout

### Pages Structure
All pages include:
- Proper semantic HTML
- Loading animations
- Responsive design
- Clean separation of concerns
- Reusable styling patterns

### Form Validation (Login/Register)
**Validation Rules**:
- Email: Must be valid email format
- Password: Minimum 6 characters
- Confirm Password: Must match password
- All fields: Required

**User Feedback**:
- Real-time error messages
- Error highlight on input fields
- Clear error states
- Success ready state

## 🎨 CSS Architecture

### Global Styles
- `index.css` - Global typography, colors, and base styles
- `App.css` - App layout and 404 page

### Component Styles
- Each component has dedicated CSS file
- No inline styles used
- CSS custom properties (variables) for theming
- Animations and transitions for smooth UX
- Mobile-first responsive design

### Animations Used
- `fadeIn` - Fade in effect
- `fadeInUp` - Slide up while fading
- `slideDown` - Slide down animation
- `slideUp` - Slide up animation
- `slideIn` - Slide in animation
- `gradientShift` - Animated gradient background
- `float` - Floating animation

## 📱 Responsive Design Details

### Desktop (> 768px)
- Horizontal navigation menu
- Full-size hero section
- Grid layouts for content cards
- Standard button sizes

### Tablet (481px - 768px)
- Hamburger menu activated
- Adjusted padding and margins
- Responsive grid (2 columns)
- Touch-optimized spacing

### Mobile (≤ 480px)
- Full hamburger menu
- Stacked layouts
- Single column content
- 16px input font (iOS zoom prevention)
- Optimized touch targets

## 🔒 Best Practices Implemented

✅ **Code Quality**
- Clean, well-commented JSX
- Semantic HTML structure
- Proper component separation
- Reusable styling patterns
- No inline CSS

✅ **Accessibility**
- ARIA labels for interactive elements
- Semantic HTML elements
- Keyboard navigation support
- Color contrast compliance
- Focus visible states

✅ **Performance**
- Lightweight CSS animations
- Optimized re-renders with React hooks
- Vite for fast build times
- Proper code splitting ready

✅ **UX/Design**
- Academic + enterprise aesthetic
- Consistent color scheme
- Smooth animations and transitions
- Proper spacing and typography
- Hover effects on interactive elements

## 🚀 Deployment Ready

The application is ready for deployment:
- Production build: `npm run build`
- Optimized bundle with Vite
- Minified CSS and JavaScript
- Environment variables support ready
- Static file hosting compatible

## 📝 Code Examples

### Using the Navbar
```jsx
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      {/* Page content */}
    </>
  );
}
```

### Routing Setup
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## 🔄 Future Enhancements

Planned features for integration:
- Backend API integration
- User authentication with JWT
- State management (Redux/Context API)
- Form submission to backend
- Database integration
- Advanced analytics dashboard
- Admin panel
- User profile management
- Asset management features
- Resource allocation tools

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [React Router Documentation](https://reactrouter.com)
- [Vite Documentation](https://vitejs.dev)
- [CSS3 Guide](https://developer.mozilla.org/en-US/docs/Web/CSS)

## 🤝 Contributing

When contributing to MARC:
1. Follow the established folder structure
2. Use functional components with hooks
3. Keep CSS in separate files
4. Maintain semantic HTML
5. Add comments to complex logic
6. Test responsive design on multiple devices

## 📄 License

This project is part of the Final Year Project (Academic Purpose).

---

**Project Created**: January 2026
**Last Updated**: January 2026

For questions or support, contact: contact@marc.com
