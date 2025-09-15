import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';
import dict from '../utils/dict';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to={dict.navbar.to.login + '?needLogin=true'} />;
};

export default ProtectedRoute;
