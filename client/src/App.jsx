import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ContactsPage from './pages/ContactsPage';
import ContactDetailPage from './pages/ContactDetailPage';
import CreateContactPage from './pages/CreateContactPage';
import EditContactPage from './pages/EditContactPage';
import NotFoundPage from './pages/NotFoundPage';

// Components
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <main className="main-content">
                    <Routes>
                        {/* Public routes */}
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />

                        {/* Protected routes */}
                        <Route path="/contacts" element={
                            <ProtectedRoute>
                                <ContactsPage />
                            </ProtectedRoute>
                        } />
                        <Route path="/contacts/create" element={
                            <ProtectedRoute>
                                <CreateContactPage />
                            </ProtectedRoute>
                        } />
                        <Route path="/contacts/:id" element={
                            <ProtectedRoute>
                                <ContactDetailPage />
                            </ProtectedRoute>
                        } />
                        <Route path="/contacts/:id/edit" element={
                            <ProtectedRoute>
                                <EditContactPage />
                            </ProtectedRoute>
                        } />

                        <Route path="/404" element={<NotFoundPage />} />
                        <Route path="*" element={<Navigate to="/404" replace />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
