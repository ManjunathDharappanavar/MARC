import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const LandingPage = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    // If already authenticated, redirect to dashboard
    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background text-white">
            {/* Abstract Background Geometry */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse-slow" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/20 rounded-full blur-[80px] animate-float" />

                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-8 backdrop-blur-sm"
                >
                    <span className="flex h-2 w-2 rounded-full bg-secondary animate-pulse" />
                    <span className="text-sm text-gray-300 font-medium">MARC v2.0 Live</span>
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-6xl md:text-8xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/50"
                >
                    Track Assets. <br />
                    <span className="text-gradient">Control Wealth.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
                >
                    Experience the future of personal finance with a gravity-defying interface.
                    Monitor your net worth in a spatial, immersive environment.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <button
                        onClick={() => navigate('/auth')}
                        className="group relative px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-20 transition-opacity" />
                        <span className="relative flex items-center gap-2">
                            Launch Dashboard <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default LandingPage;
