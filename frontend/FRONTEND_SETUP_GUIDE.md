# MARC Frontend - Complete React Application

A modern, feature-rich frontend for the MARC (Multi-Asset Resource Controller) financial management application. Built with React, Vite, TailwindCSS, and Framer Motion.

## Features

✨ **Authentication System**
- User registration and login
- JWT token management
- Persistent authentication with localStorage
- Protected routes

📊 **Dashboard**
- Real-time net worth calculation
- Asset portfolio overview
- Recent transaction feed
- Summary statistics

💰 **Asset Management**
- Create, read, update, and delete assets
- Multiple asset categories (Bank, Investment, Real Estate, Vehicle, Cryptocurrency, Other)
- Asset value tracking
- Visual portfolio breakdown

📈 **Transaction Management**
- Log income and expenses
- Transaction history with filtering
- Automatic asset value updates
- Transaction deletion with reversal

📱 **Responsive Design**
- Mobile-first approach
- Sidebar navigation
- Smooth animations with Framer Motion
- Glass-morphism design aesthetic

## Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite (with rolldown)
- **Styling**: Tailwind CSS + PostCSS
- **State Management**: React Context API
- **Data Fetching**: Axios + React Query (@tanstack/react-query)
- **Animations**: Framer Motion
- **Notifications**: React Hot Toast
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge

## Project Structure

```
src/
├── components/          # React components
│   ├── AuthPage.jsx
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── LandingHero.jsx
│   ├── ProtectedRoute.jsx
│   └── dashboard/
│       ├── DashboardView.jsx
│       ├── AssetsView.jsx
│       └── TransactionsView.jsx
├── context/            # Context providers
│   └── AuthContext.jsx
├── hooks/             # Custom hooks
│   ├── useAuth.js
│   ├── useAssets.js
│   ├── useTransactions.js
│   └── useReports.js
├── services/          # API services
│   ├── api.js
│   ├── authService.js
│   ├── assetService.js
│   ├── transactionService.js
│   └── reportService.js
├── utils/            # Utility functions
│   └── cn.js
├── App.jsx           # Main app component
├── main.jsx          # Entry point
├── index.css         # Global styles
└── App.css          # App-specific styles
```

## Setup Instructions

### Prerequisites

- Node.js v14+ and npm
- Backend server running on `http://localhost:5000` (configurable)

### Installation

1. **Navigate to the frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment configuration**
   ```bash
   cp .env.example .env.local
   ```

4. **Update API URL (if backend is not on localhost:5000)**
   Edit `.env.local`:
   ```env
   VITE_API_URL=http://your-backend-url/api
   ```

### Running the Application

**Development Mode**
```bash
npm run dev
```
The application will be available at `http://localhost:5173`

**Production Build**
```bash
npm run build
```

**Preview Production Build**
```bash
npm run preview
```

## API Integration

The frontend seamlessly integrates with the MARC Backend API. All API calls are managed through:

- **Authorization**: JWT tokens stored in localStorage
- **Interceptors**: Automatic token injection and 401 error handling
- **Error Handling**: Toast notifications for user feedback

### Available API Endpoints

#### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/profile` - Get current user profile

#### Assets
- `GET /assets` - Get all assets
- `GET /assets/:id` - Get asset by ID
- `POST /assets` - Create new asset
- `PUT /assets/:id` - Update asset
- `DELETE /assets/:id` - Delete asset

#### Transactions
- `GET /transactions` - Get all transactions
- `GET /transactions/:id` - Get transaction by ID
- `POST /transactions` - Create transaction
- `DELETE /transactions/:id` - Delete transaction

#### Reports
- `GET /reports/summary` - Get summary statistics

## Components Overview

### AuthPage
Handles user authentication with toggle between login and register forms.

**Props**: None
**State**: Form data, validation errors

### Dashboard
Main application container with sidebar navigation and protected content.

**Features**:
- Tab-based navigation (Overview, Assets, Transactions)
- User profile display
- Logout functionality
- Responsive sidebar

### DashboardView
Displays financial overview with net worth, asset breakdown, and recent transactions.

**Props**:
- `totalNetWorth`: number
- `assets`: array
- `transactions`: array
- `assetsLoading`: boolean
- `transactionsLoading`: boolean

### AssetsView
Complete asset management interface with CRUD operations.

**Features**:
- Create/Edit/Delete assets
- Category selection
- Value tracking
- Empty state handling

### TransactionsView
Transaction management with income/expense tracking.

**Features**:
- Create transactions
- Transaction history with sorting
- Income/Expense filtering
- Automatic asset updates
- Transaction deletion with reversal

## Custom Hooks

### useAuth()
Access authentication state and methods.
```javascript
const { user, isAuthenticated, login, register, logout } = useAuth();
```

### useAssets()
Query and manage assets with React Query.
```javascript
const { data: assets, isLoading } = useAssets();
const createMutation = useCreateAsset();
const updateMutation = useUpdateAsset();
const deleteMutation = useDeleteAsset();
```

### useTransactions()
Query and manage transactions.
```javascript
const { data: transactions, isLoading } = useTransactions();
const createMutation = useCreateTransaction();
const deleteMutation = useDeleteTransaction();
```

### useReportSummary()
Fetch summary statistics.
```javascript
const { data: summary } = useReportSummary();
```

## Styling

The application uses:
- **Tailwind CSS**: Utility-first CSS framework
- **Custom Colors**: Defined in `tailwind.config.js`
  - Primary: #7000FF (Cyber Purple)
  - Secondary: #00F0FF (Electric Blue)
  - Background: #030014 (Deep dark)
  - Surface: #0F0F1B (Slightly lighter)
- **Glass-morphism**: Custom glass-panel utility class
- **Animations**: Framer Motion for smooth transitions

## Error Handling

- **API Errors**: Displayed via Toast notifications
- **Validation Errors**: Inline form validation with error messages
- **Authentication Errors**: Automatic redirect to login on 401
- **Network Errors**: Graceful error handling with user feedback

## Performance Optimizations

- **React Query**: Automatic caching and background refetching
- **Code Splitting**: Lazy loading of components
- **Memoization**: Optimized re-renders with memo
- **Debounced Updates**: Prevent excessive API calls

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Troubleshooting

### Connection Issues
If the frontend can't connect to the backend:
1. Verify backend is running on the configured port
2. Check `VITE_API_URL` in `.env.local`
3. Ensure CORS is enabled on the backend

### Build Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install

# Clear Vite cache
rm -rf dist
npm run build
```

### Authentication Issues
- Clear localStorage: `localStorage.clear()` in browser console
- Re-login to refresh tokens

## Contributing

When adding new features:
1. Create new components in `src/components`
2. Add services in `src/services` if needed
3. Create custom hooks in `src/hooks`
4. Maintain consistent styling with Tailwind
5. Add error handling and loading states

## Future Enhancements

- [ ] Advanced chart visualizations
- [ ] Budget tracking and goals
- [ ] Transaction categories and tags
- [ ] Data export (CSV, PDF)
- [ ] Dark/Light theme toggle
- [ ] Multi-currency support
- [ ] Recurring transactions
- [ ] Asset allocation analysis
- [ ] Mobile app version

## License

ISC

## Support

For issues or questions, contact the development team or create an issue in the project repository.
