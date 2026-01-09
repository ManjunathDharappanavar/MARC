# MARC Frontend - Quick Start Guide

## 🎯 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
cd frontend
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```
Visit `http://localhost:5173` in your browser.

### Step 3: Start Building!
- Edit components in `src/components/`
- Edit pages in `src/pages/`
- Edit styles in `src/styles/`
- Hot Module Replacement (HMR) will update automatically

---

## 📂 File Structure at a Glance

```
src/
├── App.jsx                    # Routing setup
├── main.jsx                   # Entry point
│
├── components/
│   ├── Navbar.jsx            # Navigation with hamburger
│   └── Footer.jsx            # Contact footer
│
├── pages/
│   ├── Home.jsx              # Landing page
│   ├── About.jsx             # About section
│   ├── Login.jsx             # Login form
│   └── Register.jsx          # Registration form
│
└── styles/
    ├── navbar.css
    ├── footer.css
    ├── home.css
    └── auth.css
```

---

## 🔧 Common Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint checks |

---

## 🎨 Color References

Quick access to the color palette used throughout the app:

```css
Primary Blue: #0066cc
Secondary Teal: #00a8e8
Gradient Purple: #667eea to #764ba2
Dark Background: #1a1a2e
Light Background: #f5f5f5
Text Dark: #222222
Text Light: #666666
Border: #e0e0e0
```

---

## 📱 Responsive Design

The app is fully responsive:
- **Desktop** (>768px): Full horizontal menu
- **Mobile** (<768px): Hamburger menu
- **All Sizes**: Optimized layouts and typography

---

## 🚀 Key Features Built

✅ Responsive Navbar with hamburger menu  
✅ Landing page with hero section  
✅ About page with feature cards  
✅ Login page with form validation  
✅ Register page with password matching  
✅ Professional footer with contact info  
✅ Client-side routing (no page reloads)  
✅ Smooth animations and transitions  
✅ Mobile-first design  

---

## 🔗 Routes Available

| Route | Page |
|-------|------|
| `/` | Home (Hero section) |
| `/about` | About MARC |
| `/login` | User login |
| `/register` | New user registration |
| `/*` | 404 Not Found |

---

## 💡 Tips

1. **Hot Reload**: Changes to code auto-update in the browser
2. **Hamburger Menu**: Toggle with viewport resize (use DevTools)
3. **Forms**: Login/Register pages have built-in validation
4. **Styling**: All CSS in separate files, no inline styles
5. **Navigation**: Click logo to return to home from anywhere

---

## 🛠️ Next Steps (Future)

- Connect to backend API
- Add user authentication
- Implement state management
- Build dashboard features
- Add asset management functionality
- Integrate database

---

## ⚡ Performance

- Vite build tool for fast dev experience
- Tree-shaking for optimized bundle
- CSS organized and modular
- Minimal re-renders with React hooks

---

## 📞 Support

For issues or questions:
- Check [React Docs](https://react.dev)
- Check [React Router Docs](https://reactrouter.com)
- Review component comments in code
- See PROJECT_SETUP.md for detailed documentation

---

**Happy Coding! 🚀**
