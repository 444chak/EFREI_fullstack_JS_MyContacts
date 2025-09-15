import React from 'react';
import { Stack, TextField, Button, Box, Alert, Snackbar } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthApi from '../hooks/useAuthApi';
import { useAuth } from '../hooks/AuthContext';
import dict from '../utils/dict';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sessionExpired, setSessionExpired] = useState(false);
    const { isAuthenticated } = useAuth();

    const navigate = useNavigate();
    const authApi = useAuthApi();

    useEffect(() => {
        if (isAuthenticated) {
            navigate(dict.login.to.contacts);
        }
    }, [isAuthenticated, navigate]);

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            await authApi.login({ email, password });
            navigate(dict.login.to.contacts);
        } catch (error) {
            setError(error?.response?.data?.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const sessionExpired = new URLSearchParams(window.location.search).get('sessionExpired');
        if (sessionExpired) {
            setSessionExpired(true);
        }
    }, []);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2, textAlign: 'center' }}>
            <Stack
                direction="column"
                spacing={2}
            >
                <h1>{dict.login.title}</h1>
                <Stack
                    direction="column"
                    spacing={2}
                    component="form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleLogin();
                    }}
                >
                    {error && <Alert severity="error">{error}</Alert>}
                    <TextField
                        label={dict.login.email}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        label={dict.login.password}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={isLoading}
                    >
                        {dict.login.login}
                    </Button>

                </Stack>
            </Stack>
            <Snackbar open={sessionExpired} onClose={() => setSessionExpired(false)}>
                <Alert severity="warning" variant="outlined" onClose={() => { setSessionExpired(false); console.log('closed') }}>Votre session a expiré. Veuillez vous reconnecter.</Alert>
            </Snackbar>
        </Box>
    );
};

export default LoginPage;
