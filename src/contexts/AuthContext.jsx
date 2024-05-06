import log from "loglevel";
import React, { createContext, useState, useEffect, useContext } from 'react';

import * as apiClient from "../services/apiClient";

// Create a context for authentication state management.
export const AuthContext = createContext(null);

/**
 * Provider component that manages authentication state and provides
 * authentication functions to child components.
 * 
 * @param {Object} props - Props object containing children components.
 */
export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authToken, setAuthToken] = useState(null);

    /**
     * Handles user login with provided username and password.
     * 
     * @param {string} username - Username of the user.
     * @param {string} password - Password of the user.
     */
    async function handleLogin(username, password) {
        try {
            const token = await apiClient.login(username, password);
            if (token) {
                setIsAuthenticated(true);
                setAuthToken(token);
                sessionStorage.setItem('token', token);
                log.info(`Login successful for user: ${username}`);
            } else {
                log.error("Login failed: No token received.");
                alert("Login failed, please try again.");
            }
        } catch (error) {
            log.error("Login error", error);
            alert("An error occurred during login. Please try again.");
        }
    }

    // Effect to restore authentication state from sessionStorage on initial load.
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            setAuthToken(token);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, authToken, handleLogin }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook to use the auth context.
export function useAuth() {
    return useContext(AuthContext);
}
