import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // Initialize from localStorage immediately to prevent logout on refresh
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if user exists in localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = (id, password) => {
        if (id === 'admin' && password === 'admin123') {
            const userData = { id: 'admin', name: 'Administrator', role: 'admin' };
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            return true;
        }
        if (id === 'user' && password === 'user123') {
            const userData = { id: 'user', name: 'Standard User', role: 'user' };
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
