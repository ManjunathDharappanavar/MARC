import React, { createContext, useState, useCallback, useEffect } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Initialize auth state from localStorage
    useEffect(() => {
        const storedUser = authService.getCurrentUser();
        if (storedUser && authService.getToken()) {
            setUser(storedUser);
        }
        setLoading(false);
    }, []);

    const register = useCallback(async (name, email, password) => {
        try {
            setError(null);
            const response = await authService.register(name, email, password);
            setUser(response.user);
            return response;
        } catch (err) {
            const message = err.response?.data?.message || 'Registration failed';
            setError(message);
            throw err;
        }
    }, []);

    const login = useCallback(async (email, password) => {
        try {
            setError(null);
            const response = await authService.login(email, password);
            setUser(response.user);
            return response;
        } catch (err) {
            const message = err.response?.data?.message || 'Login failed';
            setError(message);
            throw err;
        }
    }, []);

    const logout = useCallback(() => {
        authService.logout();
        setUser(null);
        setError(null);
    }, []);

    const value = {
        user,
        loading,
        error,
        register,
        login,
        logout,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
