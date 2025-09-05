import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // TODO: Vérifier si l'utilisateur est connecté
    const isAuthenticated = localStorage.getItem('token');

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
