import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, adminOnly }) => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to. This is a good user experience.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (adminOnly && user.role !== 'ROLE_ADMIN') {
        // If it's an admin-only route and the user is not an admin, redirect
        alert('접근 권한이 없습니다.');
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
