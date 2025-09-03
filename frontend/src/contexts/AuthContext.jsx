import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const decoded = jwtDecode(token);
            setUser({ loginId: decoded.sub, role: decoded.auth });
        } else {
            delete axios.defaults.headers.common['Authorization'];
            setUser(null);
        }
    }, [token]);

    const login = async (loginId, password) => {
        const response = await axios.post('/api/auth/tokens', { loginId, password });
        const newToken = response.data.data.accessToken;
        localStorage.setItem('token', newToken);
        setToken(newToken);
        return response.data;
    };

    const adminLogin = async (loginId, password) => {
        const response = await axios.post('/api/auth/admin/tokens', { loginId, password });
        const newToken = response.data.data.accessToken;
        localStorage.setItem('token', newToken);
        setToken(newToken);
        return response.data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    const value = { user, token, login, adminLogin, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
