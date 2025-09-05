import React from 'react';
import { Stack, TextField, Button, Box } from '@mui/material';
import api from '../services/api';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            const response = await api.post('/auth/login', { email, password });
            console.log(response);
            localStorage.setItem('token', response.data.token);
            setIsLoggedIn(true);
        } catch (error) {
            setError(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isLoggedIn) {
        return <Navigate to="/contacts" />
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2, textAlign: 'center' }}>
            <Stack direction="column" spacing={2}>
                <h1>LoginPage</h1>
                <Stack direction="column" spacing={2}>
                    <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button variant="contained" color="primary" onClick={handleLogin}>Login</Button>
                </Stack>
            </Stack>
        </Box>
    );
};

export default LoginPage;
