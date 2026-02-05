import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-white text-center">
                    <h1 className="text-4xl font-bold mb-4 text-secondary">Something went wrong</h1>
                    <p className="text-gray-400 mb-8 max-w-md">
                        We encountered an unexpected error. Please try refreshing the page or clearing your browser data.
                    </p>
                    <div className="bg-surface p-4 rounded-lg mb-8 max-w-lg overflow-auto text-left w-full border border-white/10">
                        <code className="text-red-400 text-sm">{this.state.error?.toString()}</code>
                    </div>
                    <button
                        onClick={() => {
                            localStorage.clear();
                            window.location.href = '/';
                        }}
                        className="px-6 py-3 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform"
                    >
                        Clear Data & Restart
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
