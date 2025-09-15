import React from 'react';
import { Stack, TextField, Button, Box, Alert } from '@mui/material';
import api from '../services/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            const response = await api.post('/auth/login', { email, password });
            login(response.data.token);
            navigate('/contacts');
        } catch (error) {
            setError(error?.response?.data?.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2, textAlign: 'center' }}>
            <Stack direction="column" spacing={2}>
                <h1>LoginPage</h1>
                <Stack direction="column" spacing={2}>
                    {error && <Alert severity="error">{error}</Alert>}
                    <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button variant="contained" color="primary" onClick={handleLogin} disabled={isLoading}>Login</Button>

                </Stack>
            </Stack>
        </Box>
    );
};

export default LoginPage;
