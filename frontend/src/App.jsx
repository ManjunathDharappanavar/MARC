import { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

// Components
import ErrorBoundary from './components/ErrorBoundary';

// Pages
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardOverview from './pages/DashboardOverview';
import AssetsPage from './pages/AssetsPage';
import TransactionsPage from './pages/TransactionsPage';

// Route Guards
import PrivateRoute from './components/routes/PrivateRoute';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});

const LoadingFallback = () => (
    <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-400">Loading...</p>
        </div>
    </div>
);

function App() {
    return (
        <ErrorBoundary>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <BrowserRouter>
                        <Suspense fallback={<LoadingFallback />}>
                            <Routes>
                                {/* Public Routes */}
                                <Route path="/" element={<LandingPage />} />
                                <Route path="/auth" element={<AuthPage />} />

                                {/* Protected Routes with Layout */}
                                <Route
                                    path="/dashboard"
                                    element={
                                        <PrivateRoute>
                                            <DashboardLayout />
                                        </PrivateRoute>
                                    }
                                >
                                    <Route index element={<DashboardOverview />} />
                                    <Route path="assets" element={<AssetsPage />} />
                                    <Route path="transactions" element={<TransactionsPage />} />
                                </Route>

                                {/* Catch all - redirect to landing */}
                                <Route path="*" element={<Navigate to="/" replace />} />
                            </Routes>
                        </Suspense>
                        <Toaster position="top-right" />
                    </BrowserRouter>
                </AuthProvider>
            </QueryClientProvider>
        </ErrorBoundary>
    );
}

export default App;
