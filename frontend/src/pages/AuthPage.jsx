import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import Login from '../components/Login';
import Register from '../components/Register';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    // If already authenticated, redirect to dashboard
    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    const handleAuthSuccess = () => {
        // Navigate to dashboard after successful auth
        navigate('/dashboard', { replace: true });
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background ambient glow */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse-slow" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/20 rounded-full blur-[80px] animate-float" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>

            <div className="relative z-10 w-full max-w-md">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-6 backdrop-blur-sm">
                        <span className="flex h-2 w-2 rounded-full bg-secondary animate-pulse" />
                        <span className="text-sm text-gray-300 font-medium">MARC Finance</span>
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                    </div>
                    <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
                        {isLogin ? 'Welcome Back' : 'Join MARC'}
                    </h1>
                    <p className="text-gray-400">
                        {isLogin ? 'Access your financial dashboard' : 'Start managing your wealth'}
                    </p>
                </motion.div>

                {/* Auth Form Card */}
                <div className="glass-panel p-8">
                    {isLogin ? (
                        <Login onSwitchToRegister={() => setIsLogin(false)} onLoginSuccess={handleAuthSuccess} />
                    ) : (
                        <Register onSwitchToLogin={() => setIsLogin(true)} onRegisterSuccess={handleAuthSuccess} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
