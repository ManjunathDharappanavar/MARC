import { Suspense } from 'react';
import { AuthProvider } from './context/AuthContext';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import LandingHero from './components/LandingHero';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './hooks/useAuth';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});

const AppContent = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
                    <p className="text-gray-400">Loading...</p>
                </div>
            </div>
        );
    }

    // Show Dashboard if authenticated, otherwise show LandingHero
    if (isAuthenticated) {
        return (
            <div className="bg-background text-white min-h-screen font-sans selection:bg-primary selection:text-white">
                <Dashboard />
            </div>
        );
    }

    // Not authenticated - show landing page
    return (
        <div className="bg-background text-white min-h-screen font-sans selection:bg-primary selection:text-white">
            <LandingHero />
        </div>
    );
};

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Suspense fallback={
                    <div className="min-h-screen bg-background flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-secondary"></div>
                    </div>
                }>
                    <AppContent />
                </Suspense>
                <Toaster position="top-right" />
            </AuthProvider>
        </QueryClientProvider>
    );
}

export default App;
